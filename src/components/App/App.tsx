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
  loadSearchTermActionCreator,
  loadSearchedRepositoriesActionCreator,
} from "../../store/repositories/repositoriesSlice";
import { RepositoryStructure } from "../../types";
import Loader from "../Loader/Loader";

export default function App(): React.ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { user, repositories, repositoriesBySearchTerm, searchTerm } =
    useAppSelector((state) => state.repositoriesStore);
  const { getRepositories, getRepositoriesBySearchTerm } = useRepositories();

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
      dispatch(loadSearchTermActionCreator(searchTerm));

      if (searchTerm === "") {
        dispatch(loadSearchedRepositoriesActionCreator([]));
        return;
      }

      if (user) {
        setIsLoading(true);

        const data = await getRepositoriesBySearchTerm(user.login, searchTerm);

        setIsLoading(false);

        data &&
          dispatch(
            loadSearchedRepositoriesActionCreator(
              data as RepositoryStructure[],
            ),
          );
      }
    }, 250);
  }, [dispatch, getRepositoriesBySearchTerm, user]);

  return (
    <div className="custom-container min-h-screen">
      <Toaster richColors />
      <Header />
      <main>
        <section className="flex flex-col md:flex-row">
          <UserDetails user={user} />
          <div className=" flex-1 pt-10 md:pl-20 md:pt-0">
            <SearchBar onSearchChange={onSearchChange} />
            {isLoading && !repositoriesBySearchTerm.length && <Loader />}
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
