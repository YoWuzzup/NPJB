import { NextRequest, NextResponse } from "next/server";
import { Collection, Db, MongoClient } from "mongodb";

import clientPromise from "@/lib/mongodb";
import { TProduct } from "@/lib/types";
import { TReview } from "@/components/componentTypes";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  try {
    const client: MongoClient = await clientPromise;

    const db: Db = client.db("products");
    const collection: Collection<TProduct> = db.collection("products");
    const reviews: Collection<TReview> = db.collection("reviews");

    // Parse the request URL to get query parameters
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const discount = searchParams.get("discount") || 0;

    // Optional filters based on query parameters
    const filter: Record<string, unknown> = {};

    // Add search to the filter
    if (search) {
      const seachStringRegex = new RegExp(search, "i");
      filter.$or = [
        { name: { $regex: seachStringRegex } },
        { description: { $regex: seachStringRegex } },
        { manufacture: { $regex: seachStringRegex } },
      ];
    }

    // Add category to the filter
    if (category) {
      filter.category = { $in: [category] };
    }

    // Add discount to the filter
    if (discount) {
      const parsed = parseInt(discount);
      filter.discount = { $gt: parsed };
    }

    // Fetch all products with the specified fields
    const products = await collection
      .find(
        { ...filter },
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
    console.error("Error fetching products: api/shop", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
