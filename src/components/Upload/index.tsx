"use client";

import { useState, useRef, useCallback } from "react";
import { parseFile, SUPPORTED_EXTENSIONS } from "@/lib/fileParser";

interface UploadProps {
  onTextExtracted: (text: string) => void;
  onError: (error: string) => void;
  disabled?: boolean;
}

export default function Upload({ onTextExtracted, onError, disabled }: UploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [fileName, setFileName] = useState("");
  const [pasteText, setPasteText] = useState("");
  const [showPasteArea, setShowPasteArea] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setFileName(file.name);
      setIsParsing(true);
      onError("");

      try {
        const text = await parseFile(file);
        onTextExtracted(text);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to parse file";
        onError(message);
      } finally {
        setIsParsing(false);
      }
    },
    [onTextExtracted, onError]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handlePasteSubmit = () => {
    if (pasteText.trim()) {
      onTextExtracted(pasteText.trim());
    }
  };

  return (
    <div className="space-y-4">
      {/* File Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && !isParsing && fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          transition-all duration-200
          ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}
          ${disabled || isParsing ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={SUPPORTED_EXTENSIONS}
          onChange={handleFileInput}
          className="hidden"
          disabled={disabled || isParsing}
        />

        {isParsing ? (
          <div className="space-y-3">
            <div className="w-12 h-12 mx-auto">
              <svg
                className="animate-spin w-full h-full text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
            <p className="text-gray-600 font-medium">Parsing {fileName}...</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-12 h-12 mx-auto text-gray-400">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-700 font-medium">
                {fileName || "Drop your CV here or click to upload"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Supports PDF, Word (.docx), and TXT files
              </p>
            </div>
          </div>
        )}
      </div>

      {/* File Type Badges */}
      <div className="flex justify-center gap-2">
        <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-medium">
          PDF
        </span>
        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs font-medium">
          Word
        </span>
        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
          TXT
        </span>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <button
            onClick={() => setShowPasteArea(!showPasteArea)}
            className="px-4 bg-white text-gray-500 text-sm hover:text-gray-700"
          >
            {showPasteArea ? "Hide paste area" : "Or paste your CV text"}
          </button>
        </div>
      </div>

      {/* Paste Text Area */}
      {showPasteArea && (
        <div className="space-y-3">
          <textarea
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Paste your CV content here..."
            disabled={disabled || isParsing}
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {pasteText.length} characters
            </span>
            <button
              onClick={handlePasteSubmit}
              disabled={!pasteText.trim() || disabled || isParsing}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Use This Text
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
