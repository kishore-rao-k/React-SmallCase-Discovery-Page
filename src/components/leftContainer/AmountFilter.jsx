import FilterSection from "./FilterSection";

const AmountFilter = ({ activeAmount, setActiveAmount }) => {
  const amounts = [
    { label: "Any", value: "all" },
    { label: "Under ₹5,000", value: 5000 },
    { label: "Under ₹25,000", value: 25000 },
    { label: "Under ₹50,000", value: 50000 },
  ];

  return (
    <FilterSection
      title={
        <span className="font-semibold text-[15px] text-gray-700">
          Investment Amount
        </span>
      }
    >
      <div className="flex flex-col space-y-3 mt-2">
        {amounts.map((amount) => (
          <label
            key={amount.value}
            className="flex items-center space-x-2 text-[14px] text-gray-700 cursor-pointer"
          >
            <input
              type="radio"
              name="amount"
              value={amount.value}
              checked={activeAmount === amount.value}
              onChange={() => setActiveAmount(amount.value)}
              className="appearance-none h-4 w-4 border border-gray-400 rounded-full checked:border-4 checked:border-blue-600 transition-colors"
            />
            <span>{amount.label}</span>
          </label>
        ))}
      </div>
    </FilterSection>
  );
};

export default AmountFilter;
