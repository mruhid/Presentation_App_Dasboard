"use server";

import prisma from "@/lib/prisma";
import { FollowUsMediaProps, FollowUsProps } from "@/lib/type";

export async function updateFollowUsTitle(data: FollowUsProps[]) {
  try {
    for (const a of data) {
      await prisma.social_section.update({
        where: { id: a.id },
        data: {
          title: a.title,
          action: a.action,
        },
      });
    }
    console.log("FollowUs section updated successfully");
    return;
  } catch (error) {
    console.error("Error updating followUs section:", error);
    throw new Error("Failed to update followUs section");
  }
}
export async function updateFollowUsMedia(data: FollowUsMediaProps[]) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    throw new Error('Invalid input: "data" must be a non-empty array.');
  }

  try {
    const existingRecords = await prisma.social_section_media.findMany({
      select: { id: true },
    });

    const existingCount = existingRecords.length;
    const dataCount = data.length;

    if (dataCount === existingCount) {
      // Update all existing rows
      await Promise.all(
        data.map((a) =>
          prisma.social_section_media.update({
            where: { id: a.id },
            data: {
              socialMediaId: a.socialMediaId,
            },
          })
        )
      );
    } else if (dataCount > existingCount) {
      // Update existing rows first
      await Promise.all(
        data.slice(0, existingCount).map((a) =>
          prisma.social_section_media.update({
            where: { id: a.id },
            data: {
              socialMediaId: a.socialMediaId,
            },
          })
        )
      );

      // Add new rows
      const newEntries = data.slice(existingCount).map((entry) => ({
        socialMediaId: entry.socialMediaId,
      }));

      await prisma.social_section_media.createMany({ data: newEntries });
    } else {
      // Update existing rows up to the new length
      await Promise.all(
        data.map((a) =>
          prisma.social_section_media.update({
            where: { id: a.id },
            data: {
              socialMediaId: a.socialMediaId,
            },
          })
        )
      );

      // Delete excess rows
      const excessIds = existingRecords.slice(dataCount).map((item) => item.id);
      await prisma.social_section_media.deleteMany({
        where: {
          id: { in: excessIds },
        },
      });
    }

    console.log("Follow us section updated successfully");
  } catch (error) {
    console.error("Error updating followUs section:", error);
    throw new Error("Failed to update followUs section");
  }
}
