"use server";

import prisma from "@/lib/prisma";
import {
  DocumentSelectionOrdersProps,
  DocumentSelectionTitleProps,
} from "@/lib/type";

export async function updateOrderPageTitleFN(
  data: DocumentSelectionTitleProps[]
) {
  try {
    for (const a of data) {
      await prisma.document_selection.update({
        where: { id: a.id },
        data: {
          title: a.title,
          description: a.description,
        },
      });
    }
    console.log("Order page title updated successfully");
    return;
  } catch (error) {
    console.error("Error updating order page title:", error);
    throw new Error("Failed to update oder page");
  }
}
export async function updateOrderPageSelectionFN(
  data: DocumentSelectionOrdersProps[]
) {
  try {
    for (const a of data) {
      await prisma.price_option.update({
        where: { id: a.id },
        data: {
          title: a.title,
        },
      });
    }
    console.log("Order page selections updated successfully");
    return;
  } catch (error) {
    console.error("Error updating order page selections:", error);
    throw new Error("Failed to update order page selections");
  }
}
