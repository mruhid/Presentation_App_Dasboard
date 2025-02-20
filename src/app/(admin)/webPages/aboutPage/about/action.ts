"use server";

import prisma from "@/lib/prisma";
import { AboutUsSectionProps } from "@/lib/type";

export async function updateAboutUsSection(data: AboutUsSectionProps[]) {
  try {
    for (const a of data) {
      await prisma.about_page_section.update({
        where: { id: a.id },
        data: {
          title: a.title,
          description: a.description,
          imgSrc: a.imgSrc,
          action: a.action,
        },
      });
    }
    console.log("About Us section updated successfully");
    return;
  } catch (error) {
    console.error("Error updating about us section:", error);
    throw new Error("Failed to update about Us section");
  }
}
