import FilterSection from './FilterSection';

const VolatilityButtons = ({ activeVolatilities, setActiveVolatilities }) => {
  const volatilities = [
    { label: "Low", value: "Low Volatility", img: "/1.png" },
    { label: "Medium", value: "Medium Volatility", img: "/2.png" },
    { label: "High", value: "High Volatility", img: "/3.png" },
  ];

  const toggleVolatility = (value) => {
    setActiveVolatilities((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  return (
    <FilterSection title={<span className="font-semibold text-[15px] text-gray-700">Volatility</span>}>
      <div className="flex space-x-3 mt-2">
        {volatilities.map((volatility) => {
          const isActive = activeVolatilities.includes(volatility.value);
          return (
            <button
              key={volatility.value}
              onClick={() => toggleVolatility(volatility.value)}
              className={`flex flex-col items-center w-[72px]  rounded border text-xs font-medium 
                ${isActive ? 'border-blue-500' : 'border-gray-300'} 
                ${isActive ? 'text-black' : 'text-gray-600'} 
                hover:border-blue-300 transition`}
            >
              <img
                src={volatility.img}
                alt={volatility.label}
                className="w-9 h-9 object-contain"
              />
              <span className="mt-1">{volatility.label}</span>
            </button>
          );
        })}
      </div>
    </FilterSection>
  );
};

export default VolatilityButtons;
