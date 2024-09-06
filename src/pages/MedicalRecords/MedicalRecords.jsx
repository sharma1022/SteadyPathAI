import React, { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import RecordCard from "../../components/MedicalRecords/RecordCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { useStateContext } from "../../context";
import CreateRecordModal from "../../components/MedicalRecords/CreateRecordModal";
import { InfinitySpin } from "react-loader-spinner";
import SearchBar from "../../components/SearchBar";

const MedicalRecords = () => {
  const navigate = useNavigate();
  const { user } = usePrivy();
  const { records, getUserRecords, createRecord, getUserByEmail, currentUser } =
    useStateContext();
  const [userRecords, setUserRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    if (user) {
      getUserByEmail(user.email.address);
      getUserRecords(user.email.address);
    }
  }, [user, getUserByEmail, getUserRecords]);

  useEffect(() => {
    const filteredRecords = records.filter((record) =>
      record?.recordName?.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    setUserRecords(filteredRecords);
    localStorage.setItem("userRecords", JSON.stringify(filteredRecords));
  }, [records, searchQuery]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const createFolder = async (foldername) => {
    try {
      if (currentUser) {
        const newRecord = await createRecord({
          userId: currentUser.id,
          recordName: foldername,
          analysisResult: "",
          kanbanRecords: "",
          createdBy: user.email.address,
        });

        if (newRecord) {
          getUserRecords(user.email.address);
          handleCloseModal();
        }
      }
    } catch (e) {
      console.log(e);
      handleCloseModal();
    }
  };

  const handleNavigate = (name) => {
    const filteredRecords = userRecords.filter(
      (record) => record.recordName === name,
    );
    navigate(`/medical-records/${name}`, {
      state: filteredRecords[0],
    });
  };

  const handleSearch = (searchTerm) => {
    setSearchParams({ search: searchTerm });
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
    <div className="flex flex-col gap-[26px]">
      <SearchBar
        value={searchQuery}
        onSearch={handleSearch}
        placeholder={"Search for records"}
      />
      <button
        type="button"
        className="inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-300 disabled:pointer-events-none disabled:opacity-50 lg:w-[16rem] dark:border-neutral-700 dark:bg-[#13131a] dark:text-white dark:hover:bg-neutral-800"
        onClick={handleOpenModal}
      >
        <FiPlusCircle size={24} />
        Create Record
      </button>

      <CreateRecordModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreate={createFolder}
      />

      <div className="grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {userRecords.length > 0 ? (
          userRecords.map((record) => (
            <RecordCard
              key={record.recordName}
              record={record}
              onNavigate={handleNavigate}
            />
          ))
        ) : (
          <div className="text-center text-gray-500">No records found</div>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;
