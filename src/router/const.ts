import type { MenuItem } from "@/components/menu/NavigationMenu";

export const menuKey = {
  home: "home",
  user: "user",
  role: "role",
  group: "group",
  item1: "item1",
  item2: "item2",
};

export const menuList = [
  {
    label: "home",
    key: menuKey.home,
    url: "/",
  },
  {
    label: "group",
    key: menuKey.group,
    children: [
      {
        label: "item1",
        key: menuKey.item1,
        url: "/item1",
      },
      {
        label: "item2",
        key: menuKey.item2,
        url: "/item2",
      },
    ],
  },
  {
    label: "user",
    key: menuKey.user,
    url: "/user",
  },
  {
    label: "role",
    key: menuKey.role,
    url: "/role",
  },
];

export const getMenuItemByKey = (key: string) => {
  let tmp: undefined | MenuItem;
  menuList.forEach((v) => {
    if (v.children && Array.isArray(v.children)) {
      v.children.forEach((v2) => {
        if (key === v2.key) {
          tmp = v2;
        }
      });
    }
    if (v.key === key) {
      tmp = v;
    }
  });

  return tmp;
};
