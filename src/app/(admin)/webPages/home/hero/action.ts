"use server";

import prisma from "@/lib/prisma";
import { HeroSectionMediaProps, HeroSectionProps } from "@/lib/type";

export async function updateHeroMedia(data: HeroSectionMediaProps[]) {
  try {
    // Use a transaction to ensure atomicity
    await prisma.$transaction(async (tx) => {
      // Delete all rows in the table
      await tx.hero_section_media.deleteMany();

      // If there's no data, simply exit after deleting
      if (data.length === 0) {
        console.log("All rows deleted, no new data to insert.");
        return;
      }

      // Insert new rows
      await tx.hero_section_media.createMany({
        data: data.map((item) => ({
          text: item.text,
          socialMediaId: item.socialMediaId,
          // Include any other fields as needed
        })),
      });
    });

    console.log("Hero section media updated successfully");
  } catch (error) {
    console.error("Error updating hero section media:", error);
    throw new Error("Failed to update hero section media");
  }
}

export async function updateHeroSection(hero: HeroSectionProps[]) {
  try {
    for (const a of hero) {
      await prisma.hero_section.update({
        where: { id: a.id },
        data: {
          subtitle: a.subtitle,
          backgroundImg: a.backgroundImg,
          title: a.title,
          description: a.description,
          buttonText: a.buttonText,
          buttonSrc: a.buttonSrc,
          action: a.action,
        },
      });
    }
    console.log("Hero section updated successfully");
    return;
  } catch (error) {
    console.error("Error updating hero section:", error);
    throw new Error("Failed to update hero section");
  }
}
