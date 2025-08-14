import { useNavigate } from "react-router";
import { Button } from "@/ui";
import { useGlobal } from "../main-layout/global-context";
import { useTabs } from "../tabs/store";

export const Header = () => {
  const nav = useNavigate();
  const val = useGlobal();

  const handleLogout = () => {
    localStorage.removeItem("token");
    useTabs.getState().reset();
    nav("/login");
  };

  return (
    <div className="flex h-12 shrink-0 items-center justify-end bg-gray-100 px-2">
      {val.userName}
      <Button size="sm" onClick={handleLogout}>
        LogOut
      </Button>
    </div>
  );
};
