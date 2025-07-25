import { Link, useNavigate } from "react-router";

export const UserDetailPage = () => {
  const nav = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("token", "aaa");
    nav("/");
  };

  return <div className="">detail</div>;
};
