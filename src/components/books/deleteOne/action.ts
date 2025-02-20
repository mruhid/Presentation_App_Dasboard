"use server";

import prisma from "@/lib/prisma";

export async function deleteCulomn(id: number) {
  try {
    const culomn = await prisma.books.findFirst({ where: { id } });
    if (!culomn) throw new Error("culomn not found");

    await prisma.books.delete({
      where: { id },
    });

    return "culomn delete sucsesfully";
  } catch (error) {
    console.error(error);
    return;
  }
}
