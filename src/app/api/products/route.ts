import { NextResponse } from "next/server";
import { Collection, Db, MongoClient } from "mongodb";

import clientPromise from "@/lib/mongodb";
import { TProduct } from "@/lib/types";

export async function GET() {
  try {
    const client: MongoClient = await clientPromise;

    const db: Db = client.db("products");
    const collection: Collection<TProduct> = db.collection("products");

    const products = await collection.find({}).toArray();

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
