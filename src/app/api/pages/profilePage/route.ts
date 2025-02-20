import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch data from the database
    const data = await prisma.profile.findMany();

    // Check if data exists
    if (!data) {
      return NextResponse.json(
        { error: "No profile page data found." },
        { status: 404 }
      );
    }

    // Return the fetched data
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // Handle and log the error
    console.error("Error fetchingprofile page data:", error);

    // Return an error response
    return NextResponse.json(
      { error: "An error occurred while fetching profile page data" },
      { status: 500 }
    );
  }
}
