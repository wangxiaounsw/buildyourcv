"use client";

import { useMemo, useRef } from "react";
import { JsonResume } from "@/types/resume";
import { CustomizerStyles, defaultStyles } from "@/components/Customizer";
import Elegant from "@/components/Templates/Elegant";
import Kendall from "@/components/Templates/Kendall";
import Stackoverflow from "@/components/Templates/Stackoverflow";
import Modern from "@/components/Templates/Modern";

export const TEMPLATES = [
  { id: "elegant", name: "Elegant", description: "Classic professional style" },
  { id: "kendall", name: "Kendall", description: "Two-column layout" },
  { id: "stackoverflow", name: "Developer", description: "Tech-focused design" },
  { id: "modern", name: "Modern", description: "Clean gradient style" },
];

interface PreviewProps {
  resume: JsonResume;
  template?: string;
  styles?: CustomizerStyles;
  onTemplateChange?: (template: string) => void;
}

export default function Preview({
  resume,
  template = "elegant",
  styles = defaultStyles,
  onTemplateChange
}: PreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  // Filter resume based on visible sections
  const filteredResume = useMemo(() => {
    const filtered: JsonResume = {
      basics: {
        ...resume.basics,
        summary: styles.visibleSections.includes("summary") ? resume.basics.summary : undefined,
      },
    };

    if (styles.visibleSections.includes("work") && resume.work?.length) {
      filtered.work = resume.work;
    }
    if (styles.visibleSections.includes("education") && resume.education?.length) {
      filtered.education = resume.education;
    }
    if (styles.visibleSections.includes("skills") && resume.skills?.length) {
      filtered.skills = resume.skills;
    }
    if (styles.visibleSections.includes("projects") && resume.projects?.length) {
      filtered.projects = resume.projects;
    }
    if (styles.visibleSections.includes("languages") && resume.languages?.length) {
      filtered.languages = resume.languages;
    }
    if (styles.visibleSections.includes("certificates") && resume.certificates?.length) {
      filtered.certificates = resume.certificates;
    }
    if (styles.visibleSections.includes("awards") && resume.awards?.length) {
      filtered.awards = resume.awards;
    }
    if (styles.visibleSections.includes("references") && resume.references?.length) {
      filtered.references = resume.references;
    }

    return filtered;
  }, [resume, styles.visibleSections]);

  // CSS custom properties for styling
  const customStyles = useMemo(() => ({
    "--cv-font-family": styles.fontFamily,
    "--cv-primary-color": styles.primaryColor,
    "--cv-accent-color": styles.accentColor,
    "--cv-h1-size": styles.h1Size,
    "--cv-h2-size": styles.h2Size,
    "--cv-h3-size": styles.h3Size,
    "--cv-body-size": styles.bodySize,
  } as React.CSSProperties), [styles]);

  const renderTemplate = () => {
    const templateProps = { resume: filteredResume, visibleSections: styles.visibleSections };
    switch (template) {
      case "kendall":
        return <Kendall {...templateProps} />;
      case "stackoverflow":
        return <Stackoverflow {...templateProps} />;
      case "modern":
        return <Modern {...templateProps} />;
      case "elegant":
      default:
        return <Elegant {...templateProps} />;
    }
  };

  const currentTemplate = TEMPLATES.find(t => t.id === template) || TEMPLATES[0];

  return (
    <div className="h-full overflow-auto bg-gray-100 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Preview</h2>

        {/* Template Selector */}
        {onTemplateChange && (
          <div className="flex gap-2">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => onTemplateChange(t.id)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  template === t.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
                title={t.description}
              >
                {t.name}
              </button>
            ))}
          </div>
        )}

        {!onTemplateChange && (
          <span className="text-sm text-gray-500">{currentTemplate.name} Template</span>
        )}
      </div>

      {/* Preview Container with CSS Variables */}
      <div
        ref={previewRef}
        id="resume-preview"
        className="bg-white shadow-lg rounded-lg overflow-hidden cv-preview"
        style={customStyles}
      >
        {renderTemplate()}
      </div>
    </div>
  );
}

// Export ref getter for PDF export
export function getPreviewElement(): HTMLElement | null {
  return document.getElementById("resume-preview");
}
