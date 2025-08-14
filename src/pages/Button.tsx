import { Button, type ButtonVariants } from "@/ui";

const variants: ButtonVariants["variant"][] = [
  "default",
  "secondary",
  "ghost",
  "link",
  "outline",
  "destructive",
];

const sizes: ButtonVariants["size"][] = ["default", "lg", "sm"];

export const ButtonPage = () => {
  return (
    <div>
      {variants.map((v) => {
        return (
          <div key={v}>
            {sizes.map((v2) =>
              [true, false].map((v3) => (
                <Button variant={v} size={v2} disabled={v3}>
                  {v}-{v2}-{v3 ? "true" : "false"}
                </Button>
              )),
            )}
          </div>
        );
      })}
    </div>
  );
};
