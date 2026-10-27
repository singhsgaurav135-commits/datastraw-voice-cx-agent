
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("aura_skincare");

    const calls = await db
      .collection("call_history")
      .find({})
      .sort({ ended_at: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json({ success: true, calls });
  } catch (error) {
    console.error("Failed to load call history:", error);

    return NextResponse.json(
      { success: false, message: "Failed to load call history" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      !body.call_id ||
      !Array.isArray(body.transcript) ||
      !body.ended_at
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid call-history record" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("aura_skincare");

    await db.collection("call_history").updateOne(
      { call_id: body.call_id },
      {
        $set: {
          call_id: body.call_id,
          order_id: body.order_id ?? "",
          customer_intent:
            body.customer_intent ?? "General customer support",
          resolution_status: body.resolution_status ?? "Needs review",
          call_summary: body.call_summary ?? "",
          transcript: body.transcript,
          ended_at: body.ended_at,
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save call history:", error);

    return NextResponse.json(
      { success: false, message: "Failed to save call history" },
      { status: 500 }
    );
  }
}
