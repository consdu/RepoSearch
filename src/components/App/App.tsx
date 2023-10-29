import { useEffect, useMemo } from "react";
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
  setTotalPagesActionCreator,
} from "../../store/repositories/repositoriesSlice";
import { RepositoryStructure } from "../../types";
import Loader from "../Loader/Loader";
import NoRepositoriesFound from "../NoRepositoriesFound/NoRepositoriesFound";
import Pagination from "../Pagination/Pagination";
import { setIsRepositoriesLoadingActionCreator } from "../../store/ui/uiSlice";

export default function App(): React.ReactElement {
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
    currentPage,
  } = useAppSelector((state) => state.repositoriesStore);
  const { isRepositoriesLoading } = useAppSelector((state) => state.uiStore);

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
        dispatch(setIsRepositoriesLoadingActionCreator(true));

        const repositories = (await getRepositoriesBySearchTerm(
          user.login,
          searchTerm,
          searchMethod,
        )) as RepositoryStructure[];

        dispatch(setIsRepositoriesLoadingActionCreator(false));

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
        dispatch(setTotalPagesActionCreator(userData.public_repos));
      }
    })();
  }, [dispatch, getUser, initialGithubUsername]);

  useEffect(() => {
    (async () => {
      if (user) {
        dispatch(setIsRepositoriesLoadingActionCreator(true));

        const repositories = (await getRepositories(
          user.login,
          currentPage,
        )) as RepositoryStructure[];

        dispatch(setIsRepositoriesLoadingActionCreator(false));

        dispatch(loadRepositoriesActionCreator(repositories));
      }
    })();
  }, [dispatch, getRepositories, user, currentPage]);

  return (
    <div className="custom-container min-h-screen">
      <Toaster richColors />
      <Header />
      <main>
        <section className="flex flex-col md:flex-row">
          <UserDetails user={user} />
          <div className="flex-1 pb-20 pt-10 md:pl-20 md:pt-0">
            <RepositoriesSearch onSearchChange={onSearchChange} />
            {isRepositoriesLoading && !repositoriesBySearchTerm?.length && (
              <Loader />
            )}
            {hasNoMatchingRepositories && !isRepositoriesLoading && (
              <NoRepositoriesFound />
            )}
            {!isRepositoriesLoading && (
              <RepositoriesList
                repositories={
                  searchTerm && repositoriesBySearchTerm
                    ? repositoriesBySearchTerm
                    : repositories
                }
              />
            )}
            <Pagination isLoading={isRepositoriesLoading} />
          </div>
        </section>
      </main>
    </div>
  );
}
