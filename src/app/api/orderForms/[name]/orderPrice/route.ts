import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { name } }: { params: { name: string } }
) {
  try {
    // Validate if 'name' exists and is not empty
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { error: "Invalid data type" }, // Return error if name is missing
        { status: 400 }
      );
    }

    const data = await prisma.forms.findMany({
      where: { type: name },
      select: { id: true, type: true, price: true },
    });

    if (!data) {
      return NextResponse.json(
        { error: "Invalid forms type name" }, // Error if 'name' is not found in DB
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
