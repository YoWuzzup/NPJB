import { NextResponse } from "next/server";
import { Collection, Db, MongoClient } from "mongodb";

import clientPromise from "@/lib/mongodb";
import { TProduct } from "@/lib/types";
import { TReview } from "@/components/componentTypes";

export async function GET(request: Request) {
  try {
    const client: MongoClient = await clientPromise;

    const db: Db = client.db("products");
    const collection: Collection<TProduct> = db.collection("products");
    const reviews: Collection<TReview> = db.collection("reviews");

    // Parse the request URL to get query parameters
    const parameters = new URL(request.url);
    const search = parameters.searchParams.get("search") || "";
    const category = parameters.searchParams.get("category") || "";

    // Optional filters based on query parameters
    const filter: any = {};

    // If the search parameter is present, add an $or condition to search across multiple fields
    if (search) {
      const seachStringRegex = new RegExp(search, "i");
      filter.$or = [
        { name: { $regex: seachStringRegex } },
        { description: { $regex: seachStringRegex } },
        { manufacture: { $regex: seachStringRegex } },
      ];
    }

    // If the category parameter is present, match it with any of the specified fields
    if (category) {
      filter.category = { $in: [category] };
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
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
