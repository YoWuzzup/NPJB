import { NextResponse } from "next/server";
import { Collection, Db, MongoClient } from "mongodb";

import clientPromise from "@/lib/mongodb";
import { TReview } from "@/components/componentTypes";

export async function POST(request: Request) {
  try {
    const client: MongoClient = await clientPromise;

    const db: Db = client.db("products");
    const reviews: Collection<TReview> = db.collection("reviews");

    const data = await request.json();
    console.log("Received data:", data);

    return NextResponse.json("");
  } catch (error) {
    console.error("Error fetching products: api/shop", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
