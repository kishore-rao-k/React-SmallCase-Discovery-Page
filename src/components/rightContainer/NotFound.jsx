import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <h3 className="text-xl font-semibold mb-2">No smallcases found</h3>
      <p className="text-gray-500">
        Try refining your search results or removing some filters
      </p>
    </div>
  );
};

export default NotFound;
