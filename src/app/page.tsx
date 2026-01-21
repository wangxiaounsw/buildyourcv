"use client";

import { useState } from "react";
import Upload from "@/components/Upload";
import Customizer, { CustomizerStyles, defaultStyles } from "@/components/Customizer";
import Preview from "@/components/Preview";
import { JsonResume, defaultResume } from "@/types/resume";

type AppState = "upload" | "review" | "parsing" | "editing";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("upload");
  const [resume, setResume] = useState<JsonResume>(defaultResume);
  const [error, setError] = useState("");
  const [cvText, setCvText] = useState("");
  const [template, setTemplate] = useState("elegant");
  const [styles, setStyles] = useState<CustomizerStyles>(defaultStyles);
  const [isExporting, setIsExporting] = useState(false);

  // Step 1: File uploaded, text extracted - show for review
  const handleTextExtracted = (text: string) => {
    setCvText(text);
    setError("");
    setAppState("review");
  };

  // Step 2: User confirms text, call DeepSeek to parse
  const handleUseTemplate = async () => {
    setError("");
    setAppState("parsing");

    try {
      const response = await fetch("/api/parse-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: cvText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to parse CV");
      }

      setResume(data.data);
      setAppState("editing");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to parse CV";
      setError(message);
      setAppState("review");
    }
  };

  const handleStartOver = () => {
    setAppState("upload");
    setResume(defaultResume);
    setCvText("");
    setError("");
    setTemplate("elegant");
    setStyles(defaultStyles);
  };

  const handleSkipUpload = () => {
    setAppState("editing");
  };

  // Export PDF using html2pdf.js
  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const { exportToPDF } = await import("@/utils/exportPDF");
      await exportToPDF("resume-preview", `${resume.basics.name.replace(/\s+/g, "_")}_CV.pdf`);
    } catch (err) {
      console.error("PDF export failed:", err);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  // Upload State
  if (appState === "upload") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-2xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              BuildYourCV
            </h1>
            <p className="text-lg text-gray-600">
              Upload your CV and we&apos;ll convert it to a professional format
            </p>
          </div>

          {/* Upload Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Upload Your CV
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Upload
              onTextExtracted={handleTextExtracted}
              onError={setError}
            />

            {/* Skip Upload Option */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-500 mb-3">
                Don&apos;t have a CV yet?
              </p>
              <button
                onClick={handleSkipUpload}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Start from scratch with our template →
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-800">PDF & Word</h3>
              <p className="text-sm text-gray-500">Upload any format</p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-800">AI Powered</h3>
              <p className="text-sm text-gray-500">Smart parsing</p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-800">Beautiful Templates</h3>
              <p className="text-sm text-gray-500">Professional look</p>
            </div>
          </div>

          {/* CTA to findyourjob */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 mb-2">
              Want AI to analyze your CV and improve it?
            </p>
            <a
              href="https://findyourjob.today"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              Try FindYourJob.today
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Review State - Show extracted text
  if (appState === "review") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handleStartOver}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Review Your CV Content</h1>
            <div className="w-20"></div>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Extracted Text
              </h2>
              <p className="text-sm text-gray-500">
                Please review the extracted content. You can edit it if needed.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <textarea
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              rows={20}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
            />

            <div className="flex justify-between items-center mt-6">
              <span className="text-sm text-gray-500">
                {cvText.length} characters
              </span>
              <div className="flex gap-3">
                <button
                  onClick={handleStartOver}
                  className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Upload Different File
                </button>
                <button
                  onClick={handleUseTemplate}
                  disabled={!cvText.trim()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Use Template →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Parsing State
  if (appState === "parsing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6">
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Analyzing your CV...
          </h2>
          <p className="text-gray-600">
            AI is extracting and structuring your information
          </p>
        </div>
      </div>
    );
  }

  // Editing State
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleStartOver}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">BuildYourCV</h1>
              <p className="text-sm text-gray-500">
                {resume.basics.name !== "John Doe" ? resume.basics.name : "Edit your resume"}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleStartOver}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Upload New
            </button>
            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              {isExporting ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Exporting...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export PDF
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel - Customizer */}
        <div className="w-80 border-r border-gray-200 bg-white overflow-hidden">
          <Customizer
            resume={resume}
            styles={styles}
            onStylesChange={setStyles}
            onResumeChange={setResume}
          />
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1">
          <Preview
            resume={resume}
            template={template}
            styles={styles}
            onTemplateChange={setTemplate}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Open source CV builder based on JSON Resume standard</span>
          <div className="flex items-center gap-4">
            <a
              href="https://findyourjob.today"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              Want AI CV analysis? → FindYourJob.today
            </a>
            <span className="text-gray-300">|</span>
            <a
              href="https://jsonresume.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              jsonresume.org
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
