import { ProductDto } from "@/api/client";
import { create } from "zustand";

type ProductDrawerStore = {
  product: ProductDto | object;
  isDrawerOpen: boolean;
  openDrawer: (product: ProductDto) => void;
  closeDrawer: () => void;
  onOpenChange: (open: boolean) => void;
};

export const useProductDrawer = create<ProductDrawerStore>()((set) => ({
  product: {},
  isDrawerOpen: false,
  openDrawer: (product) => set({ product, isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  onOpenChange: (open) => set({ isDrawerOpen: open }),
}));
