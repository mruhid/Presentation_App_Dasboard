"use server";

import prisma from "@/lib/prisma";
import { FooterSocialMediaProps, FooterTextProps } from "@/lib/type";

export async function updateFooterTextFN(data: FooterTextProps[]) {
  try {
    for (const a of data) {
      await prisma.footer.update({
        where: { id: a.id },
        data: {
          heading: a.heading,
          logoImg: a.logoImg,
          copyright: a.copyright,
          search_tools: a.search_tools,
        },
      });
    }
    console.log("Footer side text updated successfully");
    return;
  } catch (error) {
    console.error("Error updating footer side text:", error);
    throw new Error("Failed to update footer side text");
  }
}
export async function updateFooterSidePlatformsFN(
  data: FooterSocialMediaProps[]
) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    throw new Error('Invalid input: "data" must be a non-empty array.');
  }

  try {
    const existingRecords = await prisma.footer_social_media.findMany({
      select: { id: true },
    });

    const existingCount = existingRecords.length;
    const dataCount = data.length;

    if (dataCount === existingCount) {
      // Update all existing rows
      await Promise.all(
        data.map((a) =>
          prisma.footer_social_media.update({
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
          prisma.footer_social_media.update({
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

      await prisma.footer_social_media.createMany({ data: newEntries });
    } else {
      // Update existing rows up to the new length
      await Promise.all(
        data.map((a) =>
          prisma.footer_social_media.update({
            where: { id: a.id },
            data: {
              socialMediaId: a.socialMediaId,
            },
          })
        )
      );

      // Delete excess rows
      const excessIds = existingRecords.slice(dataCount).map((item) => item.id);
      await prisma.footer_social_media.deleteMany({
        where: {
          id: { in: excessIds },
        },
      });
    }

    console.log("Footer side platforms updated successfully");
  } catch (error) {
    console.error("Error updating footer side platforms:", error);
    throw new Error("Failed to update footer side platforms");
  }
}
