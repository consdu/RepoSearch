import { useEffect } from "react";
import { Toaster } from "sonner";
import { useAppDispatch, useAppSelector } from "../../store";
import Header from "../Header/Header";
import RepositoriesList from "../RepositoriesList/RepositoriesList";
import SearchBar from "../SearchBar/SearchBar";
import UserDetails from "../UserDetails/UserDetails";
import useRepositories from "../../hooks/useRepositories/useRepositories";
import { loadRepositoriesActionCreator } from "../../store/repositories/repositoriesSlice";
import { RepositoryStructure } from "../../types";

export default function App(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { user, repositories } = useAppSelector(
    (state) => state.repositoriesStore,
  );
  const { getRepositories } = useRepositories();

  useEffect(() => {
    (async () => {
      if (user) {
        const data = await getRepositories(user.login);

        data &&
          dispatch(
            loadRepositoriesActionCreator(data as RepositoryStructure[]),
          );
      }
    })();
  }, [dispatch, getRepositories, user]);

  return (
    <div className="custom-container">
      <Toaster richColors />
      <Header />
      <main>
        <section className="flex flex-col md:flex-row">
          <UserDetails user={user} />
          <div className="flex-1 pt-10 md:pl-20 md:pt-0">
            <SearchBar />
            <RepositoriesList repositories={repositories} />
          </div>
        </section>
      </main>
    </div>
  );
}
