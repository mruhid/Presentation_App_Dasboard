"use server";

import prisma from "@/lib/prisma";
import { OrderFormsPriceProps } from "@/lib/type";

export async function updateFormsPriceFN(data: OrderFormsPriceProps[]) {
  try {
    for (const a of data) {
      await prisma.forms.update({
        where: { id: a.id },
        data: {
          price: a.price,
        },
      });
    }
    console.log("Forms price updated successfully");
    return;
  } catch (error) {
    console.error("Error updating form price:", error);
    throw new Error("Failed to update form price");
  }
}
