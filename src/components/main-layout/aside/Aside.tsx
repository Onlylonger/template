import { useTabs } from "@/components/tabs/store";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { menuKey } from "@/router/const";
import {
  Calendar,
  Home,
  Group,
  Search,
  User,
  KeyRound,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    key: menuKey.home,
  },
  {
    title: "User",
    url: "/user",
    icon: User,
    key: menuKey.user,
  },
  {
    title: "Group",
    icon: Group,
    children: [
      {
        title: "Item1",
        url: "/item1",
        icon: Calendar,
        key: menuKey.item1,
      },
      {
        title: "Item2",
        url: "/item2",
        icon: Search,
        key: menuKey.item2,
      },
    ],
  },
  {
    title: "Role",
    url: "/role",
    icon: KeyRound,
    key: menuKey.role,
  },
];
// General

export const Aside = () => {
  const nav = useNavigate();

  const handleMenuClick = async (v) => {
    // if (v.newBlank) {
    //   window.open(v.url);

    //   return;
    // }

    if (v.url) {
      await nav(v.url);

      useTabs.getState().check({
        name: v.key,

        label: v.label,
      });
    }
  };

  return (
    <div>
      <Sidebar variant="floating">
        <SidebarHeader className="text-center">😄 Admin Template</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  if (item.children) {
                    return (
                      <Collapsible
                        defaultOpen
                        className="group/collapsible"
                        key={item.title}
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton asChild>
                              <div>
                                {item.title}
                                <SidebarMenuAction>
                                  <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuAction>
                              </div>
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.children.map((subItem) => {
                                return (
                                  <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton asChild>
                                      <div
                                        onClick={() =>
                                          handleMenuClick({
                                            url: subItem.url,
                                            key: subItem.key,
                                            label: subItem.title,
                                          })
                                        }
                                      >
                                        <subItem.icon />
                                        <span>{subItem.title}</span>
                                      </div>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                );
                              })}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    );
                  } else {
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <div
                            onClick={() =>
                              handleMenuClick({
                                url: item.url,
                                key: item.key,
                                label: item.title,
                              })
                            }
                          >
                            <item.icon />
                            <span>{item.title}</span>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  }
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="text-center">
          <Button variant="ghost">Upgrade to Pro</Button>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};
