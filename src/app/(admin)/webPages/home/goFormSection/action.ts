"use server";

import prisma from "@/lib/prisma";
import { GoFormSectionProps } from "@/lib/type";

export async function updateGoFormSection(data: GoFormSectionProps[]) {
  try {
    for (const a of data) {
      await prisma.goFormSection.update({
        where: { id: a.id },
        data: {
          title: a.title,
          buttonText: a.buttonText,
          action: a.action,
        },
      });
    }
    console.log("Go form section updated successfully");
    return;
  } catch (error) {
    console.error("Error updating go form section:", error);
    throw new Error("Failed to update go form section");
  }
}
