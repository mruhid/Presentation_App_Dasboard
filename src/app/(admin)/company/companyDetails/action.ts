"use server";

import prisma from "@/lib/prisma";

export async function updateCompanyDetails(data: { [key: string]: any }) {
  if (!data || !data.id) {
    console.error(
      "Invalid data: An 'id' field is required to update company details."
    );
    return { success: false, message: "Invalid data: 'id' is required." };
  }

  const { id, ...updateFields } = data;

  try {
    const updatedDetails = await prisma.company_details.update({
      where: { id },
      data: updateFields,
    });

    return { success: true, data: updatedDetails };
  } catch (error) {
    console.error("Error updating company details:", error);
    return {
      success: false,
      message: "Failed to update company details.",
      error,
    };
  }
}
