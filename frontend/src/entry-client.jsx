import "./index.css";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import App, { routes } from "./App";

const router = createBrowserRouter(routes);

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <App router={router} />
  </StrictMode>
);