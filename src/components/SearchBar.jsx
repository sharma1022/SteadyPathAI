import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ placeholder, onSearch, value }) => {
  const [searchTerm, setSearchTerm] = useState(value);

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className="flex h-[52px] max-w-[458px] flex-row rounded-[100px] bg-gray-200 py-2 pl-4 pr-2 dark:bg-[#1c1c24]">
      <input
        type="text"
        placeholder={placeholder}
        className="font-epilogue flex w-full bg-transparent text-[14px] font-normal text-gray-800 outline-none placeholder:text-[#4b5264] dark:text-white"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <div
        className="flex h-full w-[72px] cursor-pointer items-center justify-center rounded-[20px] bg-cyan-600 hover:bg-cyan-500"
        onClick={onSearch}
      >
        <FaSearch
          size={15}
          className="object-contain text-white dark:text-gray-300"
        />
      </div>
    </div>
  );
};

export default SearchBar;
