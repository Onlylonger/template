import { useTabs } from "./store";
import clsx from "clsx";

export const Tabs = (props: any) => {
  const { activeKey, onClick, onClose } = props;

  const list = useTabs((state) => state.list);

  //   const getCurentAndNext = (v) => {};

  return (
    <ul className="flex gap-2">
      {list.map((v, i) => {
        const isActive = activeKey === v.name;
        return (
          <li
            key={v.name}
            className={clsx(isActive && "underline")}
            onClick={() => onClick?.(v)}
          >
            {v.label}

            {list.length > 1 && (
              <span
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
              >
                X
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
};
