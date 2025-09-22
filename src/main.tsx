import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router";
import "./index.css";
import Layout from "./layout";
import Access from "./routes/access";
import { Dashboard } from "./routes/dashboard";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route element={<Access />} path="/access" />
          <Route element={<Dashboard />} path="/" />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);
