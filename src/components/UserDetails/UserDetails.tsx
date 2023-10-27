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
      <span className="mt-4 block text-2xl font-extrabold">{name}</span>
      <span className="block text-xl text-gray-400">{login}</span>
      {bio && <p className="mt-4 max-w-[296px]">{bio}</p>}
      <div className="mt-2 flex items-center text-sm text-gray-400">
        <GoPeople className="mr-2 inline text-base" />
        <p className="mr-2">
          <span className="mr-1 font-bold text-black">{followers}</span>
          followers
        </p>
        <span className="text-black">•</span>
        <p className="mx-2">
          <span className="mr-1 font-bold text-black">{following}</span>
          following
        </p>
      </div>
      {company && (
        <div className="mt-2 text-sm text-gray-400">
          <GoOrganization className="mr-2 inline text-base" />
          <span className="text-black">{company}</span>
        </div>
      )}
    </article>
  );
}
