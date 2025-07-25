import clsx from "clsx";
import { useState } from "react";

export interface NavigationMenuProps {
  list: MenuItem[];
  onClick?: Function;
  activeKey?: string;
  activeClassName?: string;
}

export interface MenuItem {
  label: string;
  key: string;
  children?: MenuItem[];
  [key: string]: any;
}

const ArrowDown = () => {
  return <span className="inline-block rotate-90">&gt;</span>;
};
const ArrowRight = () => {
  return <span className="inline-block">&gt;</span>;
};

export const NavigationMenu = (props: NavigationMenuProps) => {
  const { list, onClick, activeKey, activeClassName = "bg-amber-200" } = props;
  const [colMap, setColMap] = useState(() => {
    const tmp: { [key: string]: boolean } = {};
    list.forEach((v) => {
      if (v.children && Array.isArray(v.children)) {
        tmp[v.key] = true;
      }
    });
    return tmp;
  });

  return (
    <div>
      {list.map((v) => {
        if (v.children && Array.isArray(v.children)) {
          const groupActive =
            v.children.filter((c) => c.key === activeKey).length > 0;

          return (
            <div key={v.key} className={clsx(groupActive && activeClassName)}>
              <span
                className={clsx("inline-block")}
                onClick={() => {
                  const tmp = {
                    ...colMap,
                  };
                  tmp[v.key] = !tmp[v.key];
                  setColMap(tmp);
                }}
              >
                {v.label}
                {colMap[v.key] ? <ArrowDown /> : <ArrowRight />}
              </span>
              <ul className={clsx(!colMap[v.key] && "hidden")}>
                {v.children.map((v2) => {
                  return (
                    <li
                      key={v2.key}
                      onClick={() => onClick?.(v2)}
                      className={clsx(activeKey === v2.key && "underline")}
                    >
                      {v2.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        }
        return (
          <div
            key={v.key}
            onClick={() => onClick?.(v)}
            className={clsx(activeKey === v.key && "underline")}
          >
            {v.label}
          </div>
        );
      })}
    </div>
  );
};
