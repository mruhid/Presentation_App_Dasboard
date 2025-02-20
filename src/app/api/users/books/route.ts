import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Get pagination cursor from query parameters
    const paginationCursor =
      req.nextUrl.searchParams.get("cursor") || undefined;
    const pageSize = 10;

    // Fetch data with pagination from the 'books' table
    const customers = await prisma.books.findMany({
      take: pageSize + 1, // Fetch one extra record to check if there are more pages
      orderBy: { id: "desc" },
      cursor: paginationCursor
        ? { id: parseInt(paginationCursor, 10) }
        : undefined,
    });

    const totlaMoney = await prisma.books.aggregate({
      _sum: {
        price: true,
      },
    });
    // Determine if there's a next page by checking if we've fetched more than the page size
    const nextPaginationCursor =
      customers.length > pageSize ? customers[pageSize].id : null;

    // Slice out the extra item fetched to match the desired page size
    const filteredCustomers = customers.slice(0, pageSize);

    // Return the data with the next cursor for pagination
    return NextResponse.json({
      customers: filteredCustomers,
      nextPaginationCursor,
      totalPrice: totlaMoney._sum.price,
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
