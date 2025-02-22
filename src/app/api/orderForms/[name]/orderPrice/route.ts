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
    // Validate if 'name' exists and is not empty
    if (
      !params.name ||
      typeof params.name !== "string" ||
      params.name.trim() === ""
    ) {
      return NextResponse.json(
        { error: "Invalid data type" }, // Return error if name is missing
        { status: 400 }
      );
    }

    const data = await prisma.forms.findMany({
      where: { type: params.name },
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
