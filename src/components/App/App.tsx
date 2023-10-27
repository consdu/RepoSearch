import { useEffect, useMemo, useState } from "react";
import { Toaster } from "sonner";
import _debounce from "debounce";
import { useAppDispatch, useAppSelector } from "../../store";
import Header from "../Header/Header";
import RepositoriesList from "../RepositoriesList/RepositoriesList";
import RepositoriesSearch from "../RepositoriesSearch/RepositoriesSearch";
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
import NoRepositoriesFound from "../NoRepositoriesFound/NoRepositoriesFound";

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

  const hasNoMatchingRepositories = useMemo(
    () => searchTerm?.length > 0 && repositoriesBySearchTerm?.length === 0,
    [repositoriesBySearchTerm, searchTerm],
  );

  const onSearchChange = useMemo(() => {
    return _debounce(async (searchTerm: string) => {
      dispatch(setSearchTermActionCreator(searchTerm));

      if (searchTerm === "") {
        dispatch(loadSearchedRepositoriesActionCreator([]));
        return;
      }

      if (user) {
        setIsLoading(true);

        const repositories = (await getRepositoriesBySearchTerm(
          user.login,
          searchTerm,
          searchMethod,
        )) as RepositoryStructure[];

        setIsLoading(false);

        if (repositories) {
          dispatch(loadSearchedRepositoriesActionCreator(repositories));
        }
      }
    }, 350);
  }, [dispatch, getRepositoriesBySearchTerm, user, searchMethod]);

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

        const repositories = (await getRepositories(
          user.login,
        )) as RepositoryStructure[];

        setIsLoading(false);

        dispatch(loadRepositoriesActionCreator(repositories));
      }
    })();
  }, [dispatch, getRepositories, user]);

  return (
    <div className="custom-container min-h-screen">
      <Toaster richColors />
      <Header />
      <main>
        <section className="flex flex-col md:flex-row">
          <UserDetails user={user} />
          <div className=" flex-1 pt-10 md:pl-20 md:pt-0">
            <RepositoriesSearch onSearchChange={onSearchChange} />
            {isLoading && !repositoriesBySearchTerm?.length && <Loader />}
            {hasNoMatchingRepositories && !isLoading && <NoRepositoriesFound />}
            {!isLoading && (
              <RepositoriesList
                repositories={
                  searchTerm && repositoriesBySearchTerm
                    ? repositoriesBySearchTerm
                    : repositories
                }
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
