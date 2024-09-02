import React, { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useStateContext } from "../context/index";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const { currentUser } = useStateContext();

  const { user, authenticated, ready, login } = usePrivy();

  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !authenticated) {
      login();
    } else if (user && !currentUser) {
      console.log(currentUser);
      navigate("/onboarding");
    } else {
      navigate("/dashboard");
    }
  }, [authenticated, user, currentUser]);

  return <div></div>;
};

export default SignIn;
