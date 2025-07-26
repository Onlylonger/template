import { useNavigate } from "react-router";
import { Button } from "../button";

export const Header = () => {
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    nav("/login");
  };

  return (
    <div className="flex h-12 shrink-0 items-center justify-end bg-gray-100 px-2">
      <Button onClick={handleLogout}>LogOut</Button>
    </div>
  );
};
