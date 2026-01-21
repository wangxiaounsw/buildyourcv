"use client";

import { JsonResume } from "@/types/resume";

interface KendallProps {
  resume: JsonResume;
}

export default function Kendall({ resume }: KendallProps) {
  const { basics, work, education, skills, projects, languages, certificates, references, awards } = resume;

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800 cv-font cv-body">
      {/* Header */}
      <header className="cv-bg-primary text-white px-8 py-10">
        <h1 className="font-bold mb-2 cv-h1">{basics.name}</h1>
        {basics.label && (
          <p className="text-white/80 mb-4 cv-h2">{basics.label}</p>
        )}
        <div className="flex flex-wrap gap-6 text-white/70">
          {basics.email && (
            <span>{basics.email}</span>
          )}
          {basics.phone && (
            <span>{basics.phone}</span>
          )}
          {basics.location?.city && (
            <span>{basics.location.city}{basics.location.countryCode && `, ${basics.location.countryCode}`}</span>
          )}
        </div>
        {basics.profiles && basics.profiles.length > 0 && (
          <div className="flex gap-4 mt-4">
            {basics.profiles.map((profile, index) => (
              <a
                key={index}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white"
              >
                {profile.network}
              </a>
            ))}
          </div>
        )}
      </header>

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Summary */}
          {basics.summary && (
            <section className="mb-8">
              <h2 className="font-bold text-gray-800 border-b-2 cv-border-primary pb-2 mb-4 cv-h2">
                PROFILE
              </h2>
              <p className="text-gray-600 leading-relaxed">{basics.summary}</p>
            </section>
          )}

          {/* Work Experience */}
          {work && work.length > 0 && (
            <section className="mb-8">
              <h2 className="font-bold text-gray-800 border-b-2 cv-border-primary pb-2 mb-4 cv-h2">
                EXPERIENCE
              </h2>
              <div className="space-y-6">
                {work.map((job, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-800 cv-h3">{job.position}</h3>
                        <p className="cv-primary">{job.company}</p>
                      </div>
                      <span className="text-gray-500 whitespace-nowrap">
                        {job.startDate} - {job.endDate || "Present"}
                      </span>
                    </div>
                    {job.summary && (
                      <p className="text-gray-600 mb-2">{job.summary}</p>
                    )}
                    {job.highlights && job.highlights.length > 0 && (
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {job.highlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
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
            <section className="mb-8">
              <h2 className="font-bold text-gray-800 border-b-2 cv-border-primary pb-2 mb-4 cv-h2">
                PROJECTS
              </h2>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-gray-800 cv-h3">
                      {project.url ? (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:cv-primary">
                          {project.name}
                        </a>
                      ) : (
                        project.name
                      )}
                    </h3>
                    {project.description && (
                      <p className="text-gray-600">{project.description}</p>
                    )}
                    {project.highlights && project.highlights.length > 0 && (
                      <ul className="list-disc list-inside text-gray-600 mt-1">
                        {project.highlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Sidebar */}
        <aside className="w-64 p-6" style={{ backgroundColor: "color-mix(in srgb, var(--cv-primary-color, #2563eb) 10%, white)" }}>
          {/* Skills */}
          {skills && skills.length > 0 && (
            <section className="mb-8">
              <h2 className="font-bold text-gray-800 uppercase tracking-wider mb-4 cv-h3">
                Skills
              </h2>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-700">{skill.name}</h3>
                    {skill.keywords && (
                      <p className="text-xs text-gray-600">{skill.keywords.join(", ")}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section className="mb-8">
              <h2 className="font-bold text-gray-800 uppercase tracking-wider mb-4 cv-h3">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-700">{edu.studyType}</h3>
                    <p className="text-xs text-gray-600">{edu.area}</p>
                    <p className="text-xs cv-primary">{edu.institution}</p>
                    <p className="text-xs text-gray-400">{edu.endDate || edu.startDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <section className="mb-8">
              <h2 className="font-bold text-gray-800 uppercase tracking-wider mb-4 cv-h3">
                Languages
              </h2>
              <div className="space-y-1">
                {languages.map((lang, index) => (
                  <div key={index}>
                    <span className="text-gray-700">{lang.language}</span>
                    <span className="text-gray-500 text-xs ml-2">({lang.fluency})</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certificates */}
          {certificates && certificates.length > 0 && (
            <section className="mb-8">
              <h2 className="font-bold text-gray-800 uppercase tracking-wider mb-4 cv-h3">
                Certificates
              </h2>
              <div className="space-y-2">
                {certificates.map((cert, index) => (
                  <div key={index}>
                    <p className="text-gray-700 font-medium">{cert.name}</p>
                    <p className="text-xs text-gray-500">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Awards */}
          {awards && awards.length > 0 && (
            <section className="mb-8">
              <h2 className="font-bold text-gray-800 uppercase tracking-wider mb-4 cv-h3">
                Awards
              </h2>
              <div className="space-y-2">
                {awards.map((award, index) => (
                  <div key={index}>
                    <p className="text-gray-700 font-medium">{award.title}</p>
                    <p className="text-xs text-gray-500">{award.awarder}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* References */}
          {references && references.length > 0 && (
            <section>
              <h2 className="font-bold text-gray-800 uppercase tracking-wider mb-4 cv-h3">
                References
              </h2>
              <div className="space-y-3">
                {references.map((ref, index) => (
                  <div key={index}>
                    <p className="text-gray-700 font-medium">{ref.name}</p>
                    <p className="text-xs text-gray-500 italic">&ldquo;{ref.reference}&rdquo;</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
