"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart";

export default function Navbar() {
  const itemsCount = useCartStore((state) => state.itemsCount);

  return (
    <nav className="w-full sm:px-10 px-2 m-auto h-16 shadow bg-white flex items-center justify-between">
      {/* LOGO */}
      <Link href="/" className="text-2xl font-bold text-violet-600 transition-transform duration-200 transform origin-center hover:scale-110">
        WEGE
      </Link>

      {/* CART */}
      <Link href={"/cart"} className="relative transition-transform duration-200 transform origin-center hover:scale-110">
        <ShoppingCart className="w-6 h-6 text-gray-700 cursor-pointer" />

        {itemsCount > 0 && (
          <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-500 rounded-full">
            {itemsCount}
          </span>
        )}
      </Link>
    </nav>
  );
}
