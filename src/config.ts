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
      title: "Quiz App",
      description: "TestlyHub is a clean, modern marketplace for MCQ practice tests, allowing users to attempt free and paid quizzes, track progress, and view leaderboards to enhance their preparation journey",
      image: "https://res.cloudinary.com/dyy1lrdhl/image/upload/v1752759163/HomePage_gq87wi.png",
      github: "https://github.com/shrikanth-dev/testlyhub-frontend",
      live: "https://testlyhub-frontend.vercel.app/",
    },
    {
      title: "A Smart TV OTT Platform UI",
      description: "This project is a Smart TV OTT Platform UI built with React, TypeScrip…",
      image: "https://res.cloudinary.com/dyy1lrdhl/image/upload/v1752759053/HomePage-SpotlightCarousel_la9zs6.png",
      github: "https://github.com/shrikanth-dev/Smart-TV-OTT-Platform-UI",
      live: "https://shrikanth-dev.github.io/Smart-TV-OTT-Platform-UI/",
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

