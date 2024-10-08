import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { usePrivy } from "@privy-io/react-auth";
import { useNavigate } from "react-router-dom";
const Onboarding = () => {
  const [firstName, setFirstNname] = useState("");
  const [lastName, setLastNname] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");

  const { createUser } = useStateContext();
  const { user } = usePrivy();

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "SteadyPathAI | Register";
  }, []);

  const handleOnboarding = async (e) => {
    e.preventDefault();
    const userData = {
      firstName,
      lastName,
      username,
      age: parseInt(age, 10),
      location,
      createdBy: user.email.address,
    };
    const newUser = await createUser(userData);

    if (newUser) {
      navigate("/profile");
    }
  };
  return (
    <div className="mt-16 flex items-center justify-center dark:bg-[#13131a]">
      <div className="w-full max-w-lg rounded-xl bg-gray-300 p-8 shadow-lg dark:bg-[#1c1c24]">
        <h2 className="mb-2 text-center text-5xl font-bold text-white">👋 </h2>
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-white">
          Welcome! Let's get started
        </h2>
        <form onSubmit={handleOnboarding}>
          <div className="flex flex-row justify-between gap-4">
            <div className="mb-4 w-full">
              <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-bold text-gray-800 dark:text-gray-300"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstNname(e.target.value)}
                required
                className="w-full rounded-lg bg-neutral-100 px-4 py-3 text-gray-800 placeholder:text-[#4b5264] focus:border-blue-600 focus:outline-none dark:bg-neutral-900 dark:text-neutral-400"
                placeholder="John"
              />
            </div>
            <div className="mb-4 w-full">
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-bold text-gray-800 dark:text-gray-300"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastNname(e.target.value)}
                required
                className="w-full rounded-lg bg-neutral-100 px-4 py-3 text-gray-800 placeholder:text-[#4b5264] focus:border-blue-600 focus:outline-none dark:bg-neutral-900 dark:text-neutral-400"
                placeholder="Smith"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-bold text-gray-800 dark:text-gray-300"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-lg bg-neutral-100 px-4 py-3 text-gray-800 placeholder:text-[#4b5264] focus:border-blue-600 focus:outline-none dark:bg-neutral-900 dark:text-neutral-400"
              placeholder="johnsmith"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="age"
              className="mb-2 block text-sm font-bold text-gray-800 dark:text-gray-300"
            >
              Age
            </label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="w-full rounded-lg bg-neutral-100 px-4 py-3 text-gray-800 placeholder:text-[#4b5264] focus:border-blue-600 focus:outline-none dark:bg-neutral-900 dark:text-neutral-400"
              placeholder="0"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="mb-2 block text-sm font-bold text-gray-800 dark:text-gray-300"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full rounded-lg bg-neutral-100 px-4 py-3 text-gray-800 placeholder:text-[#4b5264] focus:border-blue-600 focus:outline-none dark:bg-neutral-900 dark:text-neutral-400"
              placeholder="NY"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
