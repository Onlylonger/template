import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useGlobal } from "../main-layout/global-context";
import { useTabs } from "../tabs/store";
import { SidebarTrigger } from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const Header = () => {
  const nav = useNavigate();
  const val = useGlobal();

  const handleLogout = () => {
    localStorage.removeItem("token");
    useTabs.getState().reset();
    nav("/login");
  };

  return (
    <div className="bg-background flex h-12 shrink-0 items-center justify-between px-2">
      <SidebarTrigger className="cursor-pointer" />
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-muted h-10 w-10 cursor-pointer overflow-hidden rounded-full font-medium">
            {val?.userName?.slice(0, 2)}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem className="w-full" onClick={handleLogout}>
                LogOut
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
