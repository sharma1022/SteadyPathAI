import React from "react";
import { FaFolderOpen } from "react-icons/fa";

const RecordDetailsHeader = ({ recordName }) => {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
      <div className="flex flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-800 dark:bg-[#13131a]">
        <div className="w-18 flex justify-between gap-x-3 p-4 md:p-5">
          <div className="flex h-11 w-full flex-shrink-0 items-center justify-between rounded-full text-white dark:text-blue-200">
            <FaFolderOpen size={64} className="text-cyan-600" />
          </div>
        </div>
        <p className="inline-flex items-center justify-between rounded-b-xl border-t border-gray-200 px-4 py-3 text-sm text-gray-600 md:px-5 dark:border-neutral-800 dark:text-neutral-400">
          {recordName}
        </p>
      </div>
    </div>
  );
};

export default RecordDetailsHeader;
