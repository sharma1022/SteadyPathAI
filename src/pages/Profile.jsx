import React, { useEffect } from "react";
import { Sidebar } from "../components";
import { useStateContext } from "../context";
import { usePrivy } from "@privy-io/react-auth";

const Profile = () => {
  const { currentUser, getUserByEmail } = useStateContext();
  const { user } = usePrivy();

  useEffect(() => {
    if (!currentUser) {
      getUserByEmail(user?.email?.address);
    }
  }, [currentUser, getUserByEmail]);
  if (!currentUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg text-gray-500">Loading...</div>
      </div>
    );
  }
  return (
    <div className="w-full rounded-lg bg-white py-6 shadow-lg dark:bg-[#1c1c24]">
      <div className="flex flex-col">
        <h1 className="mx-4 mb-2 text-3xl font-semibold text-gray-800 sm:mx-8 dark:text-white">
          User Profile
        </h1>
        <div className="mt-4 w-full border-t border-gray-200 px-4 sm:px-8 dark:border-neutral-800">
          <p className="mb-1 text-sm text-gray-400">First Name:</p>
          <p className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            {currentUser.firstName}
          </p>

          <p className="mb-1 text-sm text-gray-400">Last Name:</p>
          <p className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            {currentUser.lastName}
          </p>

          <p className="mb-1 text-sm text-gray-400">Email:</p>
          <p className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            {currentUser.createdBy}
          </p>

          <p className="mb-1 text-sm text-gray-400">Username:</p>
          <p className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            {currentUser.username}
          </p>

          <p className="mb-1 text-sm text-gray-400">Age:</p>
          <p className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            {currentUser.age}
          </p>

          <p className="mb-1 text-sm text-gray-400">Location:</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">
            {currentUser.location}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
