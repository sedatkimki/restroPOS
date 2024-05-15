import { create } from "zustand";

type ReviewsDrawerStore = {
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  onOpenChange: (open: boolean) => void;
};

export const useReviewsDrawer = create<ReviewsDrawerStore>()((set) => ({
  order: {},
  isDrawerOpen: false,
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  onOpenChange: (open) => set({ isDrawerOpen: open }),
}));
