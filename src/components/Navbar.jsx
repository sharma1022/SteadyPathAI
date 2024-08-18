import React, { useCallback } from "react";
import { usePrivy } from "@privy-io/react-auth";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";
import { RiMentalHealthFill } from "react-icons/ri";
const Navbar = () => {
  const { ready, authenticated, login, user, logout } = usePrivy();

  const navigate = useNavigate();

  const handleLoginLogout = useCallback(() => {
    if (authenticated) {
      logout();
    } else {
      login();
      navigate("/dashboard");
    }
  }, [authenticated, login, logout, user]);

  return (
    <div className="mb-[35px] flex w-full flex-col-reverse justify-between gap-6 sm:flex-row md:flex-row">
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        <RiMentalHealthFill style={{ color: "#2563eb", fontSize: "50px" }} />
      </div>
      <div className="hidden flex-row justify-end gap-2 sm:flex">
        <CustomButton
          btnType={"button"}
          title={authenticated ? "Logout" : "Get Started"}
          styles={authenticated ? "bg-[#1dc071]" : "bg-[#2563eb]"}
          handleClick={handleLoginLogout}
        />
      </div>
    </div>
  );
};

export default Navbar;
