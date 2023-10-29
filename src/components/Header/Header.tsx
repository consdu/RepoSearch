import useRepositories from "../../hooks/useRepositories/useRepositories";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  loadUserActionCreator,
  resetCurrentPageActionCreator,
  setTotalPagesActionCreator,
} from "../../store/repositories/repositoriesSlice";
import { setIsUserLoadingActionCreator } from "../../store/ui/uiSlice";
import { GithubUserStructure } from "../../types";
import BrandLogo from "../BrandLogo/BrandLogo";
import UserSearch from "../UserSearch/UserSearch";

export default function Header(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { isUserLoading } = useAppSelector((state) => state.uiStore);
  const { getUser } = useRepositories();

  const onUsernameFormSubmit = async (username: string) => {
    dispatch(setIsUserLoadingActionCreator(true));

    const user = (await getUser(username)) as GithubUserStructure;

    dispatch(setIsUserLoadingActionCreator(false));
    if (user) {
      dispatch(loadUserActionCreator(user));
      dispatch(setTotalPagesActionCreator(user.public_repos));
      dispatch(resetCurrentPageActionCreator());
    }
  };

  return (
    <header className="flex flex-col justify-between gap-4 py-10 md:flex-row">
      <BrandLogo />
      <UserSearch
        onFormSubmit={onUsernameFormSubmit}
        isLoading={isUserLoading}
      />
    </header>
  );
}
