import { useState, useEffect } from "react"
import Card from "./components/Card"

const AmountFilter = ({ label, maxAmount, scData, setFilteredData }) => {
  const handleFilter = () => {
    if (label === "All") {
  
      setFilteredData(scData);
    } else {
      setFilteredData(scData.filter(ele => ele && ele.stats.minInvestAmount <= maxAmount));
    }
  };
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <input
          type="radio"
          name="amount"
          onClick={handleFilter}
          className="radio checked:bg-blue-500"
          value={maxAmount}
        />
        <span className="label-text ml-2">{label}</span>
      </label>
    </div>
  );
};

const FilterButtons = ({ showAll, freeAccess, feeBased }) => {
  return (
    <div className="flex justify-between items-center border border-gray-300">
      <button  onClick={showAll}>Show all</button>
      <button onClick={freeAccess}>Free access</button>
      <button onClick={feeBased}>Fee based</button>
    </div>
  );
};

function App() {
  const [scData, setSCData] = useState([]);
  const[filterCount, setFilterCount] = useState(0);
  const [filteredData, setFilteredData] = useState(null);
  
  const showAll = () => {
    setFilterCount(prevCount => prevCount + 1);
    setFilteredData(scData);
  };

  const freeAccess = () => {
    setFilteredData(scData.filter(ele => ele && ele.flags.private === false));
  };

  const feeBased = () => {
    setFilteredData(scData.filter(ele => ele && ele.flags.private === true));
  };

  const RiskFilterButtons = ({ scData, setFilteredData }) => {
    const handleFilter = (riskLabel) => {
      setFilteredData(
        scData.filter(
          (ele) => ele && ele.stats.ratios.riskLabel === riskLabel
        )
      );
    };
  
    return (
      <div>
        <button onClick={() => handleFilter("Low Volatility")}>Low</button>
        <button onClick={() => handleFilter("Medium Volatility")}>Medium</button>
        <button onClick={() => handleFilter("High Volatility")}>High</button>
      </div>
    );
  };

 
  const handleNewSmallCaseClick = () => {
    setFilteredData(
      scData.filter(
        (ele) =>
          ele && ele.info && ele.info.created &&
          new Date(ele.info.created).getFullYear() > 2024
      )
    );
  };

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
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col ">
    
          {filteredData === null ? (
            <Card scData={scData} />
          ) : (
            <Card scData={filteredData} />
          )}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu bg-base-200  min-h-full w-80 p-4">
          
            <p>filter {filterCount}</p>
            <div>
              <FilterButtons showAll={showAll}  freeAccess={freeAccess}  feeBased={feeBased} />
             
              <div>
                {filteredData &&
                  filteredData.map((data, index) => (
                    <div key={index}>{data.name}</div> 
                  ))}
                <div></div>
              </div>
            </div>
            <div>
              <div className="space-y-2">
                <div className="form-control">
                  <RiskFilterButtons scData={scData} setFilteredData={setFilteredData} />
                </div>

                <div>
                  <AmountFilter label="All" maxAmount={1000} scData={scData} setFilteredData={setFilteredData}/>
                  <AmountFilter label="Under ₹ 5,000" maxAmount={5000} scData={scData} setFilteredData={setFilteredData}/>
                  <AmountFilter label="Under ₹ 25,000"maxAmount={25000} scData={scData} setFilteredData={setFilteredData} />
                  <AmountFilter label="Under ₹ 50,000" maxAmount={50000} scData={scData} setFilteredData={setFilteredData} />
                </div>
              </div>
              <input type="checkbox" onChange={handleNewSmallCaseClick} />
              <label htmlFor="smallCaseCheckbox">Include new small cases</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

