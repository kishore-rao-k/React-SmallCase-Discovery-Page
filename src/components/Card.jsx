import React from "react";

const Card = ({ scData, activeReturnPeriod }) => {
  const riskIcons = {
    "Low Volatility": "/1.png",
    "Medium Volatility": "/2.png",
    "High Volatility": "/3.png",
  };

  const getReturnColor = (value) =>
    value < 0 ? "text-red-600" : "text-green-600";

  const getRiskIcon = (riskLabel) => riskIcons[riskLabel] || "/2.png";

  return (
    <>
      {scData.map((item) => {
        const currentReturnValue = activeReturnPeriod
          ? item.stats.returns?.[activeReturnPeriod.key]
          : item.stats.ratios?.cagr;

        const returnColor = getReturnColor(currentReturnValue);
        const rawRiskLabel =
          item.stats.ratios?.riskLabel || "Medium Volatility";
        const riskLabel =
          rawRiskLabel === "Medium Volatility" ? "Med. Volatile" : rawRiskLabel;
        const riskIcon = getRiskIcon(riskLabel);

        return (
          <div
            key={item._id}
            className="flex items-center justify-between w-[900px] bg-white p-6 pb-5 border border-transparent border-b-gray-300
                        transition-all duration-300 ease-in-out
                        hover:border-l hover:border-r hover:border-gray-300 hover:rounded-l-lg hover:rounded-r-lg
                        hover:shadow-sm hover:shadow-gray-100
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 group"
          >
            <div className="w-16 h-16">
              <img
                src={`https://assets.smallcase.com/images/smallcases/160/${item.scid}.png`}
                alt={item.info.name}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col flex-1 px-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  {item.info.name}
                </h2>

                {item.flags.private === false && (
                  <span className="text-[10px] font-semibold px-1 w-17 h-4 rounded bg-blue-100 text-blue-700  border-blue-300">
                    Free Access
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600">
                {item.info.shortDescription}
              </p>
              <p className="text-xs text-gray-500">
                by {item.info.publisherName}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-500">Min. Amount</p>
                <p className="text-md font-semibold text-gray-900">
                  ₹{item.stats.minInvestAmount?.toLocaleString() || "N/A"}
                </p>
              </div>

              <div className="text-center min-w-[120px]">
                {activeReturnPeriod ? (
                  <>
                    <p className="text-sm text-gray-500">
                      {activeReturnPeriod.label}
                    </p>
                    <p className={`text-md font-semibold ${returnColor}`}>
                      {(currentReturnValue * 100)?.toFixed(2) || "0.00"}%
                    </p>
                  </>
                ) : (
                  item.stats.ratios?.cagr && (
                    <>
                      <p className="text-sm text-gray-500">
                        {item.stats.ratios.cagrDuration || "Overall"} CAGR
                      </p>
                      <p className={`text-md font-semibold ${returnColor}`}>
                        {(currentReturnValue * 100)?.toFixed(2) || "0.00"}%
                      </p>
                    </>
                  )
                )}
              </div>

              <div className="flex items-center space-x-1 border rounded-md px-2 py-1 bg-white border-gray-300 text-sm text-gray-600">
                <img src={riskIcon} alt={riskLabel} className="w-9 h-9" />
                <span className="font-medium">{riskLabel}</span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Card;
