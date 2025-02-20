"use server";

import prisma from "@/lib/prisma";
import { OrderFormsDefaultProps } from "@/lib/type";

export async function updateOrderFormsDefault(data: OrderFormsDefaultProps[]) {
  try {
    for (const a of data) {
      await prisma.forms_default.update({
        where: { id: a.id },
        data: {
          wpNumber: a.wpNumber,
          modelText: a.modelText,
        },
      });
    }
    console.log("Order forms default data updated successfully");
    return;
  } catch (error) {
    console.error("Error updating order forms default data:", error);
    throw new Error("Failed to update order forms default data");
  }
}
