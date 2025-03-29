const FilterSection = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

export default FilterSection;
