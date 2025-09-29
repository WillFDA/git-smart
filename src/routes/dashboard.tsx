import { Skeleton } from "@heroui/react";
import { IconGitBranch } from "@tabler/icons-react";
import { useGetUserIssues } from "../services/github";
import { formatDate } from "../services/utils";

export const Dashboard = () => {
  const { data, isLoading } = useGetUserIssues();

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <>
          <Skeleton className="h-20 w-full animate-pulse rounded-lg bg-blank p-8" />
          <Skeleton className="h-20 w-full animate-pulse rounded-lg bg-blank p-8" />
          <Skeleton className="h-20 w-full animate-pulse rounded-lg bg-blank p-8" />
        </>
      ) : (
        data?.items?.map((issue) => (
          <a
            className="flex h-20 items-center justify-between rounded-lg bg-white p-3"
            href={issue.html_url}
            key={issue.id}
            target="_blank"
          >
            <div className="flex items-center gap-4">
              <IconGitBranch className="size-8" />
              <span className="font-medium text-xs">{issue.title}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-light text-gray-500 text-xs">
                {formatDate(issue.created_at)}
              </span>
              <div className="size-8 overflow-hidden rounded-full">
                <img
                  alt="User issue avatar"
                  height="32px"
                  src={issue?.user?.avatar_url}
                  width="32px"
                />
              </div>
            </div>
          </a>
        ))
      )}
    </div>
  );
};
