import type { IconType } from 'react-icons';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

interface SocialLink {
  name: string;
  url: string;
  icon: IconType;
}

interface Project {
  title: string;
  description: string;
  image: string;
  github: string;
  live: string;
}

interface Config {
  name: string;
  role: string;
  bio: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  skills: string[];
  projects: Project[];
  socials: SocialLink[]; 
}

const config: Config = {
  name: "GODUGU SRIKANTH",
  role: "Full Stack Developer",
  bio: "Full Stack Dev | MERN + AI | Building clean, scalable apps with React, Node, OpenAI",
  // bio: "Building scalable, AI-powered web experiences with MERN stack and OpenAI integrations.",
  socialLinks: {
    github: "https://github.com/shrikanth-dev",
    linkedin: "https://www.linkedin.com/in/g-srikanth-gs",
    twitter: "#",
  },
  skills: ["JavaScript", "TypeScript", "React", "Node.js", "MongoDB", "Express","SQL", "Supabase", "BOOTSTRAP", "HTML & CSS", "SASS",],
  projects: [
    {
      title: "MERN AI Portfolio",
      description: "A stunning portfolio built with MERN stack and AI integrations.",
      image: "/assets/portfolio.png",
      github: "https://github.com/yourhandle/mern-ai-portfolio",
      live: "https://yourportfolio.vercel.app",
    },
    {
      title: "Quiz App",
      description: "A full-stack quiz application with leaderboard and timed tests.",
      image: "/assets/quiz.png",
      github: "https://github.com/yourhandle/quiz-app",
      live: "https://quizapp.vercel.app",
    },
  ],
  socials: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/g-srikanth-gs', icon: FaLinkedin },
    { name: 'GitHub', url: 'https://github.com/shrikanth-dev', icon: FaGithub },
    { name: 'Twitter', url: '#', icon: FaTwitter },
    { name: 'Email', url: 'mailto:shrikanth.godugu@gmail.com', icon: FaEnvelope },
  ],
};

export default config;

