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

    const data = await prisma.forms.findFirst({
      where: { type: name },
      select: { id: true, data: true, title: true, type: true },
    });

    if (!data) {
      return NextResponse.json(
        { error: "Invalid forms type name" }, // Error if 'name' is not found in DB
        { status: 400 }
      );
    }

    const res = {
      id: data.id,
      title: data.title,
      data: data.data?.array || [],
      type: data.type,
    };

    return NextResponse.json(res);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
