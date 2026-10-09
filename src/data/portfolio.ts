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

export type ExperienceGroup = "Research & Work" | "Projects" | "Leadership & Community";

export type ExperienceItem = {
  title: string;
  company: string;
  /** Optional site for the organization */
  companyUrl?: string;
  period?: string;
  group: ExperienceGroup;
  bullets: string[];
};

export const experienceGroups: ExperienceGroup[] = [
  "Research & Work",
  "Projects",
  "Leadership & Community",
];

export const experience: ExperienceItem[] = [
  {
    title: "Aresty Research Assistant",
    company: "Rutgers CAIT (Center for Advanced Infrastructure & Transportation)",
    period: "Sept 2026–April 2027",
    group: "Research & Work",
    bullets: [
      "Working on AI for Safe and Intelligent Transportation Systems under Prof. Xiang Liu.",
      "Contributing to TransitTwin, a simulation platform for proposed NJ TRANSIT capital projects.",
      "Turn the team's rail analyses into repeatable Python (pandas) tools and bring the outputs into TransitTwin through GitLab.",
    ],
  },
  {
    title: "CS3 Accelerator",
    company: "Columbia University + Rutgers University",
    period: "Present",
    group: "Research & Work",
    bullets: [
      "Building CityLab with a team in the accelerator run by Columbia through the NSF Engineering Research Center for Smart Streetscapes (CS3).",
      "Supervised at Rutgers by Prof. Jorge Ortiz.",
      "Also participating in Columbia I-Corps.",
    ],
  },
  {
    title: "CityOS",
    company: "Rutgers WINLAB (Wireless Information Network Lab)",
    period: "May 2026–Aug 2026",
    group: "Research & Work",
    bullets: [
      "Worked on a privacy-preserving smart-city pipeline.",
      "Built a CARLA simulation workflow with an LLM-driven interaction loop.",
      "Developed FAISS/RAG pipelines and synthetic trace generation.",
    ],
  },
  {
    title: "Student Community Manager",
    company: "CSL (Coding and Social Lounge)",
    period: "Aug 2026–Present",
    group: "Research & Work",
    bullets: [
      "Peer tutoring for CS 111 through 211.",
      "Run events like Jeopardy nights.",
      "Handle social media and community engagement.",
    ],
  },
  {
    title: "Paris Compass",
    company: "github.com/RyanPurakal/pariscompass",
    companyUrl: "https://github.com/RyanPurakal/pariscompass",
    group: "Projects",
    bullets: [
      "Climate analytics app built with Spring Boot, React, and Gemini.",
      "Finished full-stack application, expanded from the original HackRU hackathon version.",
    ],
  },
  {
    title: "AI Clubs & Events Agent",
    company: "Rutgers University Life",
    group: "Projects",
    bullets: [
      "Discord bot that recommends Rutgers clubs and events to students.",
      "FAISS-based search, cron scheduling, and slash commands.",
    ],
  },
  {
    title: "Cofounder & Technology Director",
    company: "Health Decoded",
    companyUrl: "https://healthdecodedinitiative.org",
    group: "Leadership & Community",
    bullets: [],
  },
  {
    title: "Day-of Committee Member",
    company: "HackRU",
    group: "Leadership & Community",
    bullets: [],
  },
  {
    title: "Treasurer",
    company: "RUMAD (Rutgers Mobile App Development)",
    group: "Leadership & Community",
    bullets: [],
  },
  {
    title: "Outreach Chair",
    company: "USACS (Undergraduate Student Alliance of Computer Scientists)",
    group: "Leadership & Community",
    bullets: [],
  },
];
