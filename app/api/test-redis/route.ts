import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET() {
  try {
    const redis = getRedis();

    await redis.set("key", "hello");
    const value = await redis.get("key");

    return NextResponse.json({
      connected: true,
      value,
    });
  } catch (error) {
    console.error("Redis test failed:", error);

    return NextResponse.json(
      {
        connected: false,
        error: "Redis connection failed",
      },
      { status: 500 },
    );
  }
}
