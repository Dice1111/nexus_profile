import React from "react";

const SearchBarLoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-fit">
      <div className="w-5 h-5 border-2 border-t-transparent border-green-500 rounded-full animate-spin" />
    </div>
  );
};

export default SearchBarLoadingSpinner;
