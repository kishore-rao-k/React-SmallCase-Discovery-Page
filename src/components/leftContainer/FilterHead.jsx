import React from 'react'

const FilterHead = ({clearAllFilters,filterCount }) => {
  return (
    <div className="flex justify-between items-center mb-4 border-b pb-5 border-gray-300">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700 mr-2">
                  Filters
                </span>
                <span className="bg-gray-200 rounded-md px-2 py-1 text-sm font-medium text-gray-800">
                  {filterCount}
                </span>
              </div>
              <button
                onClick={clearAllFilters}
                className="text-sm font-medium text-blue-600"
              >
                Clear All
              </button>
            </div>
  )
}

export default FilterHead

