import { NextResponse } from "next/server";
import { Collection, Db, MongoClient } from "mongodb";

import clientPromise from "@/lib/mongodb";
import { TReview } from "@/components/componentTypes";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client: MongoClient = await clientPromise;

    const db: Db = client.db("products");
    const reviews: Collection<TReview> = db.collection("reviews");

    // new data for review to update
    const data = await request.json();
    const updatedReview = await reviews.findOneAndUpdate(
      { publicId: params.id },
      { $set: data },
      { returnDocument: "after", projection: { _id: 0 } }
    );

    return NextResponse.json(updatedReview);
  } catch (error) {
    console.error("Error patching a review: api/reviews/[id]", error);
    return NextResponse.json(
      { error: "Failed to patch a review" },
      { status: 500 }
    );
  }
}
