import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="flex h-[10rem] w-full flex-col items-center justify-center gap-4 bg-gray-300 dark:bg-gray-900">
      <p className="font-epilogue text-lg text-gray-800 dark:text-white">
        Made with ❤️ by Sam Sharma.
      </p>
      <div className="flex flex-row gap-4">
        <Link
          to="https://www.linkedin.com/in/samshrma/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin
            size={32}
            className="curser-pointer text-gray-800 hover:text-cyan-600 dark:text-white"
          />
        </Link>
        <Link
          to="https://github.com/sharma1022/SteadyPathAI"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub
            size={32}
            className="curser-pointer text-gray-800 hover:text-cyan-600 dark:text-white"
          />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
