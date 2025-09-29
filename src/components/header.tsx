import { useGetUser, useGetUserIssues } from "../services/github";

export const Header = () => {
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const { data: issues, isLoading: isPullRequestLoading } = useGetUserIssues();
  const connected = !!issues;
  if (connected) {
    return (
      <header className="flex items-center gap-3">
        <nav className="flex w-full rounded-lg border border-border bg-white p-3">
          {isPullRequestLoading ? (
            <div className="h-4 w-14 animate-pulse rounded-sm bg-blank" />
          ) : (
            <span className="font-medium text-xs">
              {issues?.total_count} issues
            </span>
          )}
        </nav>
        {isUserLoading ? (
          <div className="size-10 shrink-0 animate-pulse rounded-full bg-blank" />
        ) : (
          <a
            className="ml-auto aspect-square size-10 shrink-0 overflow-hidden rounded-full"
            href={user?.html_url}
            target="_blank"
          >
            <img
              alt="Avatar"
              height="40px"
              src={user?.avatar_url}
              width="40px"
            />
          </a>
        )}
      </header>
    );
  }
  return (
    <header className="flex items-center gap-3">
      <nav className="flex w-full justify-between rounded-lg border border-border bg-white p-3">
        <span>Not connected</span>
        <button
          className="w-fit rounded-sm bg-gray-100 px-6 py-2"
          type="button"
        >
          login
        </button>
      </nav>
    </header>
  );
};
