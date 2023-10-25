import { repositoriesStoreMock } from "../../mocks/repositoriesStoreMock";
import Header from "../Header/Header";
import UserDetails from "../UserDetails/UserDetails";

export default function App(): React.ReactElement {
  return (
    <div className="custom-container">
      <Header />
      <UserDetails user={repositoriesStoreMock.user} />
    </div>
  );
}
