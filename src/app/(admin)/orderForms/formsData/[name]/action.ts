"use server";

import prisma from "@/lib/prisma";
import { OrderFormsDataProps } from "@/lib/type";

export async function updateOrderFormsDataFN(data: OrderFormsDataProps) {
  try {
    await prisma.forms.update({
      where: { id: data.id },
      data: {
        title: data.title, // Updating the title
        data: {
          array: data.data,
        },
      },
    });

    // Waiting for all update operations to complete

    console.log("Forms data updated successfully");
    return { success: true, message: "Forms data updated successfully" };
  } catch (error) {
    console.error("Error updating forms data:", error);
    return { success: false, message: "Failed to update forms data" };
  }
}
