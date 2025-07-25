import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  Navigate,
  Outlet,
  useMatches,
  useNavigate,
  type UIMatch,
} from "react-router";
import { Header } from "../header/Header";
import { NavigationMenu, type MenuItem } from "../menu/NavigationMenu";
import { getMenuItemByKey, menuList } from "../../router/const";
import { Tabs } from "../tabs/Tabs";
import { useTabs } from "../tabs/store";

export const MainLayout = () => {
  const [co, setCo] = useState(false);

  const nav = useNavigate();
  const match = useMatches() as UIMatch<unknown, { menuKey?: string }>[];
  const { menuKey } = match[match.length - 1].handle;

  const activeKey = menuKey;

  const handleCollaps = () => {
    setCo(!co);
  };

  useEffect(() => {
    if (activeKey) {
      const item = getMenuItemByKey(activeKey);
      if (item) {
        useTabs.setState({
          list: [
            {
              label: item.label,
              name: item.key,
            },
          ],
        });
      }
    }

    return () => {
      useTabs.setState({
        list: [],
      });
    };
  }, []);

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
            onClick={async (v: MenuItem) => {
              if (v.newBlank) {
                window.open(v.url);
                return;
              }

              if (v.url) {
                await nav(v.url);
                useTabs.getState().check({
                  name: v.key,
                  label: v.label,
                });
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
        <Tabs
          activeKey={activeKey}
          onClick={(v) => {
            const item = getMenuItemByKey(v.name);
            if (item?.key === activeKey) return;
            if (item?.url) {
              nav(item.url);
            }
          }}
          onClose={(v, nextName) => {
            const item = getMenuItemByKey(v.name);
            if (item?.key) {
              useTabs.getState().remove(item.key);
            }

            // When remove tab is equal to current route
            if (item?.key === activeKey) {
              const nextItem = getMenuItemByKey(nextName);
              if (nextItem?.url) {
                nav(nextItem.url);
              }
            }
          }}
        />
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
