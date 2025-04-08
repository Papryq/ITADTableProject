import React from "react";

const SortAndSearch = ({
  sortBy,
  sortOrder,
  handleSortByOrderNumber,
  handleSortByDate,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="flex-1 justify-between mb-4">
      <button
        onClick={handleSortByOrderNumber}
        className="bg-teal-400 text-white border-white border-2 px-2 mr-3 rounded-lg hover:bg-teal-600"
      >
        Sort by Order Number{" "}
        {sortBy === "orderNumber" && (sortOrder === "asc" ? "↑" : "↓")}
      </button>

      <button
        onClick={handleSortByDate}
        className="bg-teal-400 border-white px-2 border-2 text-white rounded-lg hover:bg-teal-600"
      >
        Sort by Expiry Date{" "}
        {sortBy === "orderDateExpiresAt" && (sortOrder === "asc" ? "↑" : "↓")}
      </button>

      <input
        type="text"
        placeholder="Search orders..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border-2 mt-2 px-2 ml-8 lg:ml-4 lg:mr-2 lg:mx-16 border-teal-500 rounded-lg"
      />
    </div>
  );
};

export default SortAndSearch;
