import { useState } from "react";
import { GoSearch } from "react-icons/go";

export default function SearchBar(): React.ReactElement {
  const [search, setSearch] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <form>
      <div className="relative flex items-center gap-2">
        <label
          htmlFor="searchbar"
          aria-label="search"
          className="absolute pl-3 text-lg"
        >
          <GoSearch className="text-gray-400" />
        </label>
        <input
          type="text"
          role="search"
          value={search}
          onChange={handleSearchChange}
          placeholder="Find a repository..."
          className="w-full rounded-md border border-gray-400 px-4 py-2 pl-10 outline-none outline-offset-0 transition-all focus:border-transparent focus:outline-primary-500"
        />
      </div>
    </form>
  );
}
