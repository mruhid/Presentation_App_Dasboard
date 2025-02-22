import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{
    name: string;
  }>;
};
export async function GET(req: NextRequest, props: Props) {
  const params = await props.params;
  try {
    // Check if the model exists in Prisma
    if (!prisma[params.name]) {
      return NextResponse.json(
        { error: "Invalid model name" },
        { status: 400 }
      );
    }

    let data;

    if (params.name === "social_section_media") {
      // Fetch data with related social media information
      data = await prisma.social_section_media.findMany({
        include: {
          social_links: true, // Assuming the relation is named `socialMedia`
        },
      });
    } else {
      // Generic fetch for other models
      data = await prisma[params.name].findMany();
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
