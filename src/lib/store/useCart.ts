import { ProductDto } from "@/api/client";
import { create } from "zustand";

export type ProductModifiers = {
  id: number;
  name: string;
  selections?: {
    value: number;
    label: string;
  }[];
};

export type CartItem = {
  id: string;
  product: ProductDto;
  quantity: number;
  productModifiers?: ProductModifiers[];
};

interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
}

export const useCart = create<CartStore>()((set) => ({
  items: [],
  addToCart: (item) => set((state) => ({ items: [...state.items, item] })),
  removeFromCart: (item) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== item.id) })),
}));
