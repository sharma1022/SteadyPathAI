import React from "react";
import { navlinks } from "../constants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`h-[48px] w-[48px] rounded-[10px] xl:w-[192px] xl:gap-4 ${
      isActive && isActive === name && "bg-[#2c2f32]"
    } flex items-center justify-center xl:justify-start ${
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
    <p className={"sidebar-txt !text-white"}>{name}</p>
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  return (
    <div className="mt-8 flex w-[76px] flex-1 flex-col items-center justify-between gap-48 rounded-[20px] bg-[#1c1c24] py-4 xl:w-[240px] xl:text-left">
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
      <Icon
        styles="bg-[#1c1c24] shadow-secondary"
        imgUrl={"src/assets/icons/sun.svg"}
      />
    </div>
  );
};

export default Sidebar;
