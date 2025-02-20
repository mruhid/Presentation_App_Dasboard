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

    if (name === "hero_section_media") {
      // Fetch data with related social media information
      data = await prisma.hero_section_media.findMany({
        include: {
          social_links: true, // Assuming the relation is named `socialMedia`
        },
      });
    } else {
      // Generic fetch for other models
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
