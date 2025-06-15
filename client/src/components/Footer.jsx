import {
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord />, label: "Discord" },
  { href: "https://github.com", icon: <FaGithub />, label: "GitHub" },
  { href: "https://linkedin.com", icon: <FaLinkedin />, label: "LinkedIn" },
  { href: "https://instagram.com", icon: <FaInstagram />, label: "Instagram" },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-gradient-to-r from-[#7f5af0] to-[#5542ff] py-6 text-white">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-6 md:flex-row">
        {/* Left: Brand & Tagline */}
        <div className="text-center md:text-left">
          <p className="text-lg font-semibold tracking-wide">ImagiTales</p>
          <p className="text-xs font-light">
            Where dreams meet storytelling ✨
          </p>
        </div>

        {/* Center: Social Icons */}
        <div className="flex justify-center gap-5">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-white transition duration-300 hover:text-yellow-300 text-xl"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Right: Footer Note */}
        <div className="text-center text-xs font-light md:text-right">
          <p>© {new Date().getFullYear()} ImagiTales. All rights reserved.</p>
          <p className="text-gray-200 italic">A non-commercial student project.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
