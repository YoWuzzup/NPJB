import { NextResponse } from "next/server";
import { Collection, Db, MongoClient } from "mongodb";

import clientPromise from "@/lib/mongodb";
import { TProduct } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const client: MongoClient = await clientPromise;

    const db: Db = client.db("products");
    const collection: Collection<TProduct> = db.collection("products");

    // parse the request body to get the products array
    const { products } = await request.json();

    if (
      !Array.isArray(products) ||
      !products.every((p) => p.publicId && p.quantity)
    ) {
      return NextResponse.json(
        { error: "Invalid products format" },
        { status: 400 }
      );
    }

    // extract publicIds for querying the database
    const publicIds = products.map((p) => p.publicId);

    // fetch product data from the database based on `publicId`
    const cartItems = await collection
      .find({ publicId: { $in: publicIds } })
      .project({
        _id: 0,
        publicId: 1,
        name: 1,
        price: 1,
        discount: 1,
        thumbnail: 1,
        specifications: 1,
      })
      .toArray();

    // attach quantities to the fetched products
    const cartData = cartItems.map((item) => {
      const product = products.find((p) => p.publicId === item.publicId);

      return { ...item, quantity: product?.quantity };
    });

    return NextResponse.json(cartData);
  } catch (error) {
    console.error("Error fetching cart items: api/cart", error);
    return NextResponse.json(
      { error: "Failed to fetch cart items" },
      { status: 500 }
    );
  }
}
