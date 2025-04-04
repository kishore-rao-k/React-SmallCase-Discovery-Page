import FilterSection from "./FilterSection";

const StrategyFilter = ({
  strategies,
  activeStrategies,
  setActiveStrategies,
}) => {
  const handleChange = (value) => {
    setActiveStrategies((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <FilterSection
      title={
        <span className="font-semibold text-[13px] text-gray-700">
          Investment Strategy
        </span>
      }
    >
      <div className="flex flex-col space-y-3 mt-2">
        {[...strategies].map((strategy) => (
          <label
            key={strategy}
            className="flex items-center space-x-2 text-[14px] text-gray-800"
          >
            <input
              type="checkbox"
              checked={activeStrategies.includes(strategy)}
              onChange={() => handleChange(strategy)}/>
            <span>{strategy}</span>
          </label>
        ))}
      </div>
    </FilterSection>
  );
};

export default StrategyFilter;
