import React, { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useStateContext } from "../context/index";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const { currentUser, getUserByEmail } = useStateContext();

  const { user, authenticated, ready, login } = usePrivy();

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "SteadyPathAI | Sign In";
  }, []);

  useEffect(() => {
    if (ready) {
      if (!authenticated) {
        login();
      } else if (user && !currentUser) {
        getUserByEmail(user.email.address);
        navigate("/onboarding");
      } else if (currentUser) {
        navigate("/dashboard");
      }
    }
  }, [authenticated, currentUser, ready, user, navigate, getUserByEmail]);

  return <div></div>;
};

export default SignIn;
