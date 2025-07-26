import { create } from "zustand";

interface State {
  list: Item[];

  check: (item: Item) => void;
  remove: (name: string) => void;
}

interface Item {
  name: string;
  label: string;
}

export const useTabs = create<State>((set, get) => ({
  list: [],

  check(item) {
    const { name } = item;
    const { list } = get();
    if (list.filter((v) => v.name === name).length > 0) {
      return;
    } else {
      set({
        list: [...list, item],
      });
    }
  },

  remove(name) {
    const { list } = get();
    const index = list.findIndex((v) => v.name === name);
    if (index > -1) {
      const tmp = [...list];
      tmp.splice(index, 1);
      set({
        list: tmp,
      });
    }
  },
}));
