import { usePrivy } from "@privy-io/react-auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import { ContainerScroll } from "../components/ui/container-scroll-animation";
import dashImg from "../assets/icons/dash.png";
const Home = () => {
  const { authenticated } = usePrivy();
  const navigate = useNavigate();
  return (
    <section className="flex-center flex w-full flex-col items-center">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              SteadyPathAI <br />
              <span className="blue_gradient mt-1 text-4xl font-bold leading-none md:text-[6rem]">
                AI Powered Mental Health Care Recommendations
              </span>
            </h1>
          </>
        }
      >
        <img
          src={dashImg}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto h-full rounded-2xl object-cover object-left-top"
          draggable={false}
        />
      </ContainerScroll>

      <h1 className="head_text text-center text-black">
        <br className="max-md\:hidden" />
        <span className="blue_gradient text-center"></span>
      </h1>
      <p className="desc text-center">
        SteadyPathAI is dedicated to providing personalized mental health care
        through AI-driven treatment plans.
      </p>
      <div className="mt-4 h-12 flex-row justify-end gap-2 sm:flex">
        <CustomButton
          btnType={"button"}
          title={"Get Started"}
          styles={
            "bg-[#2563eb] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          }
          handleClick={() => {
            if (authenticated) {
              navigate("/dashboard");
            } else {
              navigate("/sign-in");
            }
          }}
        />
      </div>
    </section>
  );
};

export default Home;
