import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch data from the database
    const data = await prisma.othwe_work_section.findMany({
      select: {
        id: true,
        backgroundImg: true,
        overlay: true,
        action: true,
      },
    });

    // Check if data exists
    if (!data) {
      return NextResponse.json(
        { error: "No otherWorks section data found." },
        { status: 404 }
      );
    }

    // Return the fetched data
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // Handle and log the error
    console.error("Error fetching other works section data:", error);

    // Return an error response
    return NextResponse.json(
      { error: "An error occurred while fetching other works section data" },
      { status: 500 }
    );
  }
}
