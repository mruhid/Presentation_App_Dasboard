import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialMediaProps } from "@/lib/type";
import { useState } from "react";
import SaveDataDialog from "./SaveMediasDialog";

interface InputColumnProps {
    data: SocialMediaProps[];
}

export default function InputColumn({ data }: InputColumnProps) {
    const [medias, setMedias] = useState<SocialMediaProps[]>(data);

    const handleMedias = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const { name, value } = e.target;

        // Update the medias array with the updated media
        setMedias((prevMedias) =>
            prevMedias.map((item) =>
                item.id === id ? { ...item, [name]: value } : item
            )
        );
    };

    function splitPlatform(name: string, link: string, place: boolean): string {
        if (name === "Email" && link.includes(":") && link.includes("?")) {
            const parts = link.split(":")[1]?.split("?");
            return place ? parts?.[0] || "" : parts?.[1] || "";
        }
        return link.includes(":") ? link.split(":")[1] : link;
    }

    function joinPlatform(name: string, value1: string, value2?: string) {
        if (name === "Email") {
            return `mailto:${value1}${value2 ? `?subject=${value2}` : ""}`;
        }
        if (name === "Phone") {
            return `tel:${value1}`;
        }
        return value1;
    }

    function findChangedPlatforms(
        original: SocialMediaProps[],
        updated: SocialMediaProps[]
    ) {
        const changes = updated
            .filter((updatedItem) => {
                const originalItem = original.find((item) => item.id === updatedItem.id);
                return originalItem && originalItem.link !== updatedItem.link;
            })
            .map((item) => ({ id: item.id, link: item.link }));

        // Check for any empty or invalid links
        const hasInvalidLinks = updated.some((item) => item.link.trim() === "");

        if (hasInvalidLinks) {
            return false;
        }

        return changes.length > 0 ? changes : false;
    }

    const check = findChangedPlatforms(data, medias);

    return (
        <div className="py-4">
            <div className="flex flex-wrap gap-8 p-5 justify-start items-center">
                {medias.map((mediaItem) => (
                    <div
                        key={mediaItem.id}
                        className="flex flex-wrap bg-secondary rounded items-center gap-4 sm:flex-nowrap"
                    >
                        <Label
                            htmlFor={mediaItem.platform}
                            className="text-left font-semibold capitalize p-6"
                        >
                            {mediaItem.platform}
                        </Label>
                        {mediaItem.platform === "Email" || mediaItem.platform === "Phone" ? (
                            <>
                                <Input
                                    type="text"
                                    id={String(mediaItem.id)}
                                    name="link"
                                    value={splitPlatform(mediaItem.platform, mediaItem.link, true)}
                                    className="min-w-40 p-6"
                                    autoComplete="off"
                                    onChange={(e) =>
                                        handleMedias(
                                            {
                                                target: {
                                                    name: "link",
                                                    value: joinPlatform(
                                                        mediaItem.platform,
                                                        e.target.value,
                                                        splitPlatform(
                                                            mediaItem.platform,
                                                            mediaItem.link,
                                                            false
                                                        )
                                                    ),
                                                },
                                            } as React.ChangeEvent<HTMLInputElement>,
                                            mediaItem.id
                                        )
                                    }
                                />
                                {mediaItem.platform === "Email" && (
                                    <Input
                                        type="text"
                                        id={`subject-${mediaItem.id}`}
                                        name="link"
                                        value={splitPlatform(
                                            mediaItem.platform,
                                            mediaItem.link,
                                            false
                                        ).split("=")[1]}
                                        className="min-w-40 p-6"
                                        autoComplete="off"
                                        onChange={(e) =>
                                            handleMedias(
                                                {
                                                    target: {
                                                        name: "link",
                                                        value: joinPlatform(
                                                            mediaItem.platform,
                                                            splitPlatform(
                                                                mediaItem.platform,
                                                                mediaItem.link,
                                                                true
                                                            ),
                                                            e.target.value
                                                        ),
                                                    },
                                                } as React.ChangeEvent<HTMLInputElement>,
                                                mediaItem.id
                                            )
                                        }
                                    />
                                )}
                            </>
                        ) : (
                            <Input
                                type="text"
                                id={String(mediaItem.id)}
                                name="link"
                                value={mediaItem.link}
                                className="min-w-40 p-6"
                                autoComplete="off"
                                onChange={(e) => handleMedias(e, mediaItem.id)}
                            />
                        )}
                    </div>
                ))}
            </div>
            <div className="flex justify-end">
                <div>
                    <SaveDataDialog updates={check ? check : []} action={!check} />
                </div>
            </div>
        </div>
    );
}
