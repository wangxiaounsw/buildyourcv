"use client";

import { JsonResume } from "@/types/resume";

interface ElegantProps {
  resume: JsonResume;
}

export default function Elegant({ resume }: ElegantProps) {
  const { basics, work, education, skills, projects, languages } = resume;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg font-sans">
      {/* Header */}
      <header className="border-b-2 border-blue-600 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{basics.name}</h1>
        {basics.label && (
          <p className="text-xl text-blue-600 mt-1">{basics.label}</p>
        )}
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
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
                className="text-blue-600 hover:underline text-sm"
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
          <h2 className="text-lg font-semibold text-gray-800 mb-2 uppercase tracking-wide">Summary</h2>
          <p className="text-gray-600 leading-relaxed">{basics.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {work && work.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 uppercase tracking-wide">Work Experience</h2>
          <div className="space-y-4">
            {work.map((job, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{job.position}</h3>
                    <p className="text-blue-600">{job.company}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {job.startDate} - {job.endDate || "Present"}
                  </span>
                </div>
                {job.summary && (
                  <p className="text-gray-600 mt-2 text-sm">{job.summary}</p>
                )}
                {job.highlights && job.highlights.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {job.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
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
          <h2 className="text-lg font-semibold text-gray-800 mb-3 uppercase tracking-wide">Education</h2>
          <div className="space-y-3">
            {education.map((edu, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{edu.studyType} in {edu.area}</h3>
                    <p className="text-blue-600">{edu.institution}</p>
                  </div>
                  <span className="text-sm text-gray-500">
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
          <h2 className="text-lg font-semibold text-gray-800 mb-3 uppercase tracking-wide">Skills</h2>
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
          <h2 className="text-lg font-semibold text-gray-800 mb-3 uppercase tracking-wide">Projects</h2>
          <div className="space-y-3">
            {projects.map((project, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <h3 className="font-semibold text-gray-800">
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                      {project.name}
                    </a>
                  ) : (
                    project.name
                  )}
                </h3>
                {project.description && (
                  <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                )}
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
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
          <h2 className="text-lg font-semibold text-gray-800 mb-3 uppercase tracking-wide">Languages</h2>
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
    </div>
  );
}
