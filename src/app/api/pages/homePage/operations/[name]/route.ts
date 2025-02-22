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
    if (params.name == "operations") {
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
