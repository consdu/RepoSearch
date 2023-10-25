import { repositoriesStoreMock } from "../../mocks/repositoriesStoreMock";
import Header from "../Header/Header";
import Repository from "../Repository/Repository";
import UserDetails from "../UserDetails/UserDetails";

export default function App(): React.ReactElement {
  return (
    <div className="custom-container">
      <Header />
      <div className="flex">
        <UserDetails user={repositoriesStoreMock.user} />
        <Repository repository={repositoriesStoreMock.repositories[1]} />
      </div>
    </div>
  );
}
