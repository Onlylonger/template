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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

export const LoginPage = () => {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="username"
                  placeholder="please input"
                  aria-invalid={!!errors.username}
                  {...register("username", {
                    required: "please input username",
                  })}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="please input"
                  aria-invalid={!!errors.password}
                  {...register("password", {
                    required: "please input password",
                  })}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={loading}>
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
