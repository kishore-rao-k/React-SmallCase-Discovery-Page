import React from 'react'

const Card = ({ scData }) => {
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
          {item.flags.private === false ?  <span className="text-blue-700"> Free access</span> : ''}
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

export default Card
