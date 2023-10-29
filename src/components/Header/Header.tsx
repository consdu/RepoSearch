import { useState } from "react";
import useRepositories from "../../hooks/useRepositories/useRepositories";
import { useAppDispatch } from "../../store";
import {
  loadUserActionCreator,
  resetCurrentPageActionCreator,
  setTotalPagesActionCreator,
} from "../../store/repositories/repositoriesSlice";
import { GithubUserStructure } from "../../types";
import BrandLogo from "../BrandLogo/BrandLogo";
import UserSearch from "../UserSearch/UserSearch";

export default function Header(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { getUser } = useRepositories();
  const [isLoading, setIsLoading] = useState(false);

  const onUsernameFormSubmit = async (username: string) => {
    setIsLoading(true);

    const user = (await getUser(username)) as GithubUserStructure;

    setIsLoading(false);
    if (user) {
      dispatch(loadUserActionCreator(user));
      dispatch(setTotalPagesActionCreator(user.public_repos));
      dispatch(resetCurrentPageActionCreator());
    }
  };

  return (
    <header className="flex flex-col justify-between gap-4 py-10 md:flex-row">
      <BrandLogo />
      <UserSearch onFormSubmit={onUsernameFormSubmit} isLoading={isLoading} />
    </header>
  );
}
