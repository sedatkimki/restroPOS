import { create } from "zustand";

import { FirestoreOrderDto } from "../types";

// TODO: OrderDTO

type OrderDrawerStore = {
  order: FirestoreOrderDto;
  assigned: boolean;
  isDrawerOpen: boolean;
  openDrawer: (order: FirestoreOrderDto, assigned: boolean) => void;
  closeDrawer: () => void;
  onOpenChange: (open: boolean) => void;
};

export const useWaiterOrderDrawer = create<OrderDrawerStore>()((set) => ({
  order: {},
  isDrawerOpen: false,
  assigned: false,
  openDrawer: (order, assigned) => set({ order, assigned, isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  onOpenChange: (open) => set({ isDrawerOpen: open }),
}));
