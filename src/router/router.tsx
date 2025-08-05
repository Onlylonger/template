import { createBrowserRouter, Outlet } from "react-router";
import { MainLayout } from "../components/main-layout/MainLayout";
import { Home } from "../components/home/Home";
import { LoginPage } from "../pages/Login";
import { menuKey } from "./const";
import { UserPage } from "../pages/user/User";
import { UserDetailPage } from "../pages/user/UserDetail";

export const router = createBrowserRouter(
  [
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
          element: <LoginPage />,
        },
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              index: true,
              element: <Home />,
              handle: {
                menuKey: menuKey.home,
              },
            },
            {
              path: "user",
              element: <UserPage />,
              handle: {
                menuKey: menuKey.user,
              },
            },
            {
              path: "user/:id",
              element: <UserDetailPage />,
              handle: {
                menuKey: menuKey.user,
              },
            },
            {
              path: "role",
              element: "role",
              handle: {
                menuKey: menuKey.role,
              },
            },
            {
              path: "item1",
              element: "item1",
              handle: {
                menuKey: menuKey.item1,
              },
            },
            {
              path: "item2",
              element: "item2",
              handle: {
                menuKey: menuKey.item2,
              },
            },
          ],
        },
      ],
    },
  ],
  {
    basename: "/template",
  },
);
