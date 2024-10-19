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

    return NextResponse.json("asd");
  } catch (error) {
    console.error("Error fetching product_id:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
