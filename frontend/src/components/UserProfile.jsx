import { useUser } from "../context/UserContext";

const UserProfile = () => {
  const { userEmail } = useUser();

  return userEmail ? (
    <div className="fixed text-sm bottom-0 left-0 rounded-tr-md p-4 px-4 border-2 bg-zinc-50 border-zinc-500">
      Logged in as: <span className="font-semibold">{userEmail}</span>
    </div>
  ) : null;
};

export default UserProfile;
