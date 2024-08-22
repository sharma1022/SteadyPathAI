import React from "react";
import { MdOutlineUploadFile } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { Sidebar } from "../../components";
import RecordDetailsHeader from "../../components/MedicalRecords/RecordDetailsHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { TbProgress } from "react-icons/tb";
import FileUploadModal from "../../components/MedicalRecords/FileUploadModal";

const RecordDetails = () => {
  const { state } = useLocation();
  return (
    <div className="flex flex-row items-start gap-6">
      <Sidebar />
      <div className="flex flex-wrap gap-[26px]">
        <button
          type="button"
          //   onClick={() => {handleOpenModal}}
          className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-[#13131a] dark:text-white dark:hover:bg-neutral-800"
        >
          <MdOutlineUploadFile size={24} />
          Upload Reports
        </button>
        <FileUploadModal isOpen={isModalOpen} />
        <RecordDetailsHeader recordName={state.recordName} />
        <div className="w-full">
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="inline-block min-w-full p-1.5 align-middle">
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-[#13131a]">
                  <div className="border-b border-gray-200 px-6 py-4 dark:border-neutral-700">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                      Personalized AI-Driven Treatment Recommendations
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-neutral-400">
                      A tailored medical strategy leveraging advanced AI
                      insights.
                    </p>
                  </div>
                  <div className="flex w-full flex-col px-6 py-4 text-white">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Analysis Result
                      </h2>
                      <div className="space-y-2">{"rendering the results"}</div>
                    </div>
                    <div className="mt-5 grid gap-2 sm:flex">
                      <button
                        type="button"
                        className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
                      >
                        View Treatment plan
                        <FaChevronRight size={20} />
                        {true && (
                          <TbProgress
                            size={10}
                            className="mr-3 h-5 w-5 animate-spin"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordDetails;
