"use client";

import { JsonResume } from "@/types/resume";

interface ModernProps {
  resume: JsonResume;
  visibleSections?: string[];
}

export default function Modern({ resume, visibleSections = [] }: ModernProps) {
  const { basics, work, education, skills, projects, languages, references, certificates, awards } = resume;
  const showReferencesSection = visibleSections.includes("references");

  return (
    <div className="max-w-4xl mx-auto bg-white cv-font">
      {/* Header - Full width gradient */}
      <header className="cv-bg-primary text-white px-10 py-12" style={{
        background: `linear-gradient(135deg, var(--cv-primary-color, #4f46e5), var(--cv-accent-color, #7c3aed))`
      }}>
        <h1 className="font-light tracking-tight cv-h1">{basics.name}</h1>
        {basics.label && (
          <p className="text-white/70 mt-2 font-light cv-h2">{basics.label}</p>
        )}
        <div className="flex flex-wrap gap-6 mt-6 text-white/80 cv-body">
          {basics.email && (
            <a href={`mailto:${basics.email}`} className="hover:text-white transition-colors">
              {basics.email}
            </a>
          )}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.location?.city && (
            <span>{basics.location.city}{basics.location.countryCode && `, ${basics.location.countryCode}`}</span>
          )}
          {basics.profiles?.map((profile, index) => (
            <a
              key={index}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              {profile.network}
            </a>
          ))}
        </div>
      </header>

      <div className="px-10 py-8 cv-body">
        {/* Summary */}
        {basics.summary && (
          <section className="mb-10">
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              {basics.summary}
            </p>
          </section>
        )}

        {/* Skills - Horizontal pills */}
        {skills && skills.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs font-semibold uppercase tracking-widest mb-4 cv-primary">
              Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.flatMap((skill) =>
                skill.keywords?.map((keyword, i) => (
                  <span
                    key={`${skill.name}-${i}`}
                    className="px-4 py-2 rounded-full font-medium"
                    style={{
                      background: `linear-gradient(135deg, color-mix(in srgb, var(--cv-primary-color, #4f46e5) 10%, white), color-mix(in srgb, var(--cv-accent-color, #7c3aed) 10%, white))`,
                      color: "var(--cv-primary-color, #4f46e5)"
                    }}
                  >
                    {keyword}
                  </span>
                )) || []
              )}
            </div>
          </section>
        )}

        {/* Experience */}
        {work && work.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs font-semibold uppercase tracking-widest mb-6 cv-primary">
              Experience
            </h2>
            <div className="space-y-8">
              {work.map((job, index) => (
                <div key={index} className="relative pl-8 border-l-2" style={{ borderColor: "color-mix(in srgb, var(--cv-primary-color, #4f46e5) 20%, white)" }}>
                  <div className="absolute left-0 top-0 w-3 h-3 cv-bg-primary rounded-full -translate-x-[7px]"></div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800 cv-h3">{job.position}</h3>
                      <p className="cv-primary">{job.company}</p>
                    </div>
                    <span className="text-gray-400 font-light">
                      {job.startDate} — {job.endDate || "Present"}
                    </span>
                  </div>
                  {job.summary && (
                    <p className="text-gray-600 mt-2 font-light">{job.summary}</p>
                  )}
                  {job.highlights && job.highlights.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {job.highlights.map((highlight, i) => (
                        <li key={i} className="text-gray-600 font-light flex items-start">
                          <span className="cv-accent mr-3">◆</span>
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
          <section className="mb-10">
            <h2 className="text-xs font-semibold uppercase tracking-widest mb-6 cv-primary">
              Projects
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl border"
                  style={{
                    background: `linear-gradient(135deg, #f9fafb, color-mix(in srgb, var(--cv-primary-color, #4f46e5) 5%, white))`,
                    borderColor: "color-mix(in srgb, var(--cv-primary-color, #4f46e5) 15%, white)"
                  }}
                >
                  <h3 className="font-semibold text-gray-800 mb-2 cv-h3">
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:cv-primary transition-colors"
                      >
                        {project.name} →
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  {project.description && (
                    <p className="text-gray-600 font-light">{project.description}</p>
                  )}
                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="mt-3 text-gray-500 space-y-1">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="font-light">• {highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Grid: Education & Languages */}
        <div className="grid grid-cols-2 gap-10">
          {/* Education */}
          {education && education.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest mb-4 cv-primary">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-800 cv-h3">
                      {edu.studyType} in {edu.area}
                    </h3>
                    <p className="cv-primary">{edu.institution}</p>
                    <p className="text-gray-400 font-light">
                      {edu.startDate} — {edu.endDate || "Present"}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest mb-4 cv-primary">
                Languages
              </h2>
              <div className="flex flex-wrap gap-3">
                {languages.map((lang, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100"
                  >
                    <span className="font-medium text-gray-800">{lang.language}</span>
                    <span className="text-gray-400 ml-2">{lang.fluency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Certificates */}
        {certificates && certificates.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xs font-semibold uppercase tracking-widest mb-4 cv-primary">
              Certificates
            </h2>
            <div className="flex flex-wrap gap-3">
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="px-4 py-3 rounded-lg border"
                  style={{
                    background: `linear-gradient(135deg, color-mix(in srgb, var(--cv-primary-color, #4f46e5) 5%, white), color-mix(in srgb, var(--cv-accent-color, #7c3aed) 5%, white))`,
                    borderColor: "color-mix(in srgb, var(--cv-primary-color, #4f46e5) 15%, white)"
                  }}
                >
                  <span className="font-medium text-gray-800">{cert.name}</span>
                  <span className="cv-primary block">{cert.issuer}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Awards */}
        {awards && awards.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xs font-semibold uppercase tracking-widest mb-4 cv-primary">
              Awards
            </h2>
            <div className="space-y-4">
              {awards.map((award, index) => (
                <div key={index} className="relative pl-8 border-l-2" style={{ borderColor: "color-mix(in srgb, var(--cv-accent-color, #7c3aed) 20%, white)" }}>
                  <div className="absolute left-0 top-0 w-3 h-3 cv-bg-accent rounded-full -translate-x-[7px]"></div>
                  <h3 className="font-semibold text-gray-800 cv-h3">{award.title}</h3>
                  <p className="cv-primary">{award.awarder}</p>
                  {award.summary && (
                    <p className="text-gray-600 mt-1 font-light">{award.summary}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {showReferencesSection && (
          <section className="mt-10">
            <h2 className="text-xs font-semibold uppercase tracking-widest mb-6 cv-primary">
              References
            </h2>
            {references && references.length > 0 ? (
              <div className="grid grid-cols-2 gap-6">
                {references.map((ref, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl border"
                    style={{
                      background: `linear-gradient(135deg, #f9fafb, color-mix(in srgb, var(--cv-primary-color, #4f46e5) 5%, white))`,
                      borderColor: "color-mix(in srgb, var(--cv-primary-color, #4f46e5) 15%, white)"
                    }}
                  >
                    <h3 className="font-semibold text-gray-800 cv-h3">{ref.name}</h3>
                    {(ref.title || ref.company) && (
                      <p className="cv-primary text-sm">
                        {ref.title}{ref.title && ref.company && ", "}{ref.company}
                      </p>
                    )}
                    {ref.relationship && (
                      <p className="text-gray-500 text-sm">{ref.relationship}</p>
                    )}
                    {ref.contact && (
                      <p className="text-gray-500 text-sm">{ref.contact}</p>
                    )}
                    {ref.reference && (
                      <p className="text-gray-600 font-light italic mt-2">&ldquo;{ref.reference}&rdquo;</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 font-light italic">References available upon request</p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
