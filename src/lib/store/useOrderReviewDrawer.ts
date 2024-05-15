import { OrderDto } from "@/api/client";
import { create } from "zustand";

import { FirestoreOrderDto } from "../types";

// TODO: OrderDTO

type OrderDrawerStore = {
  order: FirestoreOrderDto | OrderDto;
  isDrawerOpen: boolean;
  openDrawer: (orderStatus: FirestoreOrderDto | OrderDto) => void;
  closeDrawer: () => void;
  onOpenChange: (open: boolean) => void;
};

export const useOrderReviewDrawer = create<OrderDrawerStore>()((set) => ({
  order: {},
  isDrawerOpen: false,
  openDrawer: (order) => set({ order, isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  onOpenChange: (open) => set({ isDrawerOpen: open }),
}));
