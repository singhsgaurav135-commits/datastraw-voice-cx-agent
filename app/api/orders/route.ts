
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("aura_skincare");

    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");

    // If no order ID is provided, return all orders.
    if (!orderId) {
      const orders = await db
        .collection("orders")
        .find({})
        .project({ _id: 0 })
        .toArray();

      return NextResponse.json({
        success: true,
        orders,
      });
    }

    // Otherwise, retrieve one specific order.
    const normalizedOrderId = orderId
      .trim()
      .toUpperCase()
      .replace(/\s+/g, "-");

    const order = await db.collection("orders").findOne(
      { orderId: normalizedOrderId },
      { projection: { _id: 0 } }
    );

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Order lookup failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to retrieve order.",
      },
      { status: 500 }
    );
  }
}
