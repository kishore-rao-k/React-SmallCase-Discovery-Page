import FilterSection from "./FilterSection";

const LaunchDateFilter = ({ showRecentLaunches, setShowRecentLaunches }) => (
  <FilterSection title="Launch Date">
    <label className="flex items-center space-x-2 text-[14px] text-gray-800">
      <input
        type="checkbox"
        checked={showRecentLaunches}
        onChange={() => setShowRecentLaunches(!showRecentLaunches)} />
      <span>Show recent launches</span>
    </label>
  </FilterSection>
);

export default LaunchDateFilter;
