"use client";

import { useState } from "react";
import { JsonResume } from "@/types/resume";

// Google Fonts options
export const FONT_OPTIONS = [
  { id: "inter", name: "Inter", family: "'Inter', sans-serif" },
  { id: "roboto", name: "Roboto", family: "'Roboto', sans-serif" },
  { id: "open-sans", name: "Open Sans", family: "'Open Sans', sans-serif" },
  { id: "lato", name: "Lato", family: "'Lato', sans-serif" },
  { id: "montserrat", name: "Montserrat", family: "'Montserrat', sans-serif" },
  { id: "merriweather", name: "Merriweather", family: "'Merriweather', serif" },
  { id: "playfair", name: "Playfair Display", family: "'Playfair Display', serif" },
  { id: "source-code", name: "Source Code Pro", family: "'Source Code Pro', monospace" },
];

// Preset color themes
export const COLOR_PRESETS = [
  { id: "blue", name: "Professional Blue", primary: "#2563eb", accent: "#3b82f6" },
  { id: "indigo", name: "Modern Indigo", primary: "#4f46e5", accent: "#6366f1" },
  { id: "emerald", name: "Fresh Green", primary: "#059669", accent: "#10b981" },
  { id: "rose", name: "Elegant Rose", primary: "#e11d48", accent: "#f43f5e" },
  { id: "amber", name: "Warm Amber", primary: "#d97706", accent: "#f59e0b" },
  { id: "slate", name: "Classic Gray", primary: "#475569", accent: "#64748b" },
  { id: "purple", name: "Creative Purple", primary: "#7c3aed", accent: "#8b5cf6" },
  { id: "teal", name: "Tech Teal", primary: "#0d9488", accent: "#14b8a6" },
];

// Section definitions
// required: true means the section cannot be hidden
export const SECTIONS = [
  { id: "summary", label: "Summary", key: "basics.summary", required: false },
  { id: "work", label: "Work Experience", key: "work", required: false },
  { id: "education", label: "Education", key: "education", required: true },
  { id: "skills", label: "Skills", key: "skills", required: true },
  { id: "projects", label: "Projects", key: "projects", required: false },
  { id: "languages", label: "Languages", key: "languages", required: false },
  { id: "certificates", label: "Certificates", key: "certificates", required: false },
  { id: "awards", label: "Awards", key: "awards", required: false },
  { id: "references", label: "References", key: "references", required: false },
];

export interface CustomizerStyles {
  fontFamily: string;
  primaryColor: string;
  accentColor: string;
  h1Size: string;
  h2Size: string;
  h3Size: string;
  bodySize: string;
  visibleSections: string[];
}

export const defaultStyles: CustomizerStyles = {
  fontFamily: "'Inter', sans-serif",
  primaryColor: "#2563eb",
  accentColor: "#3b82f6",
  h1Size: "2.25rem",
  h2Size: "1.125rem",
  h3Size: "1rem",
  bodySize: "0.875rem",
  visibleSections: ["summary", "work", "education", "skills", "projects", "languages", "certificates", "awards", "references"],
};

interface CustomizerProps {
  resume: JsonResume;
  styles: CustomizerStyles;
  onStylesChange: (styles: CustomizerStyles) => void;
  onResumeChange: (resume: JsonResume) => void;
}

export default function Customizer({ resume, styles, onStylesChange, onResumeChange }: CustomizerProps) {
  const [activeTab, setActiveTab] = useState<"style" | "sections" | "edit">("style");

  const handleFontChange = (fontFamily: string) => {
    onStylesChange({ ...styles, fontFamily });
  };

  const handleColorPreset = (preset: typeof COLOR_PRESETS[0]) => {
    onStylesChange({ ...styles, primaryColor: preset.primary, accentColor: preset.accent });
  };

  const handleSizeChange = (key: keyof CustomizerStyles, value: string) => {
    onStylesChange({ ...styles, [key]: value });
  };

  const handleSectionToggle = (sectionId: string) => {
    // Don't allow toggling required sections
    const section = SECTIONS.find(s => s.id === sectionId);
    if (section?.required) return;

    const newSections = styles.visibleSections.includes(sectionId)
      ? styles.visibleSections.filter(s => s !== sectionId)
      : [...styles.visibleSections, sectionId];
    onStylesChange({ ...styles, visibleSections: newSections });
  };

  const handleBasicsChange = (field: string, value: string) => {
    onResumeChange({
      ...resume,
      basics: { ...resume.basics, [field]: value }
    });
  };

  // Check if section has data
  const sectionHasData = (sectionId: string): boolean => {
    if (sectionId === "summary") return !!resume.basics?.summary;
    const data = resume[sectionId as keyof JsonResume];
    return Array.isArray(data) ? data.length > 0 : !!data;
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("style")}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === "style"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Style
        </button>
        <button
          onClick={() => setActiveTab("sections")}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === "sections"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Sections
        </button>
        <button
          onClick={() => setActiveTab("edit")}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === "edit"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Edit Info
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Style Tab */}
        {activeTab === "style" && (
          <div className="space-y-6">
            {/* Font Family */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Family
              </label>
              <div className="grid grid-cols-2 gap-2">
                {FONT_OPTIONS.map((font) => (
                  <button
                    key={font.id}
                    onClick={() => handleFontChange(font.family)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                      styles.fontFamily === font.family
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    style={{ fontFamily: font.family }}
                  >
                    {font.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Theme */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Theme
              </label>
              <div className="grid grid-cols-4 gap-2">
                {COLOR_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleColorPreset(preset)}
                    className={`group relative p-1 rounded-lg border-2 transition-colors ${
                      styles.primaryColor === preset.primary
                        ? "border-gray-800"
                        : "border-transparent hover:border-gray-300"
                    }`}
                    title={preset.name}
                  >
                    <div className="flex h-8 rounded overflow-hidden">
                      <div className="flex-1" style={{ backgroundColor: preset.primary }} />
                      <div className="flex-1" style={{ backgroundColor: preset.accent }} />
                    </div>
                  </button>
                ))}
              </div>
              {/* Custom color inputs */}
              <div className="flex gap-4 mt-3">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">Primary</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={styles.primaryColor}
                      onChange={(e) => onStylesChange({ ...styles, primaryColor: e.target.value })}
                      className="w-8 h-8 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={styles.primaryColor}
                      onChange={(e) => onStylesChange({ ...styles, primaryColor: e.target.value })}
                      className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">Accent</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={styles.accentColor}
                      onChange={(e) => onStylesChange({ ...styles, accentColor: e.target.value })}
                      className="w-8 h-8 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={styles.accentColor}
                      onChange={(e) => onStylesChange({ ...styles, accentColor: e.target.value })}
                      className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Font Sizes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Sizes
              </label>
              <div className="space-y-3">
                {[
                  { key: "h1Size", label: "Name (H1)", default: "2.25rem" },
                  { key: "h2Size", label: "Section Title (H2)", default: "1.125rem" },
                  { key: "h3Size", label: "Item Title (H3)", default: "1rem" },
                  { key: "bodySize", label: "Body Text", default: "0.875rem" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-32">{item.label}</span>
                    <input
                      type="range"
                      min="0.75"
                      max={item.key === "h1Size" ? "3.5" : "2"}
                      step="0.125"
                      value={parseFloat(styles[item.key as keyof CustomizerStyles] as string)}
                      onChange={(e) => handleSizeChange(item.key as keyof CustomizerStyles, `${e.target.value}rem`)}
                      className="flex-1"
                    />
                    <span className="text-xs text-gray-500 w-16">
                      {styles[item.key as keyof CustomizerStyles]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sections Tab */}
        {activeTab === "sections" && (
          <div className="space-y-2">
            <p className="text-sm text-gray-500 mb-4">
              Toggle sections to show or hide them in your resume.
            </p>
            {SECTIONS.map((section) => {
              const hasData = sectionHasData(section.id);
              const isVisible = styles.visibleSections.includes(section.id);
              const isRequired = section.required;

              return (
                <label
                  key={section.id}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    isRequired ? "cursor-not-allowed" : "cursor-pointer"
                  } ${
                    isVisible
                      ? "border-blue-200 bg-blue-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isVisible}
                      onChange={() => handleSectionToggle(section.id)}
                      disabled={isRequired}
                      className={`w-4 h-4 rounded focus:ring-blue-500 ${
                        isRequired ? "text-gray-400 cursor-not-allowed" : "text-blue-600"
                      }`}
                    />
                    <span className={`text-sm font-medium ${isVisible ? "text-gray-800" : "text-gray-500"}`}>
                      {section.label}
                    </span>
                    {isRequired && (
                      <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded">
                        Required
                      </span>
                    )}
                  </div>
                  {hasData ? (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                      Has data
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-1 bg-gray-200 text-gray-500 rounded">
                      Empty
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        )}

        {/* Edit Info Tab */}
        {activeTab === "edit" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 mb-4">
              Edit your basic information directly.
            </p>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={resume.basics.name}
                onChange={(e) => handleBasicsChange("name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                value={resume.basics.label || ""}
                onChange={(e) => handleBasicsChange("label", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={resume.basics.email || ""}
                onChange={(e) => handleBasicsChange("email", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={resume.basics.phone || ""}
                onChange={(e) => handleBasicsChange("phone", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Summary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Summary
              </label>
              <textarea
                value={resume.basics.summary || ""}
                onChange={(e) => handleBasicsChange("summary", e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Download JSON */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">
                Download your resume data to edit later
              </p>
              <button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(resume, null, 2)], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${resume.basics.name.replace(/\s+/g, "_")}_resume.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Download JSON
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
