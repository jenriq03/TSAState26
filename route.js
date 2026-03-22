import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("admin"); // Connect to the 'admin' database to ping

    // The 'ping' command is the standard way to check if Mongo is alive
    await db.command({ ping: 1 });

    return NextResponse.json({ 
      status: "Success", 
      message: "Connected to MongoDB successfully!" 
    });

  } catch (error) {
    console.error("Database connection failed:", error);
    return NextResponse.json(
      { status: "Error", message: "Failed to connect to database", details: error.message },
      { status: 500 }
    );
  }
}

