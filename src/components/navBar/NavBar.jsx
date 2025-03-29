import React from 'react';

function NavBar({ children }) {
  return (
    <div className="border-b border-gray-200 bg-white px-4 pt-3 pb-1">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Discover</h2>
      <div className="flex items-center justify-between">
        <div className="flex space-x-6 text-sm font-medium text-gray-500">
          <button className="hover:text-black">Collections</button>
          <button className="text-blue-600">All smallcases</button>
          <button className="hover:text-black">Managers</button>
        </div>
        <div className="flex items-center space-x-6">
          {children}
          <div className="flex items-center border border-gray-300 rounded-md px-2 py-1">
            <span className="text-gray-500 mr-2 text-sm">&#128269;</span>
            <input
              type="text"
              placeholder="smallcase, manager or a stock..."
              className="bg-transparent focus:outline-none text-sm placeholder:text-gray-400 w-52"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;