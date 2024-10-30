import { NextRequest, NextResponse } from "next/server";
import { MongoClient, Db, Collection } from "mongodb";

import clientPromise from "@/lib/mongodb";
import { TProduct } from "@/lib/types";
import { TReview } from "@/components/componentTypes";

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
    const reviews: Collection<TReview> = db.collection("reviews");

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const productReviews = await reviews
      .find(
        { product_id: product.publicId },
        {
          projection: {
            _id: 0,
          },
        }
      )
      .toArray();

    // Calculate the average rating
    const ratingLength = productReviews?.length || 0;
    const averageRating =
      product?.reviews && product?.reviews?.length > 0
        ? productReviews.reduce((sum, review) => sum + review.rating, 0) /
          productReviews.length
        : 5;

    return NextResponse.json({
      ...product,
      reviews: productReviews,
      ratingLength,
      averageRating,
    });
  } catch (error) {
    console.error("Error fetching product_id:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
