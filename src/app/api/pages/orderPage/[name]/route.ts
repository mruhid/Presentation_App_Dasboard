import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { name } }: { params: { name: string } }
) {
  try {
    if (!prisma[name]) {
      return NextResponse.json(
        { error: "Invalid model name" },
        { status: 400 }
      );
    }
    let data;
    if (name == "price_option") {
      data = await prisma.price_option.findMany({
        select: {
          id: true,
          title: true,
        },
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
