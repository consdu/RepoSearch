import { GoPeople, GoOrganization } from "react-icons/go";
import { GithubUserStructure } from "../../types";

interface UserDetailsProps {
  user: GithubUserStructure;
}

export default function UserDetails({
  user,
}: UserDetailsProps): React.ReactElement {
  const { avatar_url, name, login, bio, followers, following, company } = user;
  return (
    <article>
      <img
        src={avatar_url}
        alt={`${user.name}'s avatar`}
        width={296}
        height={296}
        className="rounded-full"
      />
      <span className="block text-2xl font-extrabold">{name}</span>
      <span className="block text-xl text-gray-400">{login}</span>
      {bio && <p className="mt-4">{bio}</p>}
      <div className="text-sm text-gray-400 flex items-center mt-2">
        <GoPeople className="inline text-base mr-2" />
        <p className="mr-2">
          <span className="font-bold text-black mr-1">{followers}</span>
          followers
        </p>
        <span className="text-black">•</span>
        <p className="mx-2">
          <span className="font-bold text-black mr-1">{following}</span>
          following
        </p>
      </div>
      {company && (
        <div className="text-gray-400 text-sm mt-2">
          <GoOrganization className="inline mr-2 text-base" />
          <span className="text-black">{company}</span>
        </div>
      )}
    </article>
  );
}
