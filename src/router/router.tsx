import { createBrowserRouter, Outlet } from "react-router";
import { MainLayout } from "../components/main-layout/MainLayout";
import { Home } from "../components/home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="min-h-svh">
        <Outlet />
      </div>
    ),
    children: [
      {
        path: "login",
        element: "login",
      },
      {
        path: "",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "user",
            element: "user",
          },
          {
            path: "role",
            element: "role",
          },
        ],
      },
    ],
  },
]);
