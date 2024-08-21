import React, { useState, useEffect } from "react";
import { Sidebar } from "../../components";
import { FiPlusCircle } from "react-icons/fi";
import RecordCard from "../../components/MedicalRecords/RecordCard";
const MedicalRecords = () => {
  const handleOpenModal = () => {};
  return (
    <div className="flex flex-row items-start gap-6">
      <Sidebar />
      <div className="flex flex-wrap gap-[26px]">
        <button
          type="button"
          className="txt-sm mt-6 inline-flex items-center gap-x-2 rounded-full border border-neutral-700 bg-[#13131a] px-4 py-2 font-medium text-white shadow-sm hover:bg-neutral-800"
          // onClick={handleOpenModal}
        >
          <FiPlusCircle size={28} />
          Create Record
        </button>

        <div className="grid w-full sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          <RecordCard />
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;
