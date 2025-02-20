import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ContactPlatformsProps, ContactTitleProps, SocialMediaProps } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Plus, Trash2Icon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useUpdateContactPlatformMutation, useUpdateContactTitleMutation } from "./mutation";
import { redirect } from "next/navigation";

export default function InputElements({ data, type }: { data: ContactPlatformsProps[] | ContactTitleProps, type: boolean }) {
    const [newData, setNewData] = useState<ContactPlatformsProps[] | ContactTitleProps>(data);
    const mutationForHeader = useUpdateContactTitleMutation()
    const mutationForPlatforms = useUpdateContactPlatformMutation()
    const isDisable = () => {
        return newData.some((item) =>
            Object.entries(item).some(([key, value]) =>
                key !== "id" && typeof value === "string" && value.trim() === ""
            )
        );
    };
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: number,
        key: string
    ) => {
        const { value } = e.target;
        setNewData((prevData) => {
            if (Array.isArray(prevData)) {
                return prevData.map((item) =>
                    item.id === id ? { ...item, [key]: value } : item
                );
            } else {
                return { ...prevData, [key]: value };
            }
        });
    };

    const handleSave = async () => {
        if (!type) {
            mutationForHeader.mutate(
                newData,
                {
                    onSuccess: async () => {

                        redirect("/webPages/contactPage/");
                    },
                    onError: (error) => {
                        console.error("Error saving data:", error);
                    },
                }
            );

            return
        }

        mutationForPlatforms.mutate(
            newData,
            {
                onSuccess: async () => {

                    redirect("/webPages/contactPage/");
                },
                onError: (error) => {
                    console.error("Error saving data:", error);
                },
            }
        );
    };


    const handleInputAction = (newValue: boolean, id: number, key: string) => {
        setNewData((prevData) => {
            if (Array.isArray(prevData)) {
                return prevData.map((item) =>
                    item.id === id ? { ...item, [key]: newValue } : item
                );
            } else {
                return { ...prevData, [key]: newValue };
            }
        });
    };

    const deleteMedia = (id: number) => {
        setNewData((prev) => prev.filter((item) => item.id !== id));
    };
    const ids = Array.isArray(newData) && newData.map((a) => a.socialMediaId);


    return (
        <>
            <div className="sticky top-20 z-10 bg-secondary shadow-sm rounded-xl">
                <div className="flex justify-between items-center py-4">
                    <h1 className="p-4 mx-4 text-muted-foreground bg-card rounded-xl text-xl">Update contact page</h1>
                    <div className="flex items-center justify-center gap-3">
                        {type && <div className="mx-4">
                            <AddSocialMedia elements={newData}
                                setElements={setNewData}
                                IDS={ids} />
                        </div>}
                        <div className="mx-4">
                            <Button onClick={handleSave} disabled={isDisable() || !newData.length} size={'lg'}>
                                {mutationForHeader.isPending ||
                                    mutationForPlatforms.isPending ?
                                    (
                                        <Loader2 className="mx-auto my-3 animate-spin" />
                                    ) : (
                                        "Save"
                                    )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 py-4">
                {!newData.length && <h1 className="text-destructive">No have contact platform .You can use add buttton for this</h1>}
                {Array.isArray(newData) &&
                    newData.map((item, index) => (
                        <div key={item.id} className="border-[3px] mb-5 shadow-sm border-secondary rounded-xl">
                            <div className="flex justify-between items-center p-5">
                                <Button variant={"outline"} className="rounded-full text-xl">{index + 1}</Button>
                                {type && <Button variant={"outline"} onClick={() => deleteMedia(item.id)} className="rounded-xl text-xl"><Trash2Icon /></Button>}
                            </div>

                            {Object.entries(item).map(([key, value]) => {
                                if (key === "id") return null;
                                if (key === "socialMediaId") return null;

                                if (key === "action") {
                                    return (
                                        <div key={`${item.id}-${key}`} className="flex items-center justify-between bg-card rounded p-4">
                                            <Label htmlFor={`${item.id}-${key}`} className="text-left font-semibold capitalize">{key}</Label>
                                            <Button size="icon" variant={value ? "default" : "outline"} onClick={() => handleInputAction(!value, item.id, key)}>
                                                {value ? "✓" : ""}
                                            </Button>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={`${item.id}-${key}`} className="grid grid-cols-4 items-center gap-4 bg-card p-4 rounded">
                                        <Label htmlFor={`${item.id}-${key}`} className="text-left font-semibold capitalize">{type ? value.platform : key}</Label>
                                        {!type ? <Input type="text" id={`${item.id}-${key}`} name={key} value={String(value)} className="col-span-3 bg-secondary" onChange={(e) => handleInputChange(e, item.id, key)} autoComplete="off" /> :
                                            <Input readOnly type="text" id={`${item.id}-${key}`} name={key} value={String(value.link)} className="col-span-3 bg-secondary" />
                                        }
                                    </div>
                                );
                            })}
                        </div>
                    ))}
            </div>
        </>
    );

}
interface AddSocialMediaProps {
    IDS: number[];
    setElements: Dispatch<SetStateAction<ContactPlatformsProps[]>>;
    elements: ContactPlatformsProps[];
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
        const newElement: ContactPlatformsProps = {
            id: elements.length > 0 ? Math.max(...elements.map(e => e.id)) + 1 : 1, // Ensures unique id by taking the highest id + 1
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
                <Button variant={'outline'} onClick={() => setIsOpen(true)} size={'lg'}>
                    <Plus />Add Media
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Social Media</DialogTitle>
                    <DialogDescription>You can add new social platforms</DialogDescription>
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