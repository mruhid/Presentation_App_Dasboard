"use server";

import prisma from "@/lib/prisma";

export async function DeleteAllClients(action: boolean) {
  try {
    if (action) {
      // Delete only where `check` is true
      await prisma.books.deleteMany({
        where: { check: true },
      });
      console.log("All marked clients deleted");
      return { action, message: "Marked clients deleted" };
    }
    // Delete all clients
    await prisma.books.deleteMany();
    console.log("All client information deleted successfully!");
    return { action, message: "All clients deleted" };
  } catch (error) {
    console.error("Error deleting clients:", error);
    throw new Error("Failed to delete clients");
  }
}
