import React from "react";
import { navlinks } from "../constants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`h-[48px] w-[48px] rounded-[10px] xl:w-[216px] xl:gap-4 ${
      isActive &&
      isActive === name &&
      "bg-gray-100 hover:bg-gray-300 dark:bg-[#2c2f32]"
    } flex items-center justify-center xl:justify-start xl:px-4 ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt={`${name} logo`} className="h-6 w-6" />
    ) : (
      <img
        src={imgUrl}
        alt={`${name} logo`}
        className={`h-6 w-6 ${isActive !== name && "grayscale"}`}
      />
    )}
    <p
      className={`sidebar-txt ${
        isActive === name ? "text-[#0891b2]" : "text-[#808191]"
      }`}
    >
      {name}
    </p>
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("Dashboard");
  return (
    <div className="hidden flex-col items-center justify-between gap-48 rounded-[20px] bg-gray-200 py-4 sm:flex sm:p-4 xl:w-[248px] xl:text-left dark:bg-[#1c1c24]">
      <div className="flex flex-col items-center justify-center gap-3">
        {navlinks.map((link) => (
          <div>
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          </div>
        ))}
      </div>
      <ThemeSwitcher />
    </div>
  );
};

export default Sidebar;
