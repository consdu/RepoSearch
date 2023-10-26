import { repositoriesStoreMock } from "../../mocks/repositoriesStoreMock";
import Header from "../Header/Header";
import RepositoriesList from "../RepositoriesList/RepositoriesList";
import UserDetails from "../UserDetails/UserDetails";

export default function App(): React.ReactElement {
  return (
    <div className="custom-container">
      <Header />
      <main>
        <section className="flex flex-col md:flex-row">
          <UserDetails user={repositoriesStoreMock.user} />
          <div className="flex-1 md:pl-20">
            <RepositoriesList
              repositories={repositoriesStoreMock.repositories}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
