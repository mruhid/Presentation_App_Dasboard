"use server";

import prisma from "@/lib/prisma";
import { PurposeSectionProps } from "@/lib/type";

export async function updatePurposeFN(data: PurposeSectionProps[]) {
  try {
    for (const a of data) {
      await prisma.purpose_section.update({
        where: { id: a.id },
        data: {
          title: a.title,
          description: a.description,
          catalog: a.catalog,
          action: a.action,
        },
      });
    }
    console.log("Purpose section updated successfully");
    return;
  } catch (error) {
    console.error("Error updating purpose section:", error);
    throw new Error("Failed to update purpose section");
  }
}
