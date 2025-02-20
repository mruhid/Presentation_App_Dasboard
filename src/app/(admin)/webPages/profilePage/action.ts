"use server";

import prisma from "@/lib/prisma";
import { ProfilePageProps } from "@/lib/type";

export async function updateProfileDataFN(data: ProfilePageProps[]) {
  try {
    await prisma.$transaction(async (tx) => {
      const newIds = data.map((item) => item.id);
      await tx.profile.deleteMany({
        where: { id: { notIn: newIds } },
      });

      await Promise.all(
        data.map((item) =>
          tx.profile.upsert({
            where: { id: item.id },
            update: {
              presentation: {
                link: item.presentation.link,
                altText: item.presentation.altText,
                imageSrc: item.presentation.imageSrc,
              },
            },
            create: {
              id: item.id,
              presentation: {
                link: item.presentation.link,
                altText: item.presentation.altText,
                imageSrc: item.presentation.imageSrc,
              },
            },
          })
        )
      );
    });

    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, message: "Failed to update profile" };
  }
}
