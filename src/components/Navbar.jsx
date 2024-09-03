import React, { useCallback, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";
import { RiMentalHealthFill } from "react-icons/ri";
import { navlinks } from "../constants";
import ThemeSwitcher from "./ThemeSwitcher";
const Navbar = () => {
  const { ready, authenticated, login, user, logout } = usePrivy();
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [isActive, setIsActive] = useState("Dashboard");
  const navigate = useNavigate();

  const handleLoginLogout = useCallback(() => {
    if (authenticated) {
      logout();
      navigate("/");
    } else {
      navigate("/sign-in");
    }
  }, [authenticated, logout, user]);

  return (
    <div className="mb-[35px] flex w-full flex-col-reverse justify-between gap-6 sm:flex-row md:flex-row">
      <div
        className="hidden cursor-pointer gap-4 sm:flex sm:flex-row sm:items-center"
        onClick={() => navigate("/")}
      >
        <RiMentalHealthFill style={{ color: "#2563eb", fontSize: "50px" }} />
        <p className="navbar-txt blue_gradient text-center">SteadyPathAI</p>
      </div>
      <div className="hidden flex-row justify-end gap-2 sm:flex">
        <CustomButton
          btnType={"button"}
          title={authenticated ? "Logout" : "Get Started"}
          styles={
            authenticated
              ? "bg-cyan-600 hover:bg-cyan-500"
              : "bg-[#2563eb] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          }
          handleClick={handleLoginLogout}
        />
      </div>
      <div className="relative flex items-center justify-between sm:hidden">
        <div
          className="flex h-[40px] cursor-pointer items-center justify-center sm:hidden"
          onClick={() => navigate("/")}
        >
          <RiMentalHealthFill style={{ color: "#2563eb", fontSize: "40px" }} />
        </div>
        <img
          src="src/assets/icons/menu.svg"
          alt="Menu icon"
          className="h-[34px] w-[34px] cursor-pointer object-contain hover:grayscale"
          onClick={() => {
            setToggleDrawer((prev) => !prev);
          }}
        />

        <div
          className={`shadow-secondary absolute left-0 right-0 top-[60px] z-10 bg-gray-200 py-4 shadow-lg dark:bg-[#1c1c24] ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex items-center p-4 ${isActive === link.name && "bg-gray-100 dark:bg-[#3a3a43]"}`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`h-[24px] w-[24px] object-contain ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }`}
                />
                <p
                  className={`font-epilogue ml-[20px] text-[14px] font-semibold ${
                    isActive === link.name ? "text-[#0891b2]" : "text-[#808191]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
            <li className="flex items-center p-4">
              <ThemeSwitcher />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
