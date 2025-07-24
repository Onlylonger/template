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
          "shrink-0 h-svh bg-red-100 relative",
          !co ? "w-[160px]" : "w-[60px]"
        )}
      >
        <Link to="/">Home</Link>
        <Link to="/user">User</Link>
        <Link to="/role">Role</Link>
        <div
          className="absolute right-0 top-5 cursor-pointer"
          onClick={handleCollaps}
        >
          三
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="h-16 flex items-center bg-gray-100 shrink-0">
          header
        </div>
        <div className="flex flex-col bg-gray-200 overflow-y-auto h-[calc(100svh-(--spacing(16))))]">
          <div className="flex-1">
            <Outlet></Outlet>
          </div>
          <div className="bg-white text-center mt-4 shrink-0 ">
            Copyright MIT © {new Date().getFullYear()} Template
          </div>
        </div>
      </div>
    </div>
  );
};
