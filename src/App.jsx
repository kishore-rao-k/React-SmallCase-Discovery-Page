import { useState, useEffect } from "react"
function Card({ item }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 p-6 pb-10 rounded-lg shadow-md bg-white">
      <div className="w-16 h-16 flex-shrink-0">
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
          <p className="text-xs text-gray-500">Min. Amount</p>
          <p className="text-md font-semibold text-gray-900">
            ₹{item.stats.minInvestAmount.toLocaleString()}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">{item.stats.ratios.cagrDuration} CAGR</p>
          <p className="text-md font-semibold text-green-600">
            {(item.stats.ratios.cagr * 100).toFixed(2)}%
          </p>
        </div>

        <div className="flex items-center space-x-2">

  <div >Icon</div>
  
  <div className="text-red-600 text-sm  px-3 py-1">{item.stats.ratios.riskLabel}</div>
</div>
      </div>
    </div>
  );
}



function App() {
  const [scData, setSCData] = useState([]);

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
    {
      scData.map((ele)=>{
            return <Card key={ele._id} item={ele}/>
      })
    }
      
    </>
  );
}

export default App;

