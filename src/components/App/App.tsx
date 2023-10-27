import { useEffect, useMemo, useState } from "react";
import { Toaster } from "sonner";
import _debounce from "debounce";
import { useAppDispatch, useAppSelector } from "../../store";
import Header from "../Header/Header";
import RepositoriesList from "../RepositoriesList/RepositoriesList";
import SearchBar from "../SearchBar/SearchBar";
import UserDetails from "../UserDetails/UserDetails";
import useRepositories from "../../hooks/useRepositories/useRepositories";
import {
  loadRepositoriesActionCreator,
  setSearchTermActionCreator,
  loadSearchedRepositoriesActionCreator,
  loadUserActionCreator,
} from "../../store/repositories/repositoriesSlice";
import { RepositoryStructure } from "../../types";
import Loader from "../Loader/Loader";

export default function App(): React.ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const { getRepositories, getRepositoriesBySearchTerm, getUser } =
    useRepositories();
  const dispatch = useAppDispatch();
  const {
    user,
    repositories,
    repositoriesBySearchTerm,
    searchTerm,
    searchMethod,
    initialGithubUsername,
  } = useAppSelector((state) => state.repositoriesStore);

  useEffect(() => {
    (async () => {
      const userData = await getUser(initialGithubUsername);
      if (userData) {
        dispatch(loadUserActionCreator(userData));
      }
    })();
  }, [dispatch, getUser, initialGithubUsername]);

  useEffect(() => {
    (async () => {
      if (user) {
        setIsLoading(true);

        const data = await getRepositories(user.login);

        setIsLoading(false);

        data &&
          dispatch(
            loadRepositoriesActionCreator(data as RepositoryStructure[]),
          );
      }
    })();
  }, [dispatch, getRepositories, user]);

  const onSearchChange = useMemo(() => {
    return _debounce(async (searchTerm: string) => {
      dispatch(setSearchTermActionCreator(searchTerm));

      if (searchTerm === "") {
        dispatch(loadSearchedRepositoriesActionCreator([]));
        return;
      }

      if (user) {
        setIsLoading(true);

        const data = await getRepositoriesBySearchTerm(
          user.login,
          searchTerm,
          searchMethod,
        );

        setIsLoading(false);

        data &&
          dispatch(
            loadSearchedRepositoriesActionCreator(
              data as RepositoryStructure[],
            ),
          );
      }
    }, 350);
  }, [dispatch, getRepositoriesBySearchTerm, user, searchMethod]);

  return (
    <div className="custom-container min-h-screen">
      <Toaster richColors />
      <Header />
      <main>
        <section className="flex flex-col md:flex-row">
          <UserDetails user={user} />
          <div className=" flex-1 pt-10 md:pl-20 md:pt-0">
            <SearchBar onSearchChange={onSearchChange} />
            {isLoading && !repositoriesBySearchTerm?.length && <Loader />}
            <RepositoriesList
              repositories={
                searchTerm && repositoriesBySearchTerm
                  ? repositoriesBySearchTerm
                  : repositories
              }
            />
          </div>
        </section>
      </main>
    </div>
  );
}
