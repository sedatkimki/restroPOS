import { create } from "zustand";

// TODO: OrderDTO

type TablesStore = {
  selected: string;
  setSelected: (selected: string) => void;
};

export const useTables = create<TablesStore>()((set) => ({
  selected: "",
  setSelected: (selected) => set({ selected }),
}));
