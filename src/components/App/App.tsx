import { useEffect } from "react";
import { Toaster } from "sonner";
import { useAppDispatch, useAppSelector } from "../../store";
import Header from "../Header/Header";
import UserDetails from "../UserDetails/UserDetails";
import useRepositories from "../../hooks/useRepositories/useRepositories";
import {
  loadRepositoriesActionCreator,
  loadUserActionCreator,
  setTotalPagesActionCreator,
} from "../../store/repositories/repositoriesSlice";
import { RepositoryStructure } from "../../types";
import { setIsRepositoriesLoadingActionCreator } from "../../store/ui/uiSlice";
import RepositoriesSection from "../RepositoriesSection/RepositoriesSection";

export default function App(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { user, initialGithubUsername, currentPage } = useAppSelector(
    (state) => state.repositoriesStore,
  );
  const { getRepositories, getUser } = useRepositories();

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
          <RepositoriesSection />
        </section>
      </main>
    </div>
  );
}
