import FilterSection from './FilterSection';

const LaunchDateFilter = ({ showRecentLaunches, setShowRecentLaunches }) => (
  <FilterSection title="Launch Date">
    <label className="flex items-center space-x-2 text-[14px] text-gray-800">
      <input
        type="checkbox"
        checked={showRecentLaunches}
        onChange={() => setShowRecentLaunches(!showRecentLaunches)}
        className="w-4 h-4 appearance-none border border-gray-300 rounded-sm checked:bg-blue-600 checked:border-blue-600 checked:text-white focus:ring-1 focus:ring-blue-500"
      />
      <span>Show recent launches</span>
    </label>
  </FilterSection>
);

export default LaunchDateFilter;
