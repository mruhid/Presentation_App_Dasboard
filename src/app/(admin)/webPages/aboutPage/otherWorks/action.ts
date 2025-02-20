"use server";

import prisma from "@/lib/prisma";
import { OtherWorksSectionProps } from "@/lib/type";

export async function updateOtherWorksFN(data: OtherWorksSectionProps[]) {
  try {
    for (const a of data) {
      await prisma.othwe_work_section.update({
        where: { id: a.id },
        data: {
          backgroundImg: a.backgroundImg,
          overlay: a.overlay,
          action: a.action,
        },
      });
    }
    console.log("Other works section updated successfully");
    return;
  } catch (error) {
    console.error("Error updating other works section:", error);
    throw new Error("Failed to update other works section");
  }
}
