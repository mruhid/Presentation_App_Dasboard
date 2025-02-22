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
    if (!prisma[params.name]) {
      return NextResponse.json(
        { error: "Invalid model name" },
        { status: 400 }
      );
    }
    let data;
    if (params.name == "price_option") {
      data = await prisma.price_option.findMany({
        select: {
          id: true,
          title: true,
        },
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
