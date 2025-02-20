import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDate, formatDistanceToNowStrict } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeDate(from: string): string {
  const fromDate = new Date(from); // Parse the string into a Date object
  const currentDate = new Date();

  if (currentDate.getTime() - fromDate.getTime() < 1000 * 60 * 60 * 24) {
    // If within 24 hours, show relative time
    return formatDistanceToNowStrict(fromDate, { addSuffix: true });
  } else {
    if (currentDate.getFullYear() === fromDate.getFullYear()) {
      // If within the same year, show month and day
      return formatDate(fromDate, "MMM d");
    } else {
      // Otherwise, show full date with year
      return formatDate(fromDate, "MMM d yyyy");
    }
  }
}

export function formatNumber(n: number): string {
  return Intl.NumberFormat("en-Us", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}
