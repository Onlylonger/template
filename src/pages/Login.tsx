import { useNavigate } from "react-router";

export const LoginPage = () => {
  const nav = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("token", "aaa");
    nav("/");
  };

  return (
    <div className="">
      <button onClick={handleLogin}>login</button>
    </div>
  );
};
