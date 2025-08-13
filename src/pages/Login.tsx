import { Button, Input, Form, FormItem } from "@shilong/react";
import { login } from "@/utils/api";
import { useRequest } from "@/utils/useRequest";
import { useNavigate } from "react-router";

export const LoginPage = () => {
  const nav = useNavigate();

  const { run, loading } = useRequest(login, {
    manual: false,
  });

  const handleLogin = async (value: { username: string; password: string }) => {
    const res = await run({
      userName: value.username,
      password: value.password,
    }).promise;

    localStorage.setItem("token", res?.data.token);
    nav("/");
  };

  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col gap-4">
        {/* TODO: Form types not right. for on submit func */}
        {/* TODO: Need a box shadow card */}
        {/* TODO: The Login widht actically not full width  */}
        {/* TODO: Developer tailwindcss utilities not cover sl-react component style  */}
        <Form onSubmit={handleLogin}>
          <FormItem
            name="username"
            label="Username:"
            render={<Input placeholder="Please input username" />}
            rules={{
              required: "Please input username",
            }}
          />
          <FormItem
            name="password"
            label="Password:"
            className="grid"
            render={
              <Input type="password" placeholder="Please input password" />
            }
            rules={{
              required: "Please input password",
            }}
          />
          <Button type="submit" disabled={loading}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};
