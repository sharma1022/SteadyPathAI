import React, { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { useStateContext } from "../context";
import { usePrivy } from "@privy-io/react-auth";
import { MdEdit } from "react-icons/md";
import Modal from "../components/Modal";
const Profile = () => {
  const { currentUser, getUserByEmail, editUser } = useStateContext();
  const { user } = usePrivy();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUserData, setEditUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    age: "",
    location: "",
  });

  useEffect(() => {
    if (!currentUser) {
      getUserByEmail(user?.email?.address);
    } else {
      setEditUserData({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        username: currentUser.username,
        age: currentUser.age,
        location: currentUser.location,
      });
    }
  }, [currentUser, getUserByEmail, user]);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    setEditUserData({
      ...editUserData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      await editUser(currentUser.id, editUserData);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  if (!currentUser) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <div className="text-lg text-gray-500">
          <InfinitySpin
            visible={true}
            width="200"
            color="#2196F3"
            ariaLabel="infinity-spin-loading"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg bg-white py-6 shadow-lg dark:bg-[#1c1c24]">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between pr-8">
          <h1 className="mx-4 mb-4 text-3xl font-semibold text-gray-800 sm:mx-8 dark:text-white">
            User Account
          </h1>
          <MdEdit
            size={32}
            className="cursor-pointer text-cyan-600 hover:text-cyan-400"
            onClick={handleEditClick}
          />
        </div>

        <div className="w-full border-t border-gray-200 px-4 pt-4 sm:px-8 dark:border-neutral-800">
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

      <Modal
        title="Edit Profile"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAction={handleSaveChanges}
        actionLabel="Save Changes"
      >
        <div className="flex flex-col gap-4">
          <input
            name="firstName"
            value={editUserData.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
            className="block w-full rounded-lg border-2 px-4 py-3 text-sm focus:border-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500"
          />
          <input
            name="lastName"
            value={editUserData.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="block w-full rounded-lg border-2 px-4 py-3 text-sm focus:border-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500"
          />
          <input
            name="username"
            value={editUserData.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="block w-full rounded-lg border-2 px-4 py-3 text-sm focus:border-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500"
          />
          <input
            name="age"
            value={editUserData.age}
            onChange={handleInputChange}
            placeholder="Age"
            type="number"
            className="block w-full rounded-lg border-2 px-4 py-3 text-sm focus:border-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500"
          />
          <input
            name="location"
            value={editUserData.location}
            onChange={handleInputChange}
            placeholder="Location"
            className="block w-full rounded-lg border-2 px-4 py-3 text-sm focus:border-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500"
          />
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
