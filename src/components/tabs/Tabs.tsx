import { clsx } from "@shilong/utils";
import { useTabs } from "./store";
import { X } from "lucide-react";
import { TabsList, Tabs as STabs, TabsTrigger, TabsContent } from "../ui/tabs";

export const Tabs = (props: any) => {
  const { activeKey, onClick, onClose } = props;

  const list = useTabs((state) => state.list);

  //   const getCurentAndNext = (v) => {};

  return (
    <>
      <ul className="bg-muted flex h-10 w-full items-center rounded-md px-2 py-1 text-sm">
        {list.map((v, i) => {
          const isActive = activeKey === v.name;
          return (
            <li
              key={v.name}
              className={clsx(
                isActive && "bg-background rounded-md shadow-lg",
                "relative flex h-8 cursor-pointer items-center gap-1 px-2",
              )}
              onClick={() => onClick?.(v)}
            >
              <span className="">{v.label}</span>

              {list.length > 1 && (
                <X
                  className="hover:bg-primary hover:text-primary-foreground size-4 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();

                    let nextName: string | undefined;
                    if (i === 0) {
                      // first
                      nextName = list[1].name;
                    } else if (i > 0 && i < list.length - 1) {
                      nextName = list[i - 1].name;
                      // middle
                    } else {
                      nextName = list[list.length - 2].name;
                      //   last
                    }

                    onClose?.(v, nextName);
                  }}
                />
              )}
            </li>
          );
        })}
      </ul>
      {/* <STabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </STabs> */}
    </>
  );
};
