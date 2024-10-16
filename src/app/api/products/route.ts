import { NextResponse } from "next/server";
import { Collection, Db, MongoClient } from "mongodb";

import clientPromise from "@/lib/mongodb";
import { TProduct } from "@/lib/types";
import { TReview } from "@/components/componentTypes";

export async function GET() {
  try {
    const client: MongoClient = await clientPromise;

    const db: Db = client.db("products");
    const collection: Collection<TProduct> = db.collection("products");
    const reviews: Collection<TReview> = db.collection("reviews");

    // Fetch all products with the specified fields
    const products = await collection
      .find(
        {},
        {
          projection: {
            _id: 0,
            publicId: 1,
            name: 1,
            price: 1,
            discount: 1,
            thumbnail: 1,
            createdAt: 1,
          },
        }
      )
      .toArray();

    // Compute average rating for each product
    const withRating = await Promise.all(
      products.map(async (product) => {
        const productReviews = await reviews
          .find({ product_id: product.publicId })
          .toArray();

        // Calculate the average rating
        const ratingLength = productReviews.length;
        const averageRating =
          productReviews.length > 0
            ? productReviews.reduce((sum, review) => sum + review.rating, 0) /
              productReviews.length
            : 5;

        return {
          ...product,
          averageRating,
          ratingLength,
        };
      })
    );

    return NextResponse.json(withRating);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
