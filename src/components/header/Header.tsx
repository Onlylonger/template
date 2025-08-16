import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useGlobal } from "../main-layout/global-context";
import { useTabs } from "../tabs/store";
import { SidebarTrigger } from "../ui/sidebar";

export const Header = () => {
  const nav = useNavigate();
  const val = useGlobal();

  const handleLogout = () => {
    localStorage.removeItem("token");
    useTabs.getState().reset();
    nav("/login");
  };

  console.log("...>>>");

  return (
    <div className="flex h-12 shrink-0 items-center justify-end bg-gray-100 px-2">
      {val.userName}
      <Button size="sm" onClick={handleLogout}>
        LogOut
      </Button>
      <SidebarTrigger>test</SidebarTrigger>
    </div>
  );
};
