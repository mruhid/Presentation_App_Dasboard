import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch data from the database
    const data = await prisma.goFormSection.findMany({
      select: {
        id: true,
        title: true,
        buttonText: true,
        action: true,
      },
    });

    // Check if data exists
    if (!data) {
      return NextResponse.json(
        { error: "No goForm section data found." },
        { status: 404 }
      );
    }

    // Return the fetched data
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // Handle and log the error
    console.error("Error fetching goForm section data:", error);

    // Return an error response
    return NextResponse.json(
      { error: "An error occurred while fetching goForm section data" },
      { status: 500 }
    );
  }
}
