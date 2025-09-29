import { useQuery } from "@tanstack/react-query";
import { octokit } from "./api";

export const getUser = async () => {
  const response = await octokit.request("GET /user", {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  return response.data;
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
};

const getUserIssues = async (username: string) => {
  const response = await octokit.request("GET /search/issues", {
    q: `type:pr author:${username} state:open`,
    per_page: 100,
  });
  return response.data;
};

export const getUserPullRequests = async (name: string) => {
  const response = await getUserIssues(name);
  return response;
};

export const useGetUserPullRequests = async () => {
  const { login } = await getUser();
  return useQuery({
    queryKey: ["userPullRequests", login],
    queryFn: () => getUserPullRequests(login),
    enabled: !!login,
  });
};
