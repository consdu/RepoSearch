import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import Loader from "../Loader/Loader";
import NoRepositoriesFound from "../NoRepositoriesFound/NoRepositoriesFound";
import Pagination from "../Pagination/Pagination";
import RepositoriesList from "../RepositoriesList/RepositoriesList";
import RepositoriesSearch from "../RepositoriesSearch/RepositoriesSearch";
import useRepositories from "../../hooks/useRepositories/useRepositories";
import _debounce from "debounce";
import {
  loadSearchedRepositoriesActionCreator,
  setSearchTermActionCreator,
} from "../../store/repositories/repositoriesSlice";
import { setIsRepositoriesLoadingActionCreator } from "../../store/ui/uiSlice";
import { RepositoryStructure } from "../../types";

export default function RepositoriesSection() {
  const { isRepositoriesLoading } = useAppSelector((state) => state.uiStore);
  const dispatch = useAppDispatch();
  const {
    user,
    repositories,
    repositoriesBySearchTerm,
    searchTerm,
    searchMethod,
  } = useAppSelector((state) => state.repositoriesStore);
  const { getRepositoriesBySearchTerm } = useRepositories();

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

  return (
    <div className="flex-1 pb-20 pt-10 md:pl-20 md:pt-0">
      <RepositoriesSearch onSearchChange={onSearchChange} />
      {isRepositoriesLoading && !repositoriesBySearchTerm?.length && <Loader />}
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
  );
}
