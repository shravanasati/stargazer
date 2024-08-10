import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

//! routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/dashboard",
    element: <h1>hello everynyan hehe</h1>,
  }
]);


//! routes
createRoot(document.getElementById("root")!).render(
  <StrictMode>
        <RouterProvider router={router} />
  </StrictMode>
);
