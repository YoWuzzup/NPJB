import { NextResponse } from "next/server";
import { Collection, Db, MongoClient } from "mongodb";

import clientPromise from "@/lib/mongodb";
import { TReview } from "@/components/componentTypes";
import { generateId } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const client: MongoClient = await clientPromise;

    const db: Db = client.db("products");
    const reviews: Collection<TReview> = db.collection("reviews");

    // data of review
    const data = await request.json();

    // generate and check public id
    const publicId = async () => {
      const id = generateId();

      if (await reviews.findOne({ publicId: id })) {
        return publicId();
      }

      return id;
    };

    const newReview = {
      ...data,
      date: new Date(),
      publicId: await publicId(),
      liked: 0,
    };

    // insert new review to the db
    await reviews.insertOne(newReview);

    return NextResponse.json({ success: true, review: newReview });
  } catch (error) {
    console.error("Error posting new review: api/reviews", error);
    return NextResponse.json(
      { error: "Failed to post a new review" },
      { status: 500 }
    );
  }
}
