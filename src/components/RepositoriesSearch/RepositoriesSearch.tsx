import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { useAppDispatch } from "../../store";
import { setSearchMethodActionCreator } from "../../store/repositories/repositoriesSlice";

interface RepositoriesSearchProps {
  onSearchChange: (searchTerm: string) => void;
}

export default function RepositoriesSearchProps({
  onSearchChange,
}: RepositoriesSearchProps): React.ReactElement {
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchMethodChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(setSearchMethodActionCreator(event.target.value));
  };

  useEffect(() => {
    onSearchChange(search);
  }, [search, onSearchChange]);

  return (
    <form className="flex gap-2 max-sm:flex-col">
      <div className="relative flex flex-1 items-center gap-2">
        <label
          htmlFor="searchbar"
          aria-label="search"
          className="absolute pl-3 text-lg"
        >
          <GoSearch className="text-gray-400" />
        </label>
        <input
          id="searchbar"
          type="text"
          role="search"
          value={search}
          onChange={handleSearchChange}
          placeholder="Find a repository..."
          className="w-full rounded-md border border-gray-400 px-4 py-2 pl-9 outline-none outline-offset-0 transition-all focus:border-transparent focus:outline-primary-500"
        />
      </div>
      <div>
        <label htmlFor="search-method" aria-label="search method"></label>
        <select
          id="search-method"
          name="search-method"
          onChange={handleSearchMethodChange}
          className="h-[42px] rounded-md border border-gray-400 px-4 py-2 text-base text-gray-400 outline-none outline-offset-0 transition-all focus:border-transparent focus:outline-primary-500 max-sm:w-full"
        >
          <option value="name">By name</option>
          <option value="language">By language</option>
        </select>
      </div>
    </form>
  );
}
