"use client";

import { useQuery } from "@tanstack/react-query";

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
};

export function useProduct(id?: string) {
  return useQuery<Product | null>({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await fetch(`/api/product?id=${id}`);
      const data = await res.json();
      return (data.product as Product) ?? null;
    },
    enabled: !!id, // only fetch if id exists
  });
}
