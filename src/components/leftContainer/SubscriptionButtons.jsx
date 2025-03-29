import FilterSection from "./FilterSection";

const SubscriptionButtons = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { label: "Show all", value: "all" },
    { label: "Free access", value: "free" },
    { label: "Fee based", value: "fee" },
  ];

  return (
    <FilterSection title="Subscription Type">
      <div className="flex rounded-md border-1 border-gray-300">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`flex-1 px-6 py-2  text-sm font-medium ${
              activeFilter === filter.value
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </FilterSection>
  );
};

export default SubscriptionButtons;
