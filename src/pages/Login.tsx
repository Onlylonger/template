import { Button, Input, Form, FormItem } from "@/ui";
import { login } from "@/utils/api";
import { useRequest } from "@/utils/useRequest";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";

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
      <Card className="min-w-sm !gap-1">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Welcome user, please log in to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <Form onSubmit={handleLogin}>
            <FormItem
              name="username"
              label="Username:"
              render={<Input placeholder="Please input username" />}
              rules={{
                required: "Please input username",
              }}
              vertical
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
              vertical
            />
            <Button
              type="submit"
              disabled={loading}
              loading={loading}
              className="mt-4 w-full"
            >
              Login
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
