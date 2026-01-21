// JSON Resume Schema TypeScript Definitions
// Based on https://jsonresume.org/schema/

export interface Location {
  address?: string;
  postalCode?: string;
  city?: string;
  countryCode?: string;
  region?: string;
}

export interface Profile {
  network: string;
  username?: string;
  url: string;
}

export interface Basics {
  name: string;
  label?: string;
  image?: string;
  email?: string;
  phone?: string;
  url?: string;
  summary?: string;
  location?: Location;
  profiles?: Profile[];
}

export interface Work {
  name?: string;
  company: string;
  position: string;
  url?: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

export interface Education {
  institution: string;
  url?: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate?: string;
  score?: string;
  courses?: string[];
}

export interface Skill {
  name: string;
  level?: string;
  keywords?: string[];
}

export interface Project {
  name: string;
  description?: string;
  highlights?: string[];
  keywords?: string[];
  startDate?: string;
  endDate?: string;
  url?: string;
  roles?: string[];
  entity?: string;
  type?: string;
}

export interface Award {
  title: string;
  date: string;
  awarder: string;
  summary?: string;
}

export interface Certificate {
  name: string;
  date: string;
  issuer: string;
  url?: string;
}

export interface Publication {
  name: string;
  publisher: string;
  releaseDate: string;
  url?: string;
  summary?: string;
}

export interface Language {
  language: string;
  fluency: string;
}

export interface Interest {
  name: string;
  keywords?: string[];
}

export interface Reference {
  name: string;
  reference: string;
}

export interface Volunteer {
  organization: string;
  position: string;
  url?: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

export interface JsonResume {
  $schema?: string;
  basics: Basics;
  work?: Work[];
  volunteer?: Volunteer[];
  education?: Education[];
  awards?: Award[];
  certificates?: Certificate[];
  publications?: Publication[];
  skills?: Skill[];
  languages?: Language[];
  interests?: Interest[];
  references?: Reference[];
  projects?: Project[];
  meta?: {
    canonical?: string;
    version?: string;
    lastModified?: string;
  };
}

// Default empty resume for initialization
export const defaultResume: JsonResume = {
  basics: {
    name: "John Doe",
    label: "Software Engineer",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    summary: "A passionate software engineer with experience in web development.",
    location: {
      city: "San Francisco",
      countryCode: "US"
    },
    profiles: [
      {
        network: "LinkedIn",
        url: "https://linkedin.com/in/johndoe"
      },
      {
        network: "GitHub",
        url: "https://github.com/johndoe"
      }
    ]
  },
  work: [
    {
      company: "Tech Company",
      position: "Senior Software Engineer",
      startDate: "2020-01",
      endDate: "Present",
      summary: "Leading development of web applications",
      highlights: [
        "Led a team of 5 developers",
        "Improved application performance by 40%",
        "Implemented CI/CD pipelines"
      ]
    }
  ],
  education: [
    {
      institution: "University of Technology",
      area: "Computer Science",
      studyType: "Bachelor",
      startDate: "2014-09",
      endDate: "2018-06"
    }
  ],
  skills: [
    {
      name: "Frontend",
      keywords: ["React", "TypeScript", "Next.js", "Tailwind CSS"]
    },
    {
      name: "Backend",
      keywords: ["Node.js", "Python", "PostgreSQL"]
    }
  ],
  projects: [
    {
      name: "Open Source Project",
      description: "A popular open source tool",
      highlights: ["1000+ GitHub stars", "Used by 500+ developers"],
      url: "https://github.com/example/project"
    }
  ],
  languages: [
    {
      language: "English",
      fluency: "Native"
    },
    {
      language: "Spanish",
      fluency: "Intermediate"
    }
  ]
};
