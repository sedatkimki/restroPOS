import { OrderDto } from "@/api/client";
import { create } from "zustand";

// TODO: OrderDTO

type OrderDrawerStore = {
  order: OrderDto;
  isDrawerOpen: boolean;
  openDrawer: (order: OrderDto) => void;
  closeDrawer: () => void;
  onOpenChange: (open: boolean) => void;
};

export const useWaiterOrderDrawer = create<OrderDrawerStore>()((set) => ({
  order: {},
  isDrawerOpen: false,
  openDrawer: (order) => set({ order, isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  onOpenChange: (open) => set({ isDrawerOpen: open }),
}));
