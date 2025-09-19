import { Outlet } from "react-router";

export default function Layout() {
  return (
    <main className="h-[300px] max-h-[300px] min-w-2xl max-w-2xl rounded-lg bg-zinc-50 p-4 shadow-md">
      <Outlet />
    </main>
  );
}
