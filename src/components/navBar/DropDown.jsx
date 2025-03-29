import React from "react";

const DropDown = ({
  selectedOption,
  selectedTimePeriod,
  selectedOrder,
  open,
  onOptionChange,
  onTimePeriodChange,
  onOrderChange,
  onToggle,
}) => {
  const options = [
    {
      key: "Popularity",
      label: "Popularity",
      sortKey: "brokerMeta.flags.popular.rank",
    },
    {
      key: "Minimum Amount",
      label: "Minimum Amount",
      sortKey: "stats.minInvestAmount",
    },
    {
      key: "Recently Rebalanced",
      label: "Recently Rebalanced",
      sortKey: "info.lastRebalanced",
    },
  ];
  const periods = ["1M", "6M", "1Y", "3Y", "5Y"];
  const orders = ["High - Low", "Low - High"];
  const getSortLabel = () => {
    if (selectedOption === "Returns" && selectedTimePeriod) {
      return `Sort by ${selectedTimePeriod} Returns (${
        selectedOrder === "High - Low" ? "H → L" : "L → H"
      })`;
    }
    return `Sort by ${selectedOption}`;
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={onToggle}
        className="px-2 text-sm text-gray-600 hover:text-black flex items-center space-x-1"
      >
        <span>{getSortLabel()}</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="absolute mt-2 w-64 rounded-lg border bg-white shadow-md p-4 space-y-4 z-50">
          <div className="space-y-2">
            {options.map((option) => (
              <div
                key={option.key}
                className="flex justify-between items-center cursor-pointer hover:bg-gray-50 px-2 py-1 rounded"
                onClick={() => {
                  onOptionChange(option.key);
                  onTimePeriodChange("");
                }}
              >
                <span
                  className={`${
                    selectedOption === option.key
                      ? "text-blue-600 font-medium"
                      : ""
                  }`}
                >
                  {option.label}
                </span>
                <span className="w-4 h-4 border rounded-full flex items-center justify-center">
                  {selectedOption === option.key && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  )}
                </span>
              </div>
            ))}
          </div>
          <div className="text-gray-600 font-medium pt-2">Returns</div>

          <div className="text-xs text-gray-400 mb-1">Time period</div>
          <div className="flex flex-wrap gap-2 border rounded p-1">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => {
                  onOptionChange("Returns");
                  onTimePeriodChange(period);
                }}
                className={`px-2 py-1 rounded text-sm ${
                  selectedTimePeriod === period
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "hover:bg-gray-100"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          {selectedTimePeriod && (
            <div>
              <div className="text-xs text-gray-400 mb-1 mt-2">Order by</div>
              <div className="flex border rounded overflow-hidden">
                {orders.map((order) => (
                  <button
                    key={order}
                    onClick={() => onOrderChange(order)}
                    className={`flex-1 text-sm px-2 py-1 ${
                      selectedOrder === order
                        ? "bg-blue-100 text-blue-600 font-medium"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {order}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropDown;
