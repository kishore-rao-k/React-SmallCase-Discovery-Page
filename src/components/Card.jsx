import React from 'react';

const Card = ({ scData, activeReturnPeriod }) => {
   
    const riskIcons = {
        'Low Volatility': '/1.png',
        'Medium Volatility': '/2.png',
        'High Volatility': '/3.png',
        'Low': '/1.png',  
        'Medium': '/2.png',
        'High': '/3.png'
    };

    const getReturnColor = (value) => {
        return value < 0 ? 'text-red-600' : 'text-green-600';
    };

    const getRiskIcon = (riskLabel) => {
        return riskIcons[riskLabel] || '/2.png'; 
    };

    return (
        <>
            {scData.map((item) => {
                const currentReturnValue = activeReturnPeriod 
                    ? item.stats.returns?.[activeReturnPeriod.key]
                    : item.stats.ratios?.cagr;
                
                const returnColor = getReturnColor(currentReturnValue);
                const riskLabel = item.stats.ratios?.riskLabel || 'Medium Volatility';
                const riskIcon = getRiskIcon(riskLabel);

                return (
                    <div key={item._id} className="flex items-center justify-between border-b border-gray-300 p-6 pb-5 bg-white">
                        <div className="w-16 h-16">
                            <img
                                src={`https://assets.smallcase.com/images/smallcases/160/${item.scid}.png`}
                                alt={item.info.name}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="flex flex-col flex-1 px-4">
                            <h2 className="text-lg font-semibold text-gray-900">{item.info.name}</h2>
                            {item.flags.private === false && <span className="text-blue-700">Free access</span>}
                            <p className="text-sm text-gray-600">{item.info.shortDescription}</p>
                            <p className="text-xs text-gray-500">by {item.info.publisherName}</p>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="text-center">
                                <p className="text-sm text-gray-500">Min. Amount</p>
                                <p className="text-md font-semibold text-gray-900">
                                    ₹{item.stats.minInvestAmount?.toLocaleString() || 'N/A'}
                                </p>
                            </div>

                            <div className="text-center min-w-[120px]">
                                {activeReturnPeriod ? (
                                    <>
                                        <p className="text-sm text-gray-500">{activeReturnPeriod.label}</p>
                                        <p className={`text-md font-semibold ${returnColor}`}>
                                            {(currentReturnValue * 100)?.toFixed(2) || '0.00'}%
                                        </p>
                                    </>
                                ) : (
                                    item.stats.ratios?.cagr && (
                                        <>
                                            <p className="text-sm text-gray-500">{item.stats.ratios.cagrDuration || 'Overall'} CAGR</p>
                                            <p className={`text-md font-semibold ${returnColor}`}>
                                                {(currentReturnValue * 100)?.toFixed(2) || '0.00'}%
                                            </p>
                                        </>
                                    )
                                )}
                            </div>

                           
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10">
                                    <img 
                                        src={riskIcon} 
                                        alt={riskLabel}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="text-sm border border-gray-300 px-3 py-1 rounded">
                                    {riskLabel}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default Card;