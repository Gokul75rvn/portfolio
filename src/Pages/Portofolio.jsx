import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes, Github, ExternalLink, Calendar } from "lucide-react";

// ✅ Import certificate images
import cr1 from "../assets/certificates/cr1.jpg";
import cr2 from "../assets/certificates/cr2.jpg";
import cr3 from "../assets/certificates/cr3.jpg";
import cr4 from "../assets/certificates/cr4.jpg";
import cr5 from "../assets/certificates/cr5.jpg";
import cr6 from "../assets/certificates/cr6.jpg";
import cr7 from "../assets/certificates/cr7.jpg";
import cr8 from "../assets/certificates/cr8.jpg";

const localCertificates = [cr1, cr2, cr3, cr4, cr5, cr6, cr7, cr8];

// ✅ Projects Data - Add your actual projects here
const projects = [
  {
    id: 1,
    title: "Personal Portfolio Website",
    description: "A modern, responsive portfolio website built with React and Tailwind CSS. Features smooth animations, dark theme, and interactive components.",
    image: "pr.png", // Replace with your actual image
    githubUrl: "https://github.com/Gokul75rvn/portfolio.git", // Replace with your actual GitHub URL
    liveUrl: "https://portfolio-1aua-7dbvg3jw3-gokul75rvns-projects.vercel.app/", // Optional: Replace with live demo URL
    technologies: ["React", "Tailwind CSS", "Vite"],
    date: "2025-05",
    status: "Completed"
  },
  {
    id: 2,
     title: "Delay Messager",
  description: "React-based delay message sender app where users can schedule messages with a countdown timer and cancel them before sending.",
  image: "pr1.png", // Replace with actual screenshot if available
  githubUrl: "https://github.com/Gokul75rvn/Delay-messager",
  liveUrl: "https://delay-texter-avuuo1wi6-gokul75rvns-projects.vercel.app",
  technologies: ["React", "JavaScript", "Tailwind CSS", "Vite"],
  date: "2025-08",
  status: "Completed"
  },
  {
    id: 3,
    title: "Task Management System",
    description: "A collaborative task management tool with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "https://via.placeholder.com/400x250/10b981/ffffff?text=Task+Manager", // Replace with your actual image
    githubUrl: "https://github.com/yourusername/task-manager", // Replace with your actual GitHub URL
    liveUrl: "", // Optional
    technologies: ["React", "Firebase", "Material-UI", "Socket.io"],
    date: "2023-10",
    status: "In Progress"
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "Interactive weather dashboard with location-based forecasts, weather maps, and historical data visualization.",
    image: "https://via.placeholder.com/400x250/f59e0b/ffffff?text=Weather+App", // Replace with your actual image
    githubUrl: "https://github.com/yourusername/weather-dashboard", // Replace with your actual GitHub URL
    liveUrl: "https://yourweatherapp.com", // Optional
    technologies: ["React", "OpenWeather API", "Chart.js", "CSS3"],
    date: "2023-09",
    status: "Completed"
  },
  {
    id: 5,
    title: "Social Media Clone",
    description: "Instagram-like social media platform with photo sharing, likes, comments, and user profiles.",
    image: "https://via.placeholder.com/400x250/ef4444/ffffff?text=Social+Media", // Replace with your actual image
    githubUrl: "https://github.com/yourusername/social-media-clone", // Replace with your actual GitHub URL
    liveUrl: "", // Optional
    technologies: ["React", "Node.js", "PostgreSQL", "AWS S3"],
    date: "2023-08",
    status: "Completed"
  },
  {
    id: 6,
    title: "Crypto Tracker",
    description: "Real-time cryptocurrency tracking application with price alerts, portfolio management, and market analysis.",
    image: "https://via.placeholder.com/400x250/8b5cf6/ffffff?text=Crypto+Tracker", // Replace with your actual image
    githubUrl: "https://github.com/yourusername/crypto-tracker", // Replace with your actual GitHub URL
    liveUrl: "https://yourcryptotracker.com", // Optional
    technologies: ["React", "CoinGecko API", "TypeScript", "Redux"],
    date: "2023-07",
    status: "Completed"
  }
];

// ✅ Project Card Component
const ProjectCard = ({ project, index }) => {
  const handleGithubClick = () => {
    window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
  };

  const handleLiveClick = () => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
      data-aos-duration="1000"
      data-aos-delay={index * 100}
      className="group bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-2"
    >
      {/* Project Image */}
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            project.status === 'Completed' 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
          }`}>
            {project.status}
          </span>
        </div>

        {/* Action Buttons (appear on hover) */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <button
            onClick={handleGithubClick}
            className="flex-1 bg-gray-800/80 backdrop-blur-sm text-white py-2 px-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700/80 transition-colors text-sm font-medium"
          >
            <Github className="w-4 h-4" />
            Code
          </button>
          {project.liveUrl && (
            <button
              onClick={handleLiveClick}
              className="flex-1 bg-purple-600/80 backdrop-blur-sm text-white py-2 px-3 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-500/80 transition-colors text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              Live
            </button>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
            {project.title}
          </h3>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar className="w-3 h-3" />
            {project.date}
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-2 py-1 bg-white/10 text-purple-300 rounded-md text-xs font-medium border border-white/20"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 bg-white/5 text-gray-400 rounded-md text-xs">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Toggle Button Component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 hover:border-white/20 backdrop-blur-sm group relative overflow-hidden"
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${
          isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"
        }`}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

// Tab Panel
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;
  const initialProjects = isMobile ? 2 : 4;

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = () => {
    setShowAllCertificates((prev) => !prev);
  };

  const toggleShowMoreProjects = () => {
    setShowAllProjects((prev) => !prev);
  };

  const displayedCertificates = showAllCertificates
    ? localCertificates
    : localCertificates.slice(0, initialItems);

  const displayedProjects = showAllProjects
    ? projects
    : projects.slice(0, initialProjects);

  return (
    <div
      className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden"
      id="Portofolio"
    >
      {/* Header */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span
            style={{
              color: "#6366f1",
              backgroundImage: "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise. Each
          section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03), rgba(59, 130, 246, 0.03))",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            textColor="secondary"
            indicatorColor="secondary"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": { transform: "scale(1.1) rotate(5deg)" },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": { color: "#a78bfa" },
                },
              },
              "& .MuiTabs-indicator": { height: 0 },
              "& .MuiTabs-flexContainer": { gap: "8px" },
            }}
          >
            <Tab icon={<Code className="mb-2 w-5 h-5" />} label="Projects" {...a11yProps(0)} />
            <Tab icon={<Award className="mb-2 w-5 h-5" />} label="Certificates" {...a11yProps(1)} />
            <Tab icon={<Boxes className="mb-2 w-5 h-5" />} label="Tech Stack" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        {/* ✅ Projects Tab */}
        {value === 0 && (
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayedProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            </div>
            {projects.length > initialProjects && (
              <div className="mt-8 w-full flex justify-start">
                <ToggleButton onClick={toggleShowMoreProjects} isShowingMore={showAllProjects} />
              </div>
            )}
          </TabPanel>
        )}

        {/* Certificates Tab */}
        {value === 1 && (
          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                {displayedCertificates.map((img, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration="1000"
                  >
                    <Certificate ImgSertif={img} />
                  </div>
                ))}
              </div>
            </div>
            {localCertificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton onClick={toggleShowMore} isShowingMore={showAllCertificates} />
              </div>
            )}
          </TabPanel>
        )}

        {/* Tech Stack Tab */}
        {value === 2 && (
          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 lg:gap-8">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration="1000"
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        )}
      </Box>
    </div>
  );
}
