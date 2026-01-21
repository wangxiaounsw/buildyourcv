"use client";

import { JsonResume } from "@/types/resume";

interface StackoverflowProps {
  resume: JsonResume;
}

export default function Stackoverflow({ resume }: StackoverflowProps) {
  const { basics, work, education, skills, projects, languages, references, certificates } = resume;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 cv-font cv-body">
      {/* Header */}
      <header className="border-b-4 cv-border-primary pb-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-bold text-gray-900 cv-h1">{basics.name}</h1>
            {basics.label && (
              <p className="cv-primary mt-1 cv-h2">{basics.label}</p>
            )}
          </div>
          <div className="text-right text-gray-600 text-xs">
            {basics.email && <p>{basics.email}</p>}
            {basics.phone && <p>{basics.phone}</p>}
            {basics.location?.city && (
              <p>{basics.location.city}{basics.location.countryCode && `, ${basics.location.countryCode}`}</p>
            )}
          </div>
        </div>
        {basics.profiles && basics.profiles.length > 0 && (
          <div className="flex gap-4 mt-4">
            {basics.profiles.map((profile, index) => (
              <a
                key={index}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:cv-bg-accent hover:text-white text-xs transition-colors"
              >
                {profile.network}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Summary */}
      {basics.summary && (
        <section className="mb-6">
          <p className="text-gray-700 leading-relaxed p-4 rounded border-l-4 cv-border-primary" style={{ backgroundColor: "color-mix(in srgb, var(--cv-primary-color, #2563eb) 5%, white)" }}>
            {basics.summary}
          </p>
        </section>
      )}

      {/* Skills - Developer Style Tags */}
      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
            // TECH STACK
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div key={index} className="flex flex-wrap gap-1">
                {skill.keywords?.map((keyword, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded text-xs border"
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--cv-accent-color, #3b82f6) 15%, white)",
                      borderColor: "color-mix(in srgb, var(--cv-accent-color, #3b82f6) 30%, white)",
                      color: "var(--cv-primary-color, #2563eb)"
                    }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {work && work.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
            // EXPERIENCE
          </h2>
          <div className="space-y-4">
            {work.map((job, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4 hover:cv-border-primary transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900 cv-h3">{job.position}</h3>
                    <p className="cv-primary">{job.company}</p>
                  </div>
                  <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {job.startDate} → {job.endDate || "present"}
                  </code>
                </div>
                {job.summary && (
                  <p className="text-gray-600 mt-2">{job.summary}</p>
                )}
                {job.highlights && job.highlights.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {job.highlights.map((highlight, i) => (
                      <li key={i} className="text-gray-600 flex items-start">
                        <span className="cv-primary mr-2">→</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
            // PROJECTS
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded border border-gray-200 hover:cv-border-accent transition-colors">
                <h3 className="font-bold text-gray-900 cv-h3">
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:cv-primary">
                      {project.name} ↗
                    </a>
                  ) : (
                    project.name
                  )}
                </h3>
                {project.description && (
                  <p className="text-gray-600 mt-1 text-xs">{project.description}</p>
                )}
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="mt-2 text-xs text-gray-500">
                    {project.highlights.map((highlight, i) => (
                      <li key={i}>• {highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Languages */}
      <div className="grid grid-cols-2 gap-6">
        {/* Education */}
        {education && education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              // EDUCATION
            </h2>
            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-bold text-gray-900 cv-h3">{edu.studyType} in {edu.area}</h3>
                  <p className="cv-primary text-xs">{edu.institution}</p>
                  <code className="text-xs text-gray-400">{edu.endDate || edu.startDate}</code>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <section>
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              // LANGUAGES
            </h2>
            <div className="space-y-1">
              {languages.map((lang, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-gray-700">{lang.language}</span>
                  <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-600 rounded">
                    {lang.fluency}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Certificates */}
      {certificates && certificates.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
            // CERTIFICATES
          </h2>
          <div className="flex flex-wrap gap-2">
            {certificates.map((cert, index) => (
              <div key={index} className="px-3 py-2 rounded border" style={{
                backgroundColor: "color-mix(in srgb, var(--cv-accent-color, #10b981) 10%, white)",
                borderColor: "color-mix(in srgb, var(--cv-accent-color, #10b981) 25%, white)"
              }}>
                <span className="font-bold text-gray-800">{cert.name}</span>
                <span className="text-gray-500 text-xs ml-2">({cert.issuer})</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {references && references.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
            // REFERENCES
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {references.map((ref, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded border border-gray-200">
                <h3 className="font-bold text-gray-900 cv-h3">{ref.name}</h3>
                <p className="text-gray-600 text-xs mt-2 italic">&ldquo;{ref.reference}&rdquo;</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-400">
        <code>// Generated with BuildYourCV.today</code>
      </footer>
    </div>
  );
}
