import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { name } }: { params: { name: string } }
) {
  try {
    // Check if the model exists in Prisma
    if (!prisma[name]) {
      return NextResponse.json(
        { error: "Invalid model name" },
        { status: 400 }
      );
    }
    let data;
    if (name == "operations") {
      data = await prisma.operations.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          place: true,
          action: true,
        },
        orderBy: { place: "asc" },
      });
    } else {
      data = await prisma[name].findMany();
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
