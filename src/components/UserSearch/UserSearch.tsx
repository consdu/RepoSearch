import { useState } from "react";
import { GoArrowRight, GoSearch, GoHourglass } from "react-icons/go";

interface UserSearchProps {
  onFormSubmit: (username: string) => void;
  isLoading: boolean;
}

export default function UserSearch({
  onFormSubmit,
  isLoading,
}: UserSearchProps): React.ReactElement {
  const [username, setUsername] = useState("");

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username.length > 0) {
      onFormSubmit(username);
    }

    setUsername("");
  };

  return (
    <form className="flex h-fit gap-2" onSubmit={handleFormSubmit}>
      <div className="relative flex items-center bg-white max-md:flex-1">
        <label
          htmlFor="username"
          aria-label="username"
          className="absolute pl-3 text-lg"
        >
          <GoSearch className="text-gray-400" />
        </label>
        <input
          id="username"
          type="text"
          role="search"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="w-full rounded-md border border-gray-400 bg-white px-4 py-2 pl-9 outline-none outline-offset-0 transition-all focus:border-transparent focus:outline-primary-500"
          placeholder="Find a user..."
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        aria-label="search user"
        className="rounded-md border border-gray-400 bg-white px-4 py-2 outline-none outline-offset-0 transition-all hover:border-transparent hover:outline-primary-500 focus:border-transparent focus:outline-primary-500 disabled:cursor-not-allowed disabled:text-gray-400 disabled:outline-none hover:disabled:border-gray-400"
      >
        {isLoading ? <GoHourglass /> : <GoArrowRight />}
      </button>
    </form>
  );
}
