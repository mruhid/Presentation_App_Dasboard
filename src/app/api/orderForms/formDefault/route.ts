import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch data from the database
    const data = await prisma.forms_default.findMany();

    // Check if data exists
    if (!data) {
      return NextResponse.json(
        { error: "No forms_default data found." },
        { status: 404 }
      );
    }

    // Return the fetched data
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // Handle and log the error
    console.error("Error fetching form default  data:", error);

    // Return an error response
    return NextResponse.json(
      { error: "An error occurred while fetching form default data" },
      { status: 500 }
    );
  }
}
