/* eslint-disable @typescript-eslint/no-unused-vars */
import avatarPlaceholder from "@/assets/avatar-placeholder.png";
import { cn } from "@/lib/utils";

interface AvatarProps {
    avatarUrl: string | null | undefined;
    size?: number;
    className?: string;
    companyName?: string;
}

function Avatar({ avatarUrl, size, className, companyName }: AvatarProps) {
    return (
        <img
            src={avatarUrl || avatarPlaceholder}
            alt={companyName || "VusalF"}
            width={size ?? 48}
            height={size ?? 48}
            className={cn("aspect-square overflow-hidden h-fit flex-none rounded-full bg-secondary object-cover ", className)}
        />
    )
}

export default Avatar