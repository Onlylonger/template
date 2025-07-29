import { Button } from "@/components/button";
import { login } from "@/utils/api";
import { useRequest } from "@/utils/useRequest";
import { useId } from "react";
import { useNavigate } from "react-router";

export const LoginPage = () => {
  const nav = useNavigate();
  const { run, loading, error } = useRequest(login, {
    manual: false,
  });

  const handleLogin = async () => {
    // run({})
    const res = await run({
      username: "123",
      password: "123",
    });
    console.log(res);
    // localStorage.setItem("token", "aaa");
    // nav("/");
  };

  console.log(error);
  const userNameId = useId();
  const passwordId = useId();

  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor={userNameId}>Username: </label>
          <input type="text" id={userNameId} />
        </div>
        <div>
          <label htmlFor={passwordId}>Password: </label>
          <input type="password" id={passwordId} />
        </div>

        {/* <div className={clsx("invisible", !!error && "visible")}>
          Error: {error}
        </div> */}
        <Button onClick={handleLogin} disabled={loading}>
          login
        </Button>
      </div>
    </div>
  );
};
