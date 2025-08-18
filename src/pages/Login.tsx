import { login } from "@/utils/api";
import { useRequest } from "@/utils/useRequest";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormItem, Input } from "@shilong/react";

export const LoginPage = () => {
  const nav = useNavigate();

  const { run, loading } = useRequest(login, {
    manual: false,
  });

  const handleLogin = async (value) => {
    const res = await run({
      userName: value.username,
      password: value.password,
    }).promise;

    localStorage.setItem("token", res?.data.token);
    nav("/");
  };

  return (
    <div className="flex min-h-svh items-center justify-center">
      <Card className="min-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Welcome user, please log in to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form onSubmit={handleLogin}>
            <FormItem
              name="username"
              label="Username"
              vertical
              render={<Input placeholder="please input" />}
              rules={{
                required: "please input username",
              }}
            />
            <FormItem
              name="password"
              label="Password"
              vertical
              render={<Input placeholder="please input" type="password" />}
              rules={{
                required: "please input password",
              }}
            />
            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full" disabled={loading}>
                Login
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
