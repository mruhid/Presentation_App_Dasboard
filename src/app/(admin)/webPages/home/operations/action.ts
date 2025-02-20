"use server";

import prisma from "@/lib/prisma";
import { OperationsProps, OperationTitleProps } from "@/lib/type";

export async function updateOperationTitle(data: OperationTitleProps[]) {
  try {
    for (const a of data) {
      await prisma.operation_section.update({
        where: { id: a.id },
        data: {
          title: a.title,
          description: a.description,
          action: a.action,
        },
      });
    }
    console.log("Operation section updated successfully");
    return;
  } catch (error) {
    console.error("Error updating operation section:", error);
    throw new Error("Failed to update operation section");
  }
}
export async function updateOperations(data: OperationsProps[]) {
  try {
    for (const a of data) {
      await prisma.operations.update({
        where: { id: a.id },
        data: {
          title: a.title,
          description: a.description,
          place: a.place,
          action: a.action,
        },
      });
    }
    console.log("Operation section updated successfully");
    return;
  } catch (error) {
    console.error("Error updating operation section:", error);
    throw new Error("Failed to update operation section");
  }
}
