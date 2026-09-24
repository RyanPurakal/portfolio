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
      "Real-time multiplayer for four players: TypeScript rules engine, Socket.IO sync, and Expo; a complete, interactive build you can hand to someone to play.",
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
      "Live React site for a nonprofit focused on youth health literacy: 200+ users, SEO, analytics, and accessibility.",
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
      "Image restoration with PyTorch U-Net and Swin2SR via Hugging Face, with training, inference, and evaluation tooling on degraded inputs.",
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

export type ExperienceGroup = "Research" | "Engineering" | "Community";

export type ExperienceItem = {
  title: string;
  company: string;
  /** Optional site for the organization */
  companyUrl?: string;
  period: string;
  group: ExperienceGroup;
  bullets: string[];
};

export const experienceGroups: ExperienceGroup[] = [
  "Research",
  "Engineering",
  "Community",
];

export const experience: ExperienceItem[] = [
  {
    title: "Aresty Research Assistant",
    company: "Rutgers CAIT (Center for Advanced Infrastructure & Transportation)",
    period: "Sept 2026–Present",
    group: "Research",
    bullets: [
      "Working on AI for Safe and Intelligent Transportation Systems under Prof. Xiang Liu.",
      "Applying computer vision and machine learning to rail and transit safety.",
    ],
  },
  {
    title: "Rail Network Analysis & Modeling",
    company: "NJ TRANSIT",
    period: "Present",
    group: "Research",
    bullets: [
      "Analyzing and modeling NJ TRANSIT's rail network, supervised by Prof. Xiang Liu.",
    ],
  },
  {
    title: "CS3 Accelerator & I-Corps",
    company: "Columbia University",
    period: "Present",
    group: "Research",
    bullets: [
      "Part of the Columbia CS3 smart cities and streetscapes accelerator, supervised by Prof. Jorge Ortiz.",
      "Also in the Columbia I-Corps program.",
    ],
  },
  {
    title: "Undergraduate Research Intern",
    company: "Rutgers WINLAB (Wireless Information Network Lab)",
    period: "May 2026–Aug 2026",
    group: "Research",
    bullets: [
      "Worked on CARLA-based autonomous vehicle simulation for the CityOS project.",
      "Simulated user interaction traces for an 8-person integrated research stack.",
    ],
  },
  {
    title: "Cofounder & Technology Director",
    company: "Health Decoded",
    companyUrl: "https://healthdecodedinitiative.org",
    period: "Dec 2025–Present",
    group: "Engineering",
    bullets: [
      "Cofounded a nonprofit that teaches health literacy to young people.",
      "Lead frontend architecture for the Next.js platform.",
      "Built interactive React/Vite/TypeScript workshop tools used in live school sessions.",
    ],
  },
  {
    title: "AI Engineering Intern",
    company: "Rutgers University Life",
    period: "March 2026–Present",
    group: "Engineering",
    bullets: [
      "Built Project S.E.E.R., a Discord-based LLM agent with a FastAPI backend.",
      "Implemented an OpenAI RAG pipeline over scraped GetInvolved listings.",
      "Designed DynamoDB schemas for clubs, events, and user preferences; scheduled AWS EventBridge digests.",
    ],
  },
  {
    title: "Frontend Developer",
    company: "RUMAD (Rutgers University Mobile App Development)",
    period: "Oct 2025–Present",
    group: "Engineering",
    bullets: [
      "Build cross-platform React Native apps with TypeScript.",
      "Architected a reusable component library of 15+ typed primitives.",
    ],
  },
  {
    title: "Student Community Manager",
    company: "CSL (Coding and Social Lounge)",
    period: "Aug 2026–Present",
    group: "Community",
    bullets: [
      "Organize lounge events and tutor CS students.",
      "Lead community engagement for the lounge.",
    ],
  },
];
