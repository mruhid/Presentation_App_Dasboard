"use server";

import prisma from "@/lib/prisma";
import { ContactPlatformsProps, ContactTitleProps } from "@/lib/type";

export async function updateContactPageHeaderFN(data: ContactTitleProps[]) {
  try {
    for (const a of data) {
      await prisma.contact_page.update({
        where: { id: a.id },
        data: {
          header: a.header,
          description: a.description,
          action: a.action,
        },
      });
    }
    console.log("Contact page title updated successfully");
    return;
  } catch (error) {
    console.error("Error updating contact page title:", error);
    throw new Error("Failed to update contact page title");
  }
}
export async function updateContactPagePlatformsFN(
  data: ContactPlatformsProps[]
) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    throw new Error('Invalid input: "data" must be a non-empty array.');
  }

  try {
    const existingRecords = await prisma.contact_page_social_media.findMany({
      select: { id: true },
    });

    const existingCount = existingRecords.length;
    const dataCount = data.length;

    if (dataCount === existingCount) {
      // Update all existing rows
      await Promise.all(
        data.map((a) =>
          prisma.contact_page_social_media.update({
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
          prisma.contact_page_social_media.update({
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

      await prisma.contact_page_social_media.createMany({ data: newEntries });
    } else {
      // Update existing rows up to the new length
      await Promise.all(
        data.map((a) =>
          prisma.contact_page_social_media.update({
            where: { id: a.id },
            data: {
              socialMediaId: a.socialMediaId,
            },
          })
        )
      );

      // Delete excess rows
      const excessIds = existingRecords.slice(dataCount).map((item) => item.id);
      await prisma.contact_page_social_media.deleteMany({
        where: {
          id: { in: excessIds },
        },
      });
    }

    console.log("Contact page platforms updated successfully");
  } catch (error) {
    console.error("Error updating contact page platforms:", error);
    throw new Error("Failed to update contact page platforms");
  }
}
