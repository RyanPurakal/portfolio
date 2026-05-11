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
    title: "Technology Director",
    company: "Health Decoded",
    companyUrl: "https://healthdecodedinitiative.org",
    period: "Dec 2025–Present",
    bullets: [
      "Lead frontend architecture and deployment for a React platform serving 200+ users.",
      "Ship features with a focus on accessibility, SEO, and performance budgets.",
      "Collaborate with design and stakeholders on roadmap and technical tradeoffs.",
    ],
  },
  {
    title: "Frontend Developer",
    company: "RUMAD",
    period: "Oct 2025–Present",
    bullets: [
      "Build and maintain UI for student-facing products with React and modern CSS.",
      "Participate in code review and shared component patterns across teams.",
      "Iterate quickly from feedback while keeping bundles lean.",
    ],
  },
  {
    title: "Mentor/Treasurer",
    company: "USACS",
    period: "Sep 2025–Present",
    bullets: [
      "Support CS community initiatives and student mentorship programs.",
      "Manage club finances and documentation with clear reporting.",
      "Coordinate events and cross-org collaboration.",
    ],
  },
];
