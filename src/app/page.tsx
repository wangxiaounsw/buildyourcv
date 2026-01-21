"use client";

import { useState } from "react";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import { JsonResume, defaultResume } from "@/types/resume";

export default function Home() {
  const [resume, setResume] = useState<JsonResume>(defaultResume);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">BuildYourCV</h1>
            <p className="text-sm text-gray-500">Create professional resumes with JSON Resume standard</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Import
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              Export PDF
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel - Editor */}
        <div className="w-1/2 p-4 border-r border-gray-200 bg-white">
          <Editor value={resume} onChange={setResume} />
        </div>

        {/* Right Panel - Preview */}
        <div className="w-1/2">
          <Preview resume={resume} template="elegant" />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Open source CV builder based on JSON Resume standard</span>
          <a
            href="https://jsonresume.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            jsonresume.org
          </a>
        </div>
      </footer>
    </div>
  );
}
