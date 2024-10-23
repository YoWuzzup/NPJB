import { NextRequest, NextResponse } from "next/server";
import { MongoClient, Db } from "mongodb";

import clientPromise from "@/lib/mongodb";
import { TProduct } from "@/lib/types";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client: MongoClient = await clientPromise;
    const publicId = params.id;

    const db: Db = client.db("products");
    const product = await db
      .collection<TProduct>("products")
      .findOne({ publicId });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product_id:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
