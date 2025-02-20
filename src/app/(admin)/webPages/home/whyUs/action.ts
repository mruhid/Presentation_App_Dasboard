"use server";

import prisma from "@/lib/prisma";
import { WhyUsFeaturesProps, WhyUsProps } from "@/lib/type";

export async function updateWhyUsTitle(data: WhyUsProps[]) {
  try {
    for (const a of data) {
      await prisma.whyUsSection.update({
        where: { id: a.id },
        data: {
          title: a.title,
          action: a.action,
        },
      });
    }
    console.log("WhyUs section updated successfully");
    return;
  } catch (error) {
    console.error("Error updating WhyUs section:", error);
    throw new Error("Failed to update WhyUs section");
  }
}
export async function updateWhyUsFeature(data: WhyUsFeaturesProps[]) {
  try {
    const existingCount = await prisma.whyUsFeatures.count();
    const dataCount = data.length;

    if (dataCount === existingCount) {
      // Update all existing rows
      for (const a of data) {
        await prisma.whyUsFeatures.update({
          where: { id: a.id },
          data: {
            title: a.title,
            description: a.description,
            image: a.image,
          },
        });
      }
    } else if (dataCount > existingCount) {
      // Update existing rows first
      for (let i = 0; i < existingCount; i++) {
        await prisma.whyUsFeatures.update({
          where: { id: data[i].id },
          data: {
            title: data[i].title,
            description: data[i].description,
            image: data[i].image,
          },
        });
      }
      // Add new rows
      const newEntries = data.slice(existingCount);
      await prisma.whyUsFeatures.createMany({ data: newEntries });
    } else {
      // Update existing rows up to the new length
      for (let i = 0; i < dataCount; i++) {
        await prisma.whyUsFeatures.update({
          where: { id: data[i].id },
          data: {
            title: data[i].title,
            description: data[i].description,
            image: data[i].image,
          },
        });
      }
      // Delete excess rows
      const excessIds = await prisma.whyUsFeatures.findMany({
        select: { id: true },
        skip: dataCount,
      });
      await prisma.whyUsFeatures.deleteMany({
        where: {
          id: {
            in: excessIds.map((item) => item.id),
          },
        },
      });
    }

    console.log("why us section updated successfully");
    return;
  } catch (error) {
    console.error("Error updating whyUs section:", error);
    throw new Error("Failed to update whyUs section");
  }
}
