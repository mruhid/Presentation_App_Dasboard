import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { SocialMediaProps } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Trash2 } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useUpdateHeroSocialMedia } from "./mutation";
import { redirect } from "next/navigation";

interface SocialLink {
    id: number;
    platform: string;
    iconClass: string;
    link: string;
}

interface HeroSectionMedia {
    id: number;
    text: string;
    socialMediaId: number;
    social_links: SocialLink;
}

interface SocialMediaElementsProps {
    elements: HeroSectionMedia[];
    setElements: Dispatch<SetStateAction<HeroSectionMedia[]>>;
}

export default function SocialMediaElements({ elements, setElements }: SocialMediaElementsProps) {
    const ids = elements.map((a) => a.socialMediaId);
    const mutation = useUpdateHeroSocialMedia()

    const { toast } = useToast()
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const { value } = e.target
        setElements((prev) =>
            prev.map((element) =>
                element.id == id ? { ...element, text: value } :
                    element
            )
        )
    }
    const removeElement = (id: number) => {
        const check = elements.find((f) => f.id == id)
        if (!check) {
            toast({
                description: "Something went wrong .Can not remove items",
                variant: "destructive"
            })
            return

        }

        setElements((prev) =>
            prev.filter((f) => f.id !== id)
        )
    }
    const haveDisabledButton = () => {
        return elements.some((element) => element.text.trim() === "");
    };

    const data = elements
    const isDisabled = haveDisabledButton()

    const handleSave = async () => {
        mutation.mutate(
            data,
            {
                onSuccess: async () => {

                    redirect("/webPages/home/");
                },
                onError: (error) => {
                    console.error("Error saving data:", error);
                },
            }
        );
    };

    return (
        <div className="flex flex-col gap-4 py-4">
            <AddSocialMedia setElements={setElements} elements={elements} IDS={ids} />
            {elements.length ? elements.map((element) => (
                <div key={element.id} className="grid bg-secondary rounded grid-cols-4 items-center gap-4">
                    <Label
                        htmlFor={`social-media-${element.socialMediaId}`}
                        className="text-left font-semibold capitalize p-6"
                    >
                        {element.social_links.platform}
                    </Label>
                    <div className="col-span-3 flex items-center gap-4">
                        <Input
                            type="text"
                            id={`social-media-${element.socialMediaId}`}
                            name={element.social_links.platform}
                            value={element.text}
                            className="p-6 flex-grow"
                            autoComplete="off"
                            onChange={(e) => handleInput(e, element.id)}
                        />
                        <Trash2 onClick={() => removeElement(element.id)} className="mr-8 rounded size-8 hover:text-destructive " />
                    </div>
                </div>

            )) :
                <h1>No social media here.Use add button for social links</h1>
            }
            <Button disabled={isDisabled} onClick={handleSave} className="w-full">

                {mutation.isPending ? (
                    <Loader2 className="mx-auto my-3 animate-spin" />
                ) : (
                    "Save"
                )}

            </Button>
        </div>
    );
}

interface AddSocialMediaProps {
    IDS: number[];
    setElements: Dispatch<SetStateAction<HeroSectionMedia[]>>;
    elements: HeroSectionMedia[];
}

export function AddSocialMedia({ IDS, setElements, elements }: AddSocialMediaProps) {
    const [isOpen, setIsOpen] = useState(false);

    const { data: socialMediaData, isFetching, isLoading, error } = useQuery({
        queryKey: ["social-medias"],
        queryFn: () => Promise.resolve(socialMediaData),
        staleTime: Infinity,
    });
    if (isLoading || isFetching) {
        return


    }

    if (error) {
        return


    }

    const filteredMedia = socialMediaData?.filter((media) => !IDS.includes(media.id));

    const handleMedia = (media: SocialMediaProps) => {
        const newElement: HeroSectionMedia = {
            id: elements.length > 0 ? Math.max(...elements.map(e => e.id)) + 1 : 1, // Ensures unique id by taking the highest id + 1
            text: "Sifariş ver",
            socialMediaId: media.id,
            social_links: {
                id: media.id,
                platform: media.platform,
                iconClass: media.iconClass,
                link: media.link,
            },
        };
        setElements([...elements, newElement]);
        setIsOpen(false); // Close dialog after adding the media
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setIsOpen(false); // Close the dialog when it's not open
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger>
                <Button disabled={elements.length >= 2} className="w-full" onClick={() => setIsOpen(true)} variant={"outline"}>
                    Add social media
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Social Media</DialogTitle>
                    <DialogDescription>You can add new social media for hero</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex flex-wrap justify-center items-center gap-5">
                        {filteredMedia?.map((media) => (
                            <Button key={media.id} onClick={() => handleMedia(media)} size="lg">
                                {media.platform}
                            </Button>
                        ))}
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
