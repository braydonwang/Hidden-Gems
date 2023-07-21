import { Autocomplete } from "@react-google-maps/api";

export default function Searchbar({
  onLoad,
  onPlaceChanged,
  handleSearch,
  shouldShowButton,
}) {
  return (
    <div className="relative w-full">
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg rounded-l-lg border-gray-300 focus:ring-yellow-300 focus:border-yellow-300 transition-all rounded-sm"
            placeholder="Search a location..."
          />
          {shouldShowButton && (
            <button
              onClick={handleSearch}
              className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-yellow-300 rounded-r-lg border border-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-400 transition-all"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                stroke="black"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          )}
        </div>
      </Autocomplete>
    </div>
  );
}
