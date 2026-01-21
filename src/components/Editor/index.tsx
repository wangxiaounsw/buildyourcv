"use client";

import { useState, useEffect } from "react";
import { JsonResume } from "@/types/resume";

interface EditorProps {
  value: JsonResume;
  onChange: (value: JsonResume) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
  const [jsonText, setJsonText] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setJsonText(JSON.stringify(value, null, 2));
  }, [value]);

  const handleChange = (text: string) => {
    setJsonText(text);
    try {
      const parsed = JSON.parse(text);
      setError(null);
      onChange(parsed);
    } catch (e) {
      setError("Invalid JSON format");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-700">JSON Editor</h2>
        {error && (
          <span className="text-sm text-red-500">{error}</span>
        )}
      </div>
      <textarea
        className="flex-1 w-full p-4 font-mono text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
        value={jsonText}
        onChange={(e) => handleChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
}
