import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { name: string } }
) {
  const { name } = context.params;

  try {
    if (!(name in prisma)) {
      return NextResponse.json(
        { error: "Invalid model name" },
        { status: 400 }
      );
    }

    let data;

    if (name === "footer_social_media") {
      // Fetch data with related social media information
      data = await prisma.footer_social_media.findMany({
        include: {
          social_links: true, // Assuming the relation is named `social_links`
        },
      });
    } else {
      // Generic fetch for other models
      data = await prisma.footer.findMany();
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
