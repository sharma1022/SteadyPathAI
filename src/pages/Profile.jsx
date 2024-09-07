import React, { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { useStateContext } from "../context";
import { usePrivy } from "@privy-io/react-auth";
import { MdEdit } from "react-icons/md";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  useEffect(() => {
    document.title = "SteadyPathAI | Profile";
  }, []);
  const { currentUser, getUserByEmail, editUser, deleteUser } =
    useStateContext();
  const { user, logout } = usePrivy();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editUserData, setEditUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    age: "",
    location: "",
  });

  const navigate = useNavigate();

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

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser(currentUser.id);
      setIsDeleteModalOpen(false);
      logout().then(navigate("/"));
    } catch (error) {
      console.error("Failed to delete user:", error);
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
          <h1 className="mx-4 mb-4 text-3xl font-semibold text-gray-800 dark:text-white sm:mx-8">
            User Account
          </h1>
          <MdEdit
            size={32}
            className="cursor-pointer text-cyan-600 hover:text-cyan-400"
            onClick={handleEditClick}
          />
        </div>

        <div className="w-full border-t border-gray-200 px-4 pt-4 dark:border-neutral-800 sm:px-8">
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

          <button
            className="mt-6 flex items-center justify-center gap-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-center text-sm font-medium text-red-800 shadow-sm hover:bg-red-300 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-[#13131a] dark:text-red-800 dark:hover:bg-red-100 lg:w-[16rem]"
            onClick={handleDeleteClick}
          >
            Delete your account
          </button>
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
      <Modal
        title="Confirm Account Deletion"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onAction={handleConfirmDelete}
        actionLabel="Delete Account"
      >
        <p>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>
      </Modal>
    </div>
  );
};

export default Profile;
