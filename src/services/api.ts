import { QueryClient } from "@tanstack/react-query";
import { Octokit } from "octokit";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			retry: 3,
			staleTime: 5 * 60 * 1000,
			gcTime: 1000 * 60 * 60 * 1,
		},
	},
});

// A voir si ça ne vas pas intérferer avec le fait de garder les data / refresh en background
const { VITE_GITHUB_TOKEN } = import.meta.env;
// Temporaire pour tester / Utiliser token utilisateur après !
export const octokit = new Octokit({
	auth: VITE_GITHUB_TOKEN,
});
