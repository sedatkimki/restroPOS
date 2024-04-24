import { ProductDto } from "@/api/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  productSelectedModifiers?: ProductModifiers[];
  calculatedPrice: number;
};

interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
  changeQuantity: (item: CartItem, quantity: number) => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (item) => set((state) => ({ items: [...state.items, item] })),
      removeFromCart: (item) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== item.id),
        })),
      clearCart: () => set({ items: [] }),
      changeQuantity: (item, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === item.id
              ? {
                  ...i,
                  quantity,
                  calculatedPrice: i.calculatedPrice
                    ? (i.calculatedPrice / i.quantity) * quantity
                    : 0,
                }
              : i,
          ),
        })),
    }),
    {
      name: "cart",
    },
  ),
);
