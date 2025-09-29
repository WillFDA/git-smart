import { useGetUser, useGetUserPullRequests } from "../services/github";

export const Dashboard = async () => {
  const { isLoading, data: user } = useGetUser();
  const { data: userPullRequests } = await useGetUserPullRequests();

  return (
    <div>
      <h1>Dashboard</h1>
      {isLoading || !user ? (
        <div>Loading...</div>
      ) : (
        <div className="size-7 overflow-hidden rounded-full">
          <img
            alt={user.name || "Nothing"}
            height="30px"
            src={user.avatar_url}
            width="30px"
          />
        </div>
      )}
      {userPullRequests && <div>Pas d'erreur</div>}
    </div>
  );
};
