import clsx from "clsx";
import { useState } from "react";
import { Link, Outlet } from "react-router";

export const MainLayout = () => {
  const [co, setCo] = useState(false);
  const handleCollaps = () => {
    setCo(!co);
  };

  return (
    <div className="flex">
      <div
        className={clsx(
          "relative h-svh shrink-0 bg-red-100",
          !co ? "w-[160px]" : "w-[60px]",
        )}
      >
        <div className="flex flex-col gap-4">
          <Link to="/">Home</Link>
          <Link to="/user">User</Link>
          <Link to="/role">Role</Link>
        </div>
        <div
          className="absolute top-5 right-0 cursor-pointer"
          onClick={handleCollaps}
        >
          三
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex h-16 shrink-0 items-center bg-gray-100">
          header
        </div>
        <div className="flex h-[calc(100svh-(--spacing(16))))] flex-col overflow-y-auto bg-gray-200">
          <div className="flex-1">
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
