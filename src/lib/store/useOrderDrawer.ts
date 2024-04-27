import { create } from "zustand";

import { FirestoreOrderDto } from "../types";

// TODO: OrderDTO

type OrderDrawerStore = {
  order: FirestoreOrderDto;
  isDrawerOpen: boolean;
  openDrawer: (orderStatus: FirestoreOrderDto) => void;
  closeDrawer: () => void;
  onOpenChange: (open: boolean) => void;
};

export const useOrderDrawer = create<OrderDrawerStore>()((set) => ({
  order: {},
  isDrawerOpen: false,
  openDrawer: (order) => set({ order, isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  onOpenChange: (open) => set({ isDrawerOpen: open }),
}));
