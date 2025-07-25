import clsx from "clsx";
import { useState } from "react";
import {
  Navigate,
  Outlet,
  useMatches,
  useNavigate,
  type UIMatch,
} from "react-router";
import { Header } from "../header/Header";
import { NavigationMenu, type MenuItem } from "../menu/NavigationMenu";
import { menuList } from "../../router/const";

export const MainLayout = () => {
  const [co, setCo] = useState(false);

  const nav = useNavigate();
  const match = useMatches() as UIMatch<unknown, { menuKey?: string }>[];
  const { menuKey } = match[match.length - 1].handle;

  const activeKey = menuKey;

  console.log(activeKey);

  const handleCollaps = () => {
    setCo(!co);
  };

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex">
      <div
        className={clsx(
          "relative h-svh shrink-0 bg-red-100",
          !co ? "w-[160px]" : "w-[60px]",
        )}
      >
        <div className="flex flex-col gap-4">
          <NavigationMenu
            list={menuList}
            onClick={(v: MenuItem) => {
              console.log(v);
              if (v.url) {
                nav(v.url);
              }
            }}
            activeKey={activeKey}
          />
        </div>
        <div
          className="absolute top-5 right-0 cursor-pointer"
          onClick={handleCollaps}
        >
          三
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <Header />
        <div className="bg-while flex h-[calc(100svh-(--spacing(16))))] flex-col overflow-y-auto">
          <div className="flex-1 bg-white px-2 py-1">
            <Outlet></Outlet>
          </div>
          <div className="mt-4 shrink-0 bg-white text-center">
            Copyright MIT © {new Date().getFullYear()} Template
          </div>
        </div>
      </div>
    </div>
  );
};
