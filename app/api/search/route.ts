import { NextRequest, NextResponse } from "next/server";
import { client, productQueries } from "@/lib/sanity";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ products: [] });
    }

    // Search for products using Sanity's text search
    const products = await client.fetch(
      `*[_type == "product" && active == true && (
        name match "*${query}*" ||
        description match "*${query}*" ||
        category->name match "*${query}*" ||
        tags[] match "*${query}*"
      )] | order(_createdAt desc) [0...12] {
        _id,
        name,
        slug,
        price,
        images[0] {
          asset,
          alt
        },
        category->{
          name,
          slug
        },
        tags,
        newArrival
      }`
    );

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 }
    );
  }
}
