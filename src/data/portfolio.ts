export type ProjectFrame = "browser" | "phone";

export type Project = {
  title: string;
  description: string;
  tech: string[];
  screenshot: string;
  frame: ProjectFrame;
  href?: string;
};

export const projects: Project[] = [
  {
    title: "56 Card Game",
    description:
      "Real-time multiplayer for four players: TypeScript rules engine, Socket.IO sync, and Expo—complete, interactive build you can hand to someone to play.",
    tech: ["TypeScript", "Expo", "Socket.IO", "Node.js"],
    screenshot: "/images/projects/56-card-game.png",
    frame: "phone",
    href: "https://github.com/RyanPurakal/56",
  },
  {
    title: "Health Misinformation Classifier",
    description:
      "DistilBERT fine-tuned on 10K+ health claims with weighted loss for class imbalance, calibrated confidence scores, and source-level explanations.",
    tech: ["Python", "PyTorch", "Hugging Face", "DistilBERT"],
    screenshot: "/images/projects/misinformation-classifier.png",
    frame: "browser",
    href: "https://github.com/RyanPurakal/health_misinformation",
  },
  {
    title: "Health Decoded",
    description:
      "Live React site for a nonprofit focused on youth health literacy—200+ users, SEO, analytics, and accessibility.",
    tech: ["React", "TypeScript", "SEO", "Analytics"],
    screenshot: "/images/projects/health-decoded.png",
    frame: "browser",
    href: "https://healthdecodedinitiative.org",
  },
  {
    title: "Recovery Risk Predictor",
    description:
      "ML dashboard predicting athlete recovery risk with 87% accuracy: scikit-learn model, FastAPI inference API, and Streamlit visualizations for coaches.",
    tech: ["Python", "FastAPI", "Streamlit", "Scikit-learn"],
    screenshot: "/images/projects/recovery-risk.png",
    frame: "browser",
    href: "https://github.com/RyanPurakal/reclaimMl-AI",
  },
  {
    title: "Image Restoration Pipeline",
    description:
      "Image restoration with PyTorch U-Net and Swin2SR via Hugging Face—training, inference, and evaluation tooling on degraded inputs.",
    tech: ["Python", "PyTorch", "Hugging Face", "U-Net"],
    screenshot: "/images/projects/image-restoration.png",
    frame: "browser",
    href: "https://github.com/RyanPurakal/imageprocessingpractice",
  },
  {
    title: "Paris Compass",
    description:
      "Full-stack climate analytics: Spring Boot backend, React frontend, Leaflet maps, and Gemini for generated insights alongside plotted indicators.",
    tech: ["Spring Boot", "React", "Leaflet", "Google Gemini"],
    screenshot: "/images/projects/paris-compass.png",
    frame: "browser",
    href: "https://github.com/RyanPurakal/pariscompass",
  },
];

export type ExperienceItem = {
  title: string;
  company: string;
  /** Optional site for the organization */
  companyUrl?: string;
  period: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    title: "Undergraduate Research Intern",
    company: "Rutgers WINLAB",
    period: "May 2026–Aug 2026",
    bullets: [
      "Working on CARLA-based autonomous vehicle simulation for the CityOS project.",
      "Simulated user interaction traces for an 8-person integrated research stack.",
    ],
  },
  {
    title: "Research Assistant (Incoming)",
    company: "Aresty Research Program / CAIT",
    period: "Sept 2026",
    bullets: [
      "Focused on AI for safe and intelligent transportation systems under PI Xiang Liu.",
    ],
  },
  {
    title: "AI Engineering Intern",
    company: "Rutgers University Life",
    period: "March 2026–Present",
    bullets: [
      "Built Project S.E.E.R., a Discord-based LLM agent with a FastAPI backend.",
      "Implemented OpenAI RAG pipeline over scraped GetInvolved listings.",
      "Designed DynamoDB schemas for clubs, events, and user preferences; scheduled AWS EventBridge digests.",
    ],
  },
  {
    title: "Technology Director",
    company: "Health Decoded",
    companyUrl: "https://healthdecodedinitiative.org",
    period: "Dec 2025–Present",
    bullets: [
      "Lead frontend architecture for a Next.js platform.",
      "Built interactive React/Vite/TypeScript workshop tools deployed in school sessions.",
    ],
  },
  {
    title: "Student Community Manager (Incoming)",
    company: "CS Coding and Social Lounge (CSL)",
    period: "Aug 2026",
    bullets: [
      "Role begins August 2026.",
    ],
  },
  {
    title: "Frontend Developer",
    company: "RUMAD",
    period: "Oct 2025–Present",
    bullets: [
      "Built cross-platform React Native apps with TypeScript.",
      "Architected a reusable component library of 15+ typed primitives.",
    ],
  },
  {
    title: "Outreach Chair",
    company: "CS Coding and Social Lounge (CSL)",
    period: "Present",
    bullets: [
      "Leads industry partnerships and student engagement.",
    ],
  },
];
