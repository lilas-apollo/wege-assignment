/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import searchData from "../_data/products.json";

type SearchRequest = {
  query?: string;
  page?: number;
  pageSize?: number;
  filters?: {
    categories?: string[];
    priceFrom?: number;
    priceTo?: number;
  };
};

export async function POST(req: NextRequest) {
  try {
    const body: SearchRequest = await req.json();
    const query = body.query?.toLowerCase() || "";
    const page = body.page || 1;
    const pageSize = body.pageSize || 3;

    let results = searchData;

    // Apply search filter
    if (query) {
      results = results.filter(
        (doc: any) =>
          doc.title.toLowerCase().includes(query) ||
          doc.description.toLowerCase().includes(query)
      );
    }

    // Apply categories filter
    if (body.filters?.categories?.length) {
      results = results.filter((doc: any) =>
        body.filters!.categories?.includes(doc.category)
      );
    }

    // Apply price filter
    if (
      body.filters?.priceFrom !== undefined ||
      body.filters?.priceTo !== undefined
    ) {
      const from = body.filters?.priceFrom ?? 0;
      const to = body.filters?.priceTo ?? Infinity;

      results = results.filter(
        (doc: any) => doc.price >= from && doc.price <= to
      );
    }

    const totalResults = results.length;
    const totalPages = Math.ceil(totalResults / pageSize);

    const paginatedResults = results.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    const response = {
      results: paginatedResults,
      pagination: {
        page,
        pageSize,
        totalResults,
        totalPages,
      },
    };

    return NextResponse.json(response);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch search results" },
      { status: 500 }
    );
  }
}
