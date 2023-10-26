import { useAppSelector } from "../../store";
import Header from "../Header/Header";
import RepositoriesList from "../RepositoriesList/RepositoriesList";
import SearchBar from "../SearchBar/SearchBar";
import UserDetails from "../UserDetails/UserDetails";

export default function App(): React.ReactElement {
  const { user, repositories } = useAppSelector(
    (state) => state.repositoriesStore,
  );

  return (
    <div className="custom-container">
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
