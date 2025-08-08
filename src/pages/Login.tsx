import { Button, Input } from "@shilong/react";
import { login } from "@/utils/api";
import { useRequest } from "@/utils/useRequest";
import { useId, useRef } from "react";
import { useNavigate } from "react-router";

export const LoginPage = () => {
  const nav = useNavigate();
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const { run, loading } = useRequest(login, {
    manual: false,
  });

  const handleLogin = async () => {
    const res = await run({
      userName: usernameRef.current?.value ?? "",
      password: passwordRef.current?.value ?? "",
    }).promise;

    localStorage.setItem("token", res?.data.token);
    nav("/");
  };

  const userNameId = useId();
  const passwordId = useId();

  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor={userNameId}>Username: </label>
          <Input type="text" id={userNameId} ref={usernameRef} />
        </div>
        <div>
          <label htmlFor={passwordId}>Password: </label>
          <Input type="password" id={passwordId} ref={passwordRef} />
        </div>

        <Button onClick={handleLogin} disabled={loading}>
          login
        </Button>
      </div>
    </div>
  );
};
