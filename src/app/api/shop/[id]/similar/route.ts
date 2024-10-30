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
      return NextResponse.json(
        { error: "Failed to fetch similar products" },
        { status: 500 }
      );
    }

    const similarProducts = await db
      .collection<TProduct>("products")
      .find(
        {
          $or: [
            { tags: { $in: product.tags } },
            { category: { $in: product.category } },
          ],
          publicId: { $ne: publicId },
        },
        { projection: { _id: 0 } }
      )
      .limit(5)
      .toArray();

    return NextResponse.json(similarProducts);
  } catch (error) {
    console.error("Error fetching product_id / similar:", error);
    return NextResponse.json(
      { error: "Failed to fetch similar products" },
      { status: 500 }
    );
  }
}
