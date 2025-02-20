"use server";
import prisma from "@/lib/prisma"; // Assuming you have Prisma set up
import { SocialMediaProps } from "@/lib/type";

export async function updateSocialMediaLinks(updates: SocialMediaProps[]) {
  try {
    // Check if updates are in the correct format
    if (!Array.isArray(updates)) {
      throw new Error("Updates must be an array of SocialMediaProps.");
    }

    // Perform database updates
    const updatePromises = updates.map((item) =>
      prisma.social_links.update({
        where: { id: item.id },
        data: { link: item.link },
      })
    );

    // Wait for all updates to complete
    await Promise.all(updatePromises);

    return { message: "Social media links updated successfully." };
  } catch (error) {
    console.error("Error updating social media links:", error);
    throw new Error("Failed to update social media links.");
  }
}
