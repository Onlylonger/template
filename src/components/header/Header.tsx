import { useNavigate } from "react-router";

export const Header = () => {
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    nav("/login");
  };

  return (
    <div className="flex h-16 shrink-0 items-center bg-gray-100">
      <button onClick={handleLogout}>LogOut</button>
    </div>
  );
};
