import { useState, useEffect } from "react";
import Card from "./components/rightContainer/Card";
import AmountFilter from "./components/leftContainer/AmountFilter";
import LaunchDateFilter from "./components/leftContainer/LaunchDateFilter";
import StrategyFilter from "./components/leftContainer/StrategyFilter";
import SubscriptionButtons from "./components/leftContainer/SubscriptionButtons";
import VolatilityButtons from "./components/leftContainer/VolatilityButtons";
import DropDown from "./components/navBarContainer/DropDown";
import NavBar from "./components/navBarContainer/NavBar";
import NotFound from "./components/rightContainer/NotFound";
import FilterHead from "./components/leftContainer/FilterHead";

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

  const strategies = function () {
    return scData.reduce((result, curr) => {
      const inv = curr.info.investmentStrategy;
      for (let s of inv) {
        result.add(s.displayName);
      }

      return result;
    }, new Set());
  };

  const calculateFilterCount = function () {
    let count = 0;
    if (subscriptionFilter !== "all") {
      count++;
    }
    if (amountFilter !== "all") {
      count++;
    }
    count += volatilityFilters.length;
    count += strategyFilters.length;
    if (showRecentLaunches) {
      count++;
    }
    return count;
  };

  const clearAllFilters = function () {
    setSubscriptionFilter("all");
    setAmountFilter("all");
    setVolatilityFilters([]);
    setStrategyFilters([]);
    setShowRecentLaunches(false);
  };

  const processData = function () {
    if (scData.length === 0) {
      return [];
    }

    let filteredData = scData.filter((item) => {
      if (subscriptionFilter === "free" && item.flags.private !== false) {
        return false;
      }
      if (subscriptionFilter === "fee" && item.flags.private !== true) {
        return false;
      }

      if (amountFilter !== "all") {
        const minAmount = item.stats.minInvestAmount;
        if (!minAmount || minAmount > amountFilter) {
          return false;
        }
      }

      if (strategyFilters.length > 0) {
        const strategies = item.info.investmentStrategy;
        const hasMatchingStrategy = strategies.some((strategy) =>
          strategyFilters.includes(strategy.displayName)
        );
        if (!hasMatchingStrategy) {
          return false;
        }
      }

      if (volatilityFilters.length > 0) {
        const riskLevel = item.stats.ratios.riskLabel;
        if (!volatilityFilters.includes(riskLevel)) {
          return false;
        }
      }

      if (showRecentLaunches) {
        const createdDate = new Date(item.info.created);
        const fiveYearsAgo = new Date();
        fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);

        if (!item.info.created || createdDate < fiveYearsAgo) {
          return false;
        }
      }

      return true;
    });

    let sortedData = filteredData.sort((a, b) => {
      if (selectedOption === "Popularity") {
        const rankA = a.brokerMeta.flags.popular.rank;
        const rankB = b.brokerMeta.flags.popular.rank;
        return rankA - rankB;
      } else if (selectedOption === "Minimum Amount") {
        const amountA = a.stats.minInvestAmount;
        const amountB = b.stats.minInvestAmount;
        return amountA - amountB;
      } else if (selectedOption === "Recently Rebalanced") {
        const dateA = new Date(a.info.lastRebalanced);
        const dateB = new Date(b.info.lastRebalanced);
        return dateB - dateA;
      } else if (selectedOption === "Returns" && selectedTimePeriod) {
        const periodKeys = {
          "1M": "monthly",
          "6M": "halfyearly",
          "1Y": "yearly",
          "3Y": "threeYear",
          "5Y": "fiveYear",
        };

        const key = periodKeys[selectedTimePeriod];
        const returnsA = a.stats.returns?.[key];
        const returnsB = b.stats.returns?.[key];

        if (selectedOrder === "High - Low") {
          return returnsB - returnsA;
        } else {
          return returnsA - returnsB;
        }
      }

      return 0;
    });

    return sortedData;
  };

  const displayData = processData();
  const showNoResults = displayData.length === 0;
  const filterCount = calculateFilterCount();

  function getActiveReturnPeriod() {
    if (selectedOption !== "Returns") {
      return null;
    }

    const returnPeriods = {
      "1M": { label: "1M Returns", key: "monthly" },
      "6M": { label: "6M Returns", key: "halfyearly" },
      "1Y": { label: "1Y CAGR", key: "yearly" },
      "3Y": { label: "3Y CAGR", key: "threeYear" },
      "5Y": { label: "5Y CAGR", key: "fiveYear" },
    };
    return returnPeriods[selectedTimePeriod];
  }

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
          <DropDown
            selectedOption={selectedOption}
            selectedTimePeriod={selectedTimePeriod}
            selectedOrder={selectedOrder}
            open={open}
            onOptionChange={setSelectedOption}
            onTimePeriodChange={setSelectedTimePeriod}
            onOrderChange={setSelectedOrder}
            onToggle={() => setOpen((prevOpen) => !prevOpen)}
          />
        </NavBar>

        <div className="flex  justify-center mx-auto">
          <div className="w-80 p-4  min-h-screen">
            <FilterHead
              filterCount={filterCount}
              clearAllFilters={clearAllFilters}
            />

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
              strategies={strategies()}
              activeStrategies={strategyFilters}
              setActiveStrategies={setStrategyFilters}
            />
          </div>
          <div className="flex-1 p-4 w-[940px]">
            {showNoResults ? (
              error ? (
                <p>{error}</p>
              ) : (
                <NotFound />
              )
            ) : (
              <Card
                displayData={displayData}
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
