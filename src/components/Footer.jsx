import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="flex h-[8rem] w-full flex-col items-center justify-center gap-4 bg-gray-300 dark:bg-gray-900">
      <p className="text-[1rem] text-gray-800 dark:text-white">
        Made with ❤️ by Sam Sharma.
      </p>
      <div>
        <Link
          to="https://www.linkedin.com/in/samshrma/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={32} className="text-gray-800 dark:text-white" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
