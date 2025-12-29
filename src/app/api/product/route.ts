/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import productsData from "../_data/products.json";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ product: null }, { status: 400 });
  }

  const product = productsData.find((p: any) => p.id === id) ?? null;

  return NextResponse.json({ product });
}
