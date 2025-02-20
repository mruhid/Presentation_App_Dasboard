"use server";

import prisma from "@/lib/prisma";

export async function ChangeStatus({
  id,
  check,
}: {
  id: number;
  check: boolean;
}) {
  try {
    const updatedBook = await prisma.books.update({
      where: { id },
      data: { check },
    });

    if (!updatedBook) throw new Error("Failed to update book status");

    return updatedBook; // Return the updated book object
  } catch (error) {
    console.error("Error in ChangeStatus:", error);
    throw error; // Ensure the mutation handles errors correctly
  }
}
