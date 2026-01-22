"use client";

import { JsonResume } from "@/types/resume";

interface ElegantProps {
  resume: JsonResume;
  visibleSections?: string[];
}

export default function Elegant({ resume, visibleSections = [] }: ElegantProps) {
  const { basics, work, education, skills, projects, languages, references, certificates, awards } = resume;
  const showReferencesSection = visibleSections.includes("references");

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg cv-font cv-body">
      {/* Header */}
      <header className="border-b-2 cv-border-primary pb-4 mb-6">
        <h1 className="font-bold text-gray-800 cv-h1">{basics.name}</h1>
        {basics.label && (
          <p className="cv-primary mt-1 cv-h2">{basics.label}</p>
        )}
        <div className="flex flex-wrap gap-4 mt-3 text-gray-600">
          {basics.email && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {basics.email}
            </span>
          )}
          {basics.phone && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {basics.phone}
            </span>
          )}
          {basics.location?.city && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {basics.location.city}{basics.location.countryCode && `, ${basics.location.countryCode}`}
            </span>
          )}
        </div>
        {basics.profiles && basics.profiles.length > 0 && (
          <div className="flex gap-3 mt-2">
            {basics.profiles.map((profile, index) => (
              <a
                key={index}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cv-primary hover:underline"
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
          <h2 className="font-semibold text-gray-800 mb-2 uppercase tracking-wide cv-h2">Summary</h2>
          <p className="text-gray-600 leading-relaxed">{basics.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {work && work.length > 0 && (
        <section className="mb-6">
          <h2 className="font-semibold text-gray-800 mb-3 uppercase tracking-wide cv-h2">Work Experience</h2>
          <div className="space-y-4">
            {work.map((job, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 cv-h3">{job.position}</h3>
                    <p className="cv-primary">{job.company}</p>
                  </div>
                  <span className="text-gray-500">
                    {job.startDate} - {job.endDate || "Present"}
                  </span>
                </div>
                {job.summary && (
                  <p className="text-gray-600 mt-2">{job.summary}</p>
                )}
                {job.highlights && job.highlights.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {job.highlights.map((highlight, i) => (
                      <li key={i} className="text-gray-600 flex items-start">
                        <span className="cv-primary mr-2">•</span>
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

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="font-semibold text-gray-800 mb-3 uppercase tracking-wide cv-h2">Education</h2>
          <div className="space-y-3">
            {education.map((edu, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 cv-h3">{edu.studyType} in {edu.area}</h3>
                    <p className="cv-primary">{edu.institution}</p>
                  </div>
                  <span className="text-gray-500">
                    {edu.startDate} - {edu.endDate || "Present"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h2 className="font-semibold text-gray-800 mb-3 uppercase tracking-wide cv-h2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div key={index} className="mb-2">
                <span className="font-medium text-gray-700">{skill.name}: </span>
                {skill.keywords && (
                  <span className="text-gray-600">
                    {skill.keywords.join(", ")}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="font-semibold text-gray-800 mb-3 uppercase tracking-wide cv-h2">Projects</h2>
          <div className="space-y-3">
            {projects.map((project, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <h3 className="font-semibold text-gray-800 cv-h3">
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:cv-primary">
                      {project.name}
                    </a>
                  ) : (
                    project.name
                  )}
                </h3>
                {project.description && (
                  <p className="text-gray-600 mt-1">{project.description}</p>
                )}
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="text-gray-600 flex items-start">
                        <span className="cv-primary mr-2">•</span>
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

      {/* Languages */}
      {languages && languages.length > 0 && (
        <section className="mb-6">
          <h2 className="font-semibold text-gray-800 mb-3 uppercase tracking-wide cv-h2">Languages</h2>
          <div className="flex flex-wrap gap-4">
            {languages.map((lang, index) => (
              <div key={index} className="text-gray-600">
                <span className="font-medium">{lang.language}</span>
                <span className="text-gray-400"> - </span>
                <span>{lang.fluency}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certificates */}
      {certificates && certificates.length > 0 && (
        <section className="mb-6">
          <h2 className="font-semibold text-gray-800 mb-3 uppercase tracking-wide cv-h2">Certificates</h2>
          <div className="space-y-2">
            {certificates.map((cert, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 cv-h3">{cert.name}</h3>
                    <p className="cv-primary">{cert.issuer}</p>
                  </div>
                  {cert.date && (
                    <span className="text-gray-500">{cert.date}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Awards */}
      {awards && awards.length > 0 && (
        <section className="mb-6">
          <h2 className="font-semibold text-gray-800 mb-3 uppercase tracking-wide cv-h2">Awards</h2>
          <div className="space-y-2">
            {awards.map((award, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 cv-h3">{award.title}</h3>
                    <p className="cv-primary">{award.awarder}</p>
                    {award.summary && (
                      <p className="text-gray-600 mt-1">{award.summary}</p>
                    )}
                  </div>
                  {award.date && (
                    <span className="text-gray-500">{award.date}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {showReferencesSection && (
        <section className="mb-6">
          <h2 className="font-semibold text-gray-800 mb-3 uppercase tracking-wide cv-h2">References</h2>
          {references && references.length > 0 ? (
            <div className="space-y-4">
              {references.map((ref, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-4">
                  <h3 className="font-semibold text-gray-800 cv-h3">{ref.name}</h3>
                  {(ref.title || ref.company) && (
                    <p className="cv-primary">
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
                    <p className="text-gray-600 italic mt-1">&ldquo;{ref.reference}&rdquo;</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 italic">References available upon request</p>
          )}
        </section>
      )}
    </div>
  );
}
