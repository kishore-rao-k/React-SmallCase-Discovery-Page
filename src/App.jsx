import { useState, useEffect } from "react"
function Card({ scData }) {
  return (
      <>
      {scData.map((item)=>(
    <div key ={item._id} className="flex items-center justify-between border-b border-gray-300 p-6 pb-5 bg-white">
      <div className="w-16 h-16 ">
        <img
          src={`https://assets.smallcase.com/images/smallcases/160/${item.scid}.png`}
          alt={item.info.name}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex flex-col flex-1 px-4">
        <h2 className="text-lg font-semibold text-gray-900">{item.info.name}</h2>
        <p className="text-sm text-gray-600">{item.info.shortDescription}</p>
        <p className="text-xs text-gray-500">by {item.info.publisherName}</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-center">
          <p className="text-sm text-gray-500">Min. Amount</p>
          <p className="text-md font-semibold text-gray-900">
            ₹{item.stats.minInvestAmount.toLocaleString()}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">{item.stats.ratios.cagrDuration} CAGR</p>
          <p className="text-md font-semibold text-green-600">
            {(item.stats.ratios.cagr * 100).toFixed(2)}%
          </p>
        </div>

        <div className="flex items-center space-x-2">

  <div >Icon</div>
  
  <div className=" text-sm border border-md border-gray-300 px-3 py-1">{item.stats.ratios.riskLabel}</div>  
  </div>
      </div>
    </div>
    
  ))}
   </>
 );
}



function App() {
  const [scData, setSCData] = useState([]);
  const [filteredData, setFilteredData] = useState(scData);
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
    {/* Page content here */}
    <Card scData={filteredData} />
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="menu bg-base-200  min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <div className="flex justify-between items-center border border-gray-300 p-4">
      <button onClick={() => setFilteredData(scData)}>Show all</button> 
      <button onClick={() => setFilteredData(scData.filter(ele => ele && ele.flags.private === false))}>Free access</button> 
      <button onClick={() => setFilteredData(scData.filter(ele => ele && ele.flags.private === true))}>Fee based</button>
      </div>
      <div>
      <div className="space-y-2">
    <div className="form-control">
    <label className="label cursor-pointer">
      <input type="radio" name="amount" onClick={() => setFilteredData(scData)} className="radio checked:bg-blue-500" value="any" />
      <span className="label-text ml-2">Any</span>
    </label>
    </div>
  
   <div className="form-control">
    <label className="label cursor-pointer">
      <input type="radio" name="amount" onClick={() => setFilteredData(scData.filter(ele => ele && ele.stats.minInvestAmount < 5000))} className="radio checked:bg-blue-500" value="5000" />
      <span className="label-text ml-2">Under ₹ 5,000</span>
    </label>
    </div>
  
    <div className="form-control">
    <label className="label cursor-pointer">
      <input type="radio" name="amount" onClick={() => setFilteredData(scData.filter(ele => ele && ele.stats.minInvestAmount < 25000))} className="radio checked:bg-blue-500" value="25000" />
      <span className="label-text ml-2">Under ₹ 25,000</span>
    </label>
    </div>
  
    <div className="form-control">
    <label className="label cursor-pointer">
      <input type="radio" name="amount" onClick={() => setFilteredData(scData.filter(ele => ele && ele.statsminInvestAmount < 50000))} className="radio checked:bg-blue-500" value="50000" />
      <span className="label-text ml-2">Under ₹ 50,000</span>
    </label>
    </div>
    </div>
      </div>
     <button onClick={() => setFilteredData(scData.filter(ele => ele && ele.stats.ratios.riskLabel < 50000))} >low</button>
     <button onClick={() => setFilteredData(scData.filter(ele => ele && ele.stats.ratios.riskLabel < 50000))} >Medium</button>
     <button onClick={() => setFilteredData(scData.filter(ele => ele && ele.stats.ratios.riskLabel < 50000))} >high</button>
     </div>
     </div>
    </div>

      
    </>
  );
}

export default App;

