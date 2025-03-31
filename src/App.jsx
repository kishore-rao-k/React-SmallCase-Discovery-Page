import { useState, useEffect } from "react";
import Card from "./components/Card";
import AmountFilter from "./components/leftContainer/AmountFilter";
import LaunchDateFilter from "./components/leftContainer/LaunchDateFilter";
import StrategyFilter from "./components/leftContainer/StrategyFilter";
import SubscriptionButtons from "./components/leftContainer/SubscriptionButtons";
import VolatilityButtons from "./components/leftContainer/VolatilityButtons";
import DropDown from "./components/navBar/DropDown";
import NavBar from "./components/navBar/NavBar";

function App() {
  const [scData, setSCData] = useState([]);
  const [subscriptionFilter, setSubscriptionFilter] = useState("all");
  const [amountFilter, setAmountFilter] = useState("all");
  const [volatilityFilters, setVolatilityFilters] = useState([]);
  const [strategyFilters, setStrategyFilters] = useState([]);
  const [showRecentLaunches, setShowRecentLaunches] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Popularity");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("High - Low");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  

  const strategies = [
    "Asset Allocation",
    "Corporate Governance",
    "Dividend",
    "ESG",
    "Factor Investing",
    "Fundamental",
    "Goal Based",
    "Growth",
    "Momentum",
    "Quality",
    "Quantamental",
    "Quantitative",
    "Sector Tracker",
    "Technical",
    "Thematic",
    "Value",
  ];

  const calculateFilterCount = () => {
    let count = 0;
    if (subscriptionFilter !== "all") count++;
    if (amountFilter !== "all") count++;
    count += volatilityFilters.length;
    count += strategyFilters.length;
    if (showRecentLaunches) count++;
    return count;
  };

  const clearAllFilters = () => {
    setSubscriptionFilter("all");
    setAmountFilter("all");
    setVolatilityFilters([]);
    setStrategyFilters([]);
    setShowRecentLaunches(false);
  };

  const processData = () => {
    if (scData.length === 0) return [];
    let result = scData.filter((ele) => {
      if (subscriptionFilter === "free" && ele?.flags?.private !== false)
        return false;
      if (subscriptionFilter === "fee" && ele?.flags?.private !== true)
        return false;

      if (
        amountFilter !== "all" &&
        (!ele?.stats?.minInvestAmount ||
          ele.stats.minInvestAmount > amountFilter)
      ) {
        return false;
      }

      if (strategyFilters.length > 0) {
        const hasStrategy = ele?.info?.investmentStrategy?.some((strategy) =>
          strategyFilters.includes(strategy.displayName)
        );
        if (!hasStrategy) return false;
      }

      if (
        volatilityFilters.length > 0 &&
        !volatilityFilters.includes(ele?.stats?.ratios?.riskLabel)
      ) {
        return false;
      }

      if (showRecentLaunches) {
        const createdDate = new Date(ele?.info?.created);
        if (!ele?.info?.created || isNaN(createdDate.getTime())) {
          return false;
        }

        const fiveYearsAgo = new Date();
        fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);

        if (createdDate < fiveYearsAgo) {
          return false;
        }
      }

      return true;
    });
    result = [...result].sort((a, b) => {
      if (selectedOption === "Popularity") {
        const rankA = a.brokerMeta?.flags?.popular?.rank || Infinity;
        const rankB = b.brokerMeta?.flags?.popular?.rank || Infinity;
        return rankA - rankB;
      } else if (selectedOption === "Minimum Amount") {
        const amountA = a.stats?.minInvestAmount || Infinity;
        const amountB = b.stats?.minInvestAmount || Infinity;
        return amountA - amountB;
      } else if (selectedOption === "Recently Rebalanced") {
        const dateA = new Date(a.info?.lastRebalanced || 0);
        const dateB = new Date(b.info?.lastRebalanced || 0);
        return dateB - dateA;
      } else if (selectedOption === "Returns" && selectedTimePeriod) {
        const periodKeyMap = {
          "1M": "monthly",
          "6M": "halfyearly",
          "1Y": "yearly",
          "3Y": "threeYear",
          "5Y": "fiveYear",
        };
        const returnsKey = periodKeyMap[selectedTimePeriod];
        const returnsA = a.stats?.returns?.[returnsKey] || -Infinity;
        const returnsB = b.stats?.returns?.[returnsKey] || -Infinity;
        return selectedOrder === "High - Low"
          ? returnsB - returnsA
          : returnsA - returnsB;
      }
      return 0;
    });

    return result;
  };

  const displayData = processData();
  const showNoResults = displayData.length === 0;
  const filterCount = calculateFilterCount();

  const getActiveReturnPeriod = () => {
    if (selectedOption === "Returns") {
      return {
        "1M": { label: "1M Returns", key: "monthly" },
        "6M": { label: "6M Returns", key: "halfyearly" },
        "1Y": { label: "1Y CAGR", key: "yearly" },
        "3Y": { label: "3Y CAGR", key: "threeYear" },
        "5Y": { label: "5Y CAGR", key: "fiveYear" },
      }[selectedTimePeriod];
    }
    return null;
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/smallcases.json");
        const datas = await response.json();
        setSCData(datas.data);
      } catch (error) {
        setError("Error fetching data", error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <div className="flex flex-col  items-center ">
        <NavBar>
          <div className="p-4">
            <DropDown
              selectedOption={selectedOption}
              selectedTimePeriod={selectedTimePeriod}
              selectedOrder={selectedOrder}
              open={open}
              onOptionChange={setSelectedOption}
              onTimePeriodChange={setSelectedTimePeriod}
              onOrderChange={setSelectedOrder}
              onToggle={() => setOpen(!open)}
            />
          </div>
        </NavBar>

        <div className="flex  justify-center mx-auto">
          <div className="w-80 p-4  min-h-screen">
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

            <SubscriptionButtons
              activeFilter={subscriptionFilter}
              setActiveFilter={setSubscriptionFilter}
            />

            <AmountFilter
              activeAmount={amountFilter}
              setActiveAmount={setAmountFilter}
            />

            <VolatilityButtons
              activeVolatilities={volatilityFilters}
              setActiveVolatilities={setVolatilityFilters}
            />

            <LaunchDateFilter
              showRecentLaunches={showRecentLaunches}
              setShowRecentLaunches={setShowRecentLaunches}
            />

            <StrategyFilter
              strategies={strategies}
              activeStrategies={strategyFilters}
              setActiveStrategies={setStrategyFilters}
            />
          </div>
          <div className="flex-1 p-4 w-[940px]">
            {showNoResults ?  error? <p>{error}</p> :(
              <div className="flex flex-col items-center justify-center h-64">
                <h3 className="text-xl font-semibold mb-2">
                  No smallcases found
                </h3>
                <p className="text-gray-500">
                  Try refining your search results or removing some filters
                </p>
              </div>
            ) : (
              <Card
                scData={displayData.length > 0 ? displayData : scData}
                activeReturnPeriod={getActiveReturnPeriod()}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;