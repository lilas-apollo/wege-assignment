import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  itemsCount: number;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      itemsCount: 0,
      addItem: (product) => {
        const existing = get().items.find((item) => item.id === product.id);

        if (existing) {
          set({
            items: get().items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...get().items, { ...product, quantity: 1 }],
            itemsCount: get().itemsCount + 1,
          });
        }
      },

      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
          itemsCount: Math.max(0, get().itemsCount - 1),
        });
      },

      increase: (id) => {
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        });
      },

      decrease: (id) => {
        set({
          items: get()
            .items.map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: item.quantity > 1 ? item.quantity - 1 : 1,
                  }
                : item
            )
            .filter((item) => item.quantity > 0),
        });
      },

      clearCart: () => set({ items: [], itemsCount: 0 }),
    }),
    {
      name: "cart-storage", // key in localStorage
    }
  )
);
