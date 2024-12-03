import React from 'react';

type SearchInputProps = {
  placeholder: string;
};

const SearchInput: React.FC<SearchInputProps> = ({ placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300 shadow-sm bg-white"
    />
  );
};

export default SearchInput;
