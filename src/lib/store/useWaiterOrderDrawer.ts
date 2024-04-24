import { create } from "zustand";

import { OrderStatus } from "../types";

// TODO: OrderDTO

type OrderDrawerStore = {
  orderStatus: OrderStatus;
  isDrawerOpen: boolean;
  openDrawer: (orderStatus: OrderStatus) => void;
  closeDrawer: () => void;
  onOpenChange: (open: boolean) => void;
};

export const useWaiterOrderDrawer = create<OrderDrawerStore>()((set) => ({
  //   order: {},
  orderStatus: OrderStatus.RECEIVED,
  isDrawerOpen: false,
  openDrawer: (orderStatus) => set({ orderStatus, isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  onOpenChange: (open) => set({ isDrawerOpen: open }),
}));
