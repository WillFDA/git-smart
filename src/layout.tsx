import { Outlet } from "react-router";
import { Header } from "./components/header";

export default function Layout() {
  return (
    <main className="flex h-[432px] max-h-[432px] min-w-[692px] max-w-[692px] flex-col gap-4 rounded-2xl bg-background p-4 shadow-md">
      <Header />
      <Outlet />
    </main>
  );
}
