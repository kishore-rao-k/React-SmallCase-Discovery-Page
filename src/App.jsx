import { useState, useEffect } from "react";
import Card from "./components/Card";

const FilterSection = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

const SubscriptionButtons = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { label: "Show all", value: "all" },
    { label: "Free access", value: "free" },
    { label: "Fee based", value: "fee" },
  ];

  return (
    <FilterSection title="Subscription Type">
      <div className="flex space-x-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`btn btn-sm ${activeFilter === filter.value ? 'btn-primary' : 'btn-outline'}`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </FilterSection>
  );
};

const AmountFilter = ({ activeAmount, setActiveAmount }) => {
  const amounts = [
    { label: "All amounts", value: "all" },
    { label: "Under ₹5,000", value: 5000 },
    { label: "Under ₹25,000", value: 25000 },
    { label: "Under ₹50,000", value: 50000 },
  ];

  return (
    <FilterSection title="Investment Amount">
      <div className="flex flex-col space-y-2">
        {amounts.map((amount) => (
          <label key={amount.value} className="flex items-center">
            <input
              type="radio"
              name="amount"
              checked={activeAmount === amount.value}
              onChange={() => setActiveAmount(amount.value)}
              className="radio radio-sm checked:bg-blue-500 mr-2"
            />
            <span>{amount.label}</span>
          </label>
        ))}
      </div>
    </FilterSection>
  );
};

const VolatilityButtons = ({ activeVolatilities, setActiveVolatilities }) => {
  const volatilities = [
    { label: "Low", value: "Low Volatility" },
    { label: "Medium", value: "Medium Volatility" },
    { label: "High", value: "High Volatility" },
  ];

  const toggleVolatility = (value) => {
    setActiveVolatilities((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  return (
    <FilterSection title="Volatility">
      <div className="flex space-x-2">
        {volatilities.map((volatility) => (
          <button
            key={volatility.value}
            onClick={() => toggleVolatility(volatility.value)}
            className={`btn btn-sm ${
              activeVolatilities.includes(volatility.value)
                ? 'btn-primary'
                : 'btn-outline'
            }`}
          >
            {volatility.label}
          </button>
        ))}
      </div>
    </FilterSection>
  );
};

const StrategyFilter = ({ strategies, activeStrategies, setActiveStrategies }) => {
  const handleChange = (value) => {
    setActiveStrategies((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  return (
    <FilterSection title="Investment Strategy">
      <div className="flex flex-col space-y-2">
        {strategies.map((strategy) => (
          <label key={strategy} className="flex items-center">
            <input
              type="checkbox"
              checked={activeStrategies.includes(strategy)}
              onChange={() => handleChange(strategy)}
              className="checkbox checkbox-sm checked:bg-blue-500 mr-2"
            />
            <span>{strategy}</span>
          </label>
        ))}
      </div>
    </FilterSection>
  );
};

function App() {
  const [scData, setSCData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [subscriptionFilter, setSubscriptionFilter] = useState("all");
  const [amountFilter, setAmountFilter] = useState("all");
  const [volatilityFilters, setVolatilityFilters] = useState([]);
  const [strategyFilters, setStrategyFilters] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const [showRecentLaunches, setShowRecentLaunches] = useState(false);
  const strategies = [
    "Asset Allocation", "Corporate Governance", "Dividend", "ESG", "Factor Investing",
    "Fundamental", "Goal Based", "Growth", "Momentum", "Quality", "Quantamental",
    "Quantitative", "Sector Tracker", "Technical", "Thematic", "Value"
  ];

  useEffect(() => {
    if (scData.length === 0) return;

    const result = scData.filter((ele) => {
  
      if (subscriptionFilter === 'free' && ele?.flags?.private !== false) return false;
      if (subscriptionFilter === 'fee' && ele?.flags?.private !== true) return false;


      if (amountFilter !== 'all' && (!ele?.stats?.minInvestAmount || ele.stats.minInvestAmount > amountFilter)) {
        return false;
      }


      if (strategyFilters.length > 0) {
        const hasStrategy = ele?.info?.investmentStrategy?.some(
          strategy => strategyFilters.includes(strategy.displayName)
        );
        if (!hasStrategy) return false;
      }

      if (volatilityFilters.length > 0 && 
          !volatilityFilters.includes(ele?.stats?.ratios?.riskLabel)) {
        return false;
      }

      if (showRecentLaunches) {
        
        const createdDate = new Date(ele?.info?.created);
        if (!ele?.info?.created || isNaN(createdDate.getTime())) {
          return false; 
        }
        
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        
        if (createdDate < oneYearAgo) {
          return false;
        }
      }

      return true;
    });

    setFilteredData(result);
    setShowNoResults(result.length === 0); 

  }, [scData, amountFilter, strategyFilters, subscriptionFilter, volatilityFilters, showRecentLaunches]);
  

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('/smallcases.json');
        const datas = await response.json();
        setSCData(datas.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    getData();
  }, []);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {showNoResults ? (
          <div className="flex flex-col items-center justify-center h-64">
            <h3 className="text-xl font-semibold mb-2">No smallcases found</h3>
            <p className="text-gray-500">
              Try refining your search results or removing some filters
            </p>
          </div>
        ) : (
          <Card scData={filteredData.length > 0 ? filteredData : scData} />
        )}
      </div>
      
     
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <div className="menu bg-base-200 min-h-full w-80 p-4">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          
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
          <FilterSection title="Launch Date">
  <label className="flex items-center">
    <input
      type="checkbox"
      checked={showRecentLaunches}
      onChange={() => setShowRecentLaunches(!showRecentLaunches)}
      className="checkbox checkbox-sm checked:bg-blue-500 mr-2"
    />
    <span>Show recent launches (last 12 months)</span>
  </label>
</FilterSection>
          <StrategyFilter 
            strategies={strategies} 
            activeStrategies={strategyFilters} 
            setActiveStrategies={setStrategyFilters} 
          />
        </div>
      </div>
    </div>
  );

}

export default App;