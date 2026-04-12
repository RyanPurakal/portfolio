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
    title: "Health Decoded",
    description:
      "React web platform for a nonprofit focused on youth health literacy, serving 200+ users.",
    tech: ["React", "TypeScript", "SEO", "Analytics"],
    screenshot: "/images/projects/health-decoded.png",
    frame: "browser",
    href: "https://github.com/RyanPurakal/healthdecoded",
  },
  {
    title: "56 Card Game",
    description:
      "Real-time multiplayer card game with live score sync for 4 players.",
    tech: ["TypeScript", "React Native", "Socket.IO", "Node.js"],
    screenshot: "/images/projects/56-card-game.png",
    frame: "phone",
    href: "https://github.com/RyanPurakal/56",
  },
  {
    title: "Paris Compass",
    description:
      "Full-stack climate analytics platform with AI-powered 5-year projections and interactive world map.",
    tech: ["Spring Boot", "React", "Leaflet.js", "Google Gemini"],
    screenshot: "/images/projects/paris-compass.png",
    frame: "browser",
    href: "https://github.com/RyanPurakal/pariscompass",
  },
  {
    title: "Flight Compare",
    description:
      "Cross-platform app that fetches live flight pricing with AI-generated recommendations.",
    tech: ["React Native", "Expo", "Google Gemini", "RapidAPI"],
    screenshot: "/images/projects/flight-compare.png",
    frame: "phone",
    href: "https://github.com/RyanPurakal/flightcompare",
  },
  {
    title: "Health Misinformation Classifier",
    description:
      "Fine-tuned PubMedBERT on 10K+ health claims with confidence scoring and source-level explanations.",
    tech: ["Python", "PyTorch", "Hugging Face", "PubMedBERT"],
    screenshot: "/images/projects/misinformation-classifier.png",
    frame: "browser",
    href: "https://github.com/RyanPurakal/health_misinformation",
  },
  {
    title: "Recovery Risk Predictor",
    description:
      "ML dashboard predicting athlete recovery risk with 87% accuracy and coach-facing visualizations.",
    tech: ["Python", "FastAPI", "Streamlit", "Scikit-learn"],
    screenshot: "/images/projects/recovery-risk.png",
    frame: "browser",
    href: "https://github.com/RyanPurakal/reclaimMl-AI",
  },
];

export type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    title: "Technology Director",
    company: "Health Decoded",
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
