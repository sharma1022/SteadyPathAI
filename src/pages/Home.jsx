import React from "react";

const Home = () => {
  return (
    <section className="flex-center flex w-full flex-col items-center">
      <h1 className="head_text text-center">
        SteadyPathAI
        <br className="max-md\:hidden" />
        <span className="blue_gradient text-center">
          AI Powered Mental Health Care Recommendations
        </span>
      </h1>
      <p className="desc text-center">
        SteadyPathAI is dedicated to providing personalized mental health care
        through AI-driven treatment plans.
      </p>
    </section>
  );
};

export default Home;
