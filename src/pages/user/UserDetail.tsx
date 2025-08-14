import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export const UserDetailPage = () => {
  const nav = useNavigate();

  return (
    <div className="">
      <div>detail</div>
      <Button onClick={() => nav(-1)}>Back</Button>
    </div>
  );
};
