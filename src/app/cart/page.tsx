"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart";

export default function CartPage() {
  const { items, increase, decrease, removeItem, clearCart } = useCartStore();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center text-gray-500">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Your Cart</h1>

      {/* CART ITEMS */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 bg-white p-4 rounded-lg shadow"
          >
            {item.image && (
              <div className="relative w-24 h-24 shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
            )}

            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>

              <p className="font-semibold mt-1 text-gray-500">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => decrease(item.id)}
                  disabled={item.quantity == 1}
                  className={`w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-100  ${
                    item.quantity > 1 ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                  aria-label="decrease item"
                >
                  <Minus size={16} />
                </button>

                <span className="font-medium">{item.quantity}</span>

                <button
                  onClick={() => increase(item.id)}
                  aria-label="increase item"
                  className="w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-100 cursor-pointer"
                >
                  <Plus size={16} />
                </button>

                <button
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                  className="ml-auto text-red-500 hover:text-red-600 cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="flex justify-between items-center border-t pt-4">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-xl font-bold text-violet-600">
          ${totalPrice.toFixed(2)}
        </span>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-between gap-3">
        <button
          onClick={clearCart}
          aria-label="Clear Cart"
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer md:text-base text-sm cursor-pointer"
        >
          Clear Cart
        </button>

        <button
          className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-500 cursor-pointer"
          aria-label="Checkout"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
