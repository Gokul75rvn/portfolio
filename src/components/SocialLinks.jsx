import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const socialItems = [
  {
    icon: <FaLinkedin size={24} />,
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/gokul-s-472a34269",
  },
  {
    icon: <FaGithub size={24} />,
    name: "GitHub",
    link: "https://github.com/Gokul75rvn",
  },
  {
    icon: <FaInstagram size={24} />,
    name: "Instagram",
    link: "https://www.instagram.com/.goku_?igsh=aHFwajB2ZTNwZm9m",
  },
];

const SocialLinks = () => {
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {socialItems.map((item, index) => (
        <a
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-[#1f1f2e] text-white px-6 py-4 rounded-xl shadow-lg hover:bg-[#2d2e4a] transition duration-300"
        >
          <div className="flex items-center space-x-4">
            <div className="text-[#6366f1]">{item.icon}</div>
            <span className="font-semibold">{item.name}</span>
          </div>
          <span className="text-sm text-gray-400">View</span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
