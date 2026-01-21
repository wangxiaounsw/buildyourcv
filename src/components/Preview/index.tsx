"use client";

import { JsonResume } from "@/types/resume";
import Elegant from "@/components/Templates/Elegant";

interface PreviewProps {
  resume: JsonResume;
  template?: string;
}

export default function Preview({ resume, template = "elegant" }: PreviewProps) {
  const renderTemplate = () => {
    switch (template) {
      case "elegant":
      default:
        return <Elegant resume={resume} />;
    }
  };

  return (
    <div className="h-full overflow-auto bg-gray-100 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Preview</h2>
        <span className="text-sm text-gray-500 capitalize">{template} Template</span>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {renderTemplate()}
      </div>
    </div>
  );
}
