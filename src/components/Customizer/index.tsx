"use client";

import { useState } from "react";
import { JsonResume, Work, Education, Skill, Project, Language, Certificate, Award, Reference } from "@/types/resume";

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

type TabType = "style" | "sections" | "basics" | "work" | "education" | "skills" | "projects" | "other";

export default function Customizer({ resume, styles, onStylesChange, onResumeChange }: CustomizerProps) {
  const [activeTab, setActiveTab] = useState<TabType>("basics");

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
    const section = SECTIONS.find(s => s.id === sectionId);
    if (section?.required) return;

    const newSections = styles.visibleSections.includes(sectionId)
      ? styles.visibleSections.filter(s => s !== sectionId)
      : [...styles.visibleSections, sectionId];
    onStylesChange({ ...styles, visibleSections: newSections });
  };

  const handleBasicsChange = (field: string, value: string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      if (parent === "location") {
        onResumeChange({
          ...resume,
          basics: {
            ...resume.basics,
            location: { ...resume.basics.location, [child]: value }
          }
        });
      }
    } else {
      onResumeChange({
        ...resume,
        basics: { ...resume.basics, [field]: value }
      });
    }
  };

  // Work handlers
  const handleWorkChange = (index: number, field: keyof Work, value: string | string[]) => {
    const newWork = [...(resume.work || [])];
    newWork[index] = { ...newWork[index], [field]: value };
    onResumeChange({ ...resume, work: newWork });
  };

  const addWork = () => {
    const newWork: Work = {
      company: "Company Name",
      position: "Position",
      startDate: "2024-01",
      highlights: []
    };
    onResumeChange({ ...resume, work: [...(resume.work || []), newWork] });
  };

  const removeWork = (index: number) => {
    const newWork = [...(resume.work || [])];
    newWork.splice(index, 1);
    onResumeChange({ ...resume, work: newWork });
  };

  // Education handlers
  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...(resume.education || [])];
    newEducation[index] = { ...newEducation[index], [field]: value };
    onResumeChange({ ...resume, education: newEducation });
  };

  const addEducation = () => {
    const newEdu: Education = {
      institution: "University Name",
      area: "Field of Study",
      studyType: "Bachelor",
      startDate: "2020-09"
    };
    onResumeChange({ ...resume, education: [...(resume.education || []), newEdu] });
  };

  const removeEducation = (index: number) => {
    const newEducation = [...(resume.education || [])];
    newEducation.splice(index, 1);
    onResumeChange({ ...resume, education: newEducation });
  };

  // Skills handlers
  const handleSkillChange = (index: number, field: keyof Skill, value: string | string[]) => {
    const newSkills = [...(resume.skills || [])];
    newSkills[index] = { ...newSkills[index], [field]: value };
    onResumeChange({ ...resume, skills: newSkills });
  };

  const addSkill = () => {
    const newSkill: Skill = { name: "Skill Category", keywords: ["Skill 1", "Skill 2"] };
    onResumeChange({ ...resume, skills: [...(resume.skills || []), newSkill] });
  };

  const removeSkill = (index: number) => {
    const newSkills = [...(resume.skills || [])];
    newSkills.splice(index, 1);
    onResumeChange({ ...resume, skills: newSkills });
  };

  // Projects handlers
  const handleProjectChange = (index: number, field: keyof Project, value: string | string[]) => {
    const newProjects = [...(resume.projects || [])];
    newProjects[index] = { ...newProjects[index], [field]: value };
    onResumeChange({ ...resume, projects: newProjects });
  };

  const addProject = () => {
    const newProject: Project = { name: "Project Name", description: "Project description", highlights: [] };
    onResumeChange({ ...resume, projects: [...(resume.projects || []), newProject] });
  };

  const removeProject = (index: number) => {
    const newProjects = [...(resume.projects || [])];
    newProjects.splice(index, 1);
    onResumeChange({ ...resume, projects: newProjects });
  };

  // Check if section has data
  const sectionHasData = (sectionId: string): boolean => {
    if (sectionId === "summary") return !!resume.basics?.summary;
    const data = resume[sectionId as keyof JsonResume];
    return Array.isArray(data) ? data.length > 0 : !!data;
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: "basics", label: "Basic" },
    { id: "work", label: "Work" },
    { id: "education", label: "Edu" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "other", label: "Other" },
    { id: "style", label: "Style" },
    { id: "sections", label: "Show/Hide" },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Tabs */}
      <div className="flex flex-wrap border-b border-gray-200 px-2 pt-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 text-xs font-medium transition-colors rounded-t ${
              activeTab === tab.id
                ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Basic Info Tab */}
        {activeTab === "basics" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                value={resume.basics.name}
                onChange={(e) => handleBasicsChange("name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input
                type="text"
                value={resume.basics.label || ""}
                onChange={(e) => handleBasicsChange("label", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={resume.basics.email || ""}
                  onChange={(e) => handleBasicsChange("email", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={resume.basics.phone || ""}
                  onChange={(e) => handleBasicsChange("phone", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={resume.basics.location?.city || ""}
                  onChange={(e) => onResumeChange({
                    ...resume,
                    basics: { ...resume.basics, location: { ...resume.basics.location, city: e.target.value } }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  value={resume.basics.location?.countryCode || ""}
                  onChange={(e) => onResumeChange({
                    ...resume,
                    basics: { ...resume.basics, location: { ...resume.basics.location, countryCode: e.target.value } }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
              <textarea
                value={resume.basics.summary || ""}
                onChange={(e) => handleBasicsChange("summary", e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
              />
            </div>
          </div>
        )}

        {/* Work Tab */}
        {activeTab === "work" && (
          <div className="space-y-4">
            {resume.work?.map((job, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-700">Work #{index + 1}</span>
                  <button
                    onClick={() => removeWork(index)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Remove
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Company"
                    value={job.company}
                    onChange={(e) => handleWorkChange(index, "company", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    value={job.position}
                    onChange={(e) => handleWorkChange(index, "position", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Start (YYYY-MM)"
                      value={job.startDate}
                      onChange={(e) => handleWorkChange(index, "startDate", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <input
                      type="text"
                      placeholder="End (or Present)"
                      value={job.endDate || ""}
                      onChange={(e) => handleWorkChange(index, "endDate", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <textarea
                    placeholder="Summary"
                    value={job.summary || ""}
                    onChange={(e) => handleWorkChange(index, "summary", e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                  <textarea
                    placeholder="Highlights (one per line)"
                    value={job.highlights?.join("\n") || ""}
                    onChange={(e) => handleWorkChange(index, "highlights", e.target.value.split("\n").filter(h => h.trim()))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={addWork}
              className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 text-sm"
            >
              + Add Work Experience
            </button>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === "education" && (
          <div className="space-y-4">
            {resume.education?.map((edu, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-700">Education #{index + 1}</span>
                  <button
                    onClick={() => removeEducation(index)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Remove
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Degree (Bachelor, Master...)"
                      value={edu.studyType}
                      onChange={(e) => handleEducationChange(index, "studyType", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Field of Study"
                      value={edu.area}
                      onChange={(e) => handleEducationChange(index, "area", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Start (YYYY-MM)"
                      value={edu.startDate}
                      onChange={(e) => handleEducationChange(index, "startDate", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <input
                      type="text"
                      placeholder="End (YYYY-MM)"
                      value={edu.endDate || ""}
                      onChange={(e) => handleEducationChange(index, "endDate", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addEducation}
              className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 text-sm"
            >
              + Add Education
            </button>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <div className="space-y-4">
            {resume.skills?.map((skill, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-700">Skill Group #{index + 1}</span>
                  <button
                    onClick={() => removeSkill(index)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Remove
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Category (e.g., Programming, Design)"
                    value={skill.name}
                    onChange={(e) => handleSkillChange(index, "name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                  <textarea
                    placeholder="Skills (comma separated)"
                    value={skill.keywords?.join(", ") || ""}
                    onChange={(e) => handleSkillChange(index, "keywords", e.target.value.split(",").map(s => s.trim()).filter(s => s))}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={addSkill}
              className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 text-sm"
            >
              + Add Skill Group
            </button>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-4">
            {resume.projects?.map((project, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-700">Project #{index + 1}</span>
                  <button
                    onClick={() => removeProject(index)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Remove
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Project Name"
                    value={project.name}
                    onChange={(e) => handleProjectChange(index, "name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                  <input
                    type="text"
                    placeholder="URL (optional)"
                    value={project.url || ""}
                    onChange={(e) => handleProjectChange(index, "url", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                  <textarea
                    placeholder="Description"
                    value={project.description || ""}
                    onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                  <textarea
                    placeholder="Highlights (one per line)"
                    value={project.highlights?.join("\n") || ""}
                    onChange={(e) => handleProjectChange(index, "highlights", e.target.value.split("\n").filter(h => h.trim()))}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={addProject}
              className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 text-sm"
            >
              + Add Project
            </button>
          </div>
        )}

        {/* Other Tab (Languages, Certificates, Awards, References) */}
        {activeTab === "other" && (
          <div className="space-y-6">
            {/* Languages */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Languages</h3>
              {resume.languages?.map((lang, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Language"
                    value={lang.language}
                    onChange={(e) => {
                      const newLangs = [...(resume.languages || [])];
                      newLangs[index] = { ...newLangs[index], language: e.target.value };
                      onResumeChange({ ...resume, languages: newLangs });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Fluency"
                    value={lang.fluency}
                    onChange={(e) => {
                      const newLangs = [...(resume.languages || [])];
                      newLangs[index] = { ...newLangs[index], fluency: e.target.value };
                      onResumeChange({ ...resume, languages: newLangs });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                  <button
                    onClick={() => {
                      const newLangs = [...(resume.languages || [])];
                      newLangs.splice(index, 1);
                      onResumeChange({ ...resume, languages: newLangs });
                    }}
                    className="text-red-500 px-2"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => onResumeChange({ ...resume, languages: [...(resume.languages || []), { language: "", fluency: "" }] })}
                className="text-blue-600 text-sm hover:underline"
              >
                + Add Language
              </button>
            </div>

            {/* Certificates */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Certificates</h3>
              {resume.certificates?.map((cert, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Certificate Name"
                    value={cert.name}
                    onChange={(e) => {
                      const newCerts = [...(resume.certificates || [])];
                      newCerts[index] = { ...newCerts[index], name: e.target.value };
                      onResumeChange({ ...resume, certificates: newCerts });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Issuer"
                    value={cert.issuer}
                    onChange={(e) => {
                      const newCerts = [...(resume.certificates || [])];
                      newCerts[index] = { ...newCerts[index], issuer: e.target.value };
                      onResumeChange({ ...resume, certificates: newCerts });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                  <button
                    onClick={() => {
                      const newCerts = [...(resume.certificates || [])];
                      newCerts.splice(index, 1);
                      onResumeChange({ ...resume, certificates: newCerts });
                    }}
                    className="text-red-500 px-2"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => onResumeChange({ ...resume, certificates: [...(resume.certificates || []), { name: "", issuer: "", date: "" }] })}
                className="text-blue-600 text-sm hover:underline"
              >
                + Add Certificate
              </button>
            </div>

            {/* References */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">References</h3>
              {resume.references?.map((ref, index) => (
                <div key={index} className="p-2 border border-gray-200 rounded mb-2">
                  <div className="flex justify-between mb-2">
                    <input
                      type="text"
                      placeholder="Name"
                      value={ref.name}
                      onChange={(e) => {
                        const newRefs = [...(resume.references || [])];
                        newRefs[index] = { ...newRefs[index], name: e.target.value };
                        onResumeChange({ ...resume, references: newRefs });
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button
                      onClick={() => {
                        const newRefs = [...(resume.references || [])];
                        newRefs.splice(index, 1);
                        onResumeChange({ ...resume, references: newRefs });
                      }}
                      className="text-red-500 px-2"
                    >
                      ×
                    </button>
                  </div>
                  <textarea
                    placeholder="Reference text"
                    value={ref.reference}
                    onChange={(e) => {
                      const newRefs = [...(resume.references || [])];
                      newRefs[index] = { ...newRefs[index], reference: e.target.value };
                      onResumeChange({ ...resume, references: newRefs });
                    }}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
              ))}
              <button
                onClick={() => onResumeChange({ ...resume, references: [...(resume.references || []), { name: "", reference: "" }] })}
                className="text-blue-600 text-sm hover:underline"
              >
                + Add Reference
              </button>
            </div>

            {/* Download JSON */}
            <div className="pt-4 border-t border-gray-200">
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

        {/* Style Tab */}
        {activeTab === "style" && (
          <div className="space-y-6">
            {/* Font Family */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Font</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <div className="grid grid-cols-4 gap-2">
                {COLOR_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleColorPreset(preset)}
                    className={`p-1 rounded-lg border-2 transition-colors ${
                      styles.primaryColor === preset.primary ? "border-gray-800" : "border-transparent hover:border-gray-300"
                    }`}
                    title={preset.name}
                  >
                    <div className="flex h-6 rounded overflow-hidden">
                      <div className="flex-1" style={{ backgroundColor: preset.primary }} />
                      <div className="flex-1" style={{ backgroundColor: preset.accent }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Font Sizes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
              <div className="space-y-3">
                {[
                  { key: "h1Size", label: "Name", max: "3.5" },
                  { key: "h2Size", label: "Section", max: "2" },
                  { key: "h3Size", label: "Title", max: "1.5" },
                  { key: "bodySize", label: "Body", max: "1.25" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 w-14">{item.label}</span>
                    <input
                      type="range"
                      min="0.75"
                      max={item.max}
                      step="0.125"
                      value={parseFloat(styles[item.key as keyof CustomizerStyles] as string)}
                      onChange={(e) => handleSizeChange(item.key as keyof CustomizerStyles, `${e.target.value}rem`)}
                      className="flex-1"
                    />
                    <span className="text-xs text-gray-500 w-12">{styles[item.key as keyof CustomizerStyles]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sections Tab */}
        {activeTab === "sections" && (
          <div className="space-y-2">
            <p className="text-sm text-gray-500 mb-4">Toggle sections to show/hide.</p>
            {SECTIONS.map((section) => {
              const hasData = sectionHasData(section.id);
              const isVisible = styles.visibleSections.includes(section.id);
              const isRequired = section.required;

              return (
                <label
                  key={section.id}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    isRequired ? "cursor-not-allowed" : "cursor-pointer"
                  } ${isVisible ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-gray-50"}`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isVisible}
                      onChange={() => handleSectionToggle(section.id)}
                      disabled={isRequired}
                      className={`w-4 h-4 rounded ${isRequired ? "text-gray-400 cursor-not-allowed" : "text-blue-600"}`}
                    />
                    <span className={`text-sm font-medium ${isVisible ? "text-gray-800" : "text-gray-500"}`}>
                      {section.label}
                    </span>
                    {isRequired && (
                      <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded">Required</span>
                    )}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${hasData ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"}`}>
                    {hasData ? "Has data" : "Empty"}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
