import { NextResponse } from "next/server";
import { Collection, Db, MongoClient } from "mongodb";

import clientPromise from "@/lib/mongodb";
import { TReview } from "@/components/componentTypes";

export async function POST(request: Request) {
  try {
    const client: MongoClient = await clientPromise;

    const db: Db = client.db("users");
    const emailCollection: Collection<TReview> = db.collection("subscribed");

    // new subscribed email
    const data = await request.json();

    const isSubed = await emailCollection.findOne({ email: data.email });

    if (isSubed)
      return NextResponse.json(
        { error: "Already subscribed" },
        { status: 409 }
      );

    // insert new email to the db
    await emailCollection.insertOne(data);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error subscribing: api/email", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
