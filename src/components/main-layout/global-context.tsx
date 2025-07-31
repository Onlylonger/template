import { createContext, useContext, type PropsWithChildren } from "react";

interface GlobalValue {
  userId: string;
  userName: string;
  roles: string[];
}

export const globalContext = createContext<GlobalValue | null>(null);

export const GlobalProvider = (
  props: PropsWithChildren<{ value: GlobalValue }>,
) => {
  return (
    <globalContext.Provider value={props.value}>
      {props.children}
    </globalContext.Provider>
  );
};

export const useGlobal = () => {
  const value = useContext(globalContext);

  if (!value) {
    throw new Error("useGlobal need to used in GlobalProvider");
  }

  return value;
};
