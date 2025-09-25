import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import Layout from "./layout";
import Access from "./routes/access";
import { Dashboard } from "./routes/dashboard";
import { queryClient } from "./services/api";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Root element not found");
}

createRoot(rootElement).render(
	<StrictMode>
		<HashRouter>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route element={<Layout />} path="/">
						<Route element={<Access />} path="/access" />
						<Route element={<Dashboard />} path="/" />
					</Route>
				</Routes>
			</QueryClientProvider>
		</HashRouter>
	</StrictMode>,
);
