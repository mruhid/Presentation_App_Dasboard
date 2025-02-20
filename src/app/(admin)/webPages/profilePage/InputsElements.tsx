import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Presentation, ProfilePageProps } from "@/lib/type";
import { Dispatch, SetStateAction, useState } from "react";
import { Loader2, Plus, Trash2Icon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useUpdateProfileMutation } from "./mutation";
import { redirect } from "next/navigation";

export default function InputElements({ data }: { data: ProfilePageProps[] }) {
    const [newData, setNewData] = useState<ProfilePageProps[]>(data);
    const mutation = useUpdateProfileMutation()

    const isDisable = () => {
        return newData.some((item) =>
            Object.entries(item.presentation).some(([key, value]) =>
                key !== "id" && typeof value === "string" && value.trim() === ""
            )
        );
    };

    const handleSave = async () => {
        mutation.mutate(
            newData,
            {
                onSuccess: async () => {

                    redirect("/webPages");
                },
                onError: (error) => {
                    console.error("Error saving data:", error);
                },
            }
        );
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: number,
        key: keyof Presentation
    ) => {
        const { value } = e.target;

        setNewData((prevData) => {
            return prevData.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        presentation: {
                            ...item.presentation,
                            [key]: value,
                        },
                    }
                    : item
            );
        });
    };



    const deleteFeature = (id: number) => {
        setNewData((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <>
            <div className="sticky top-20 z-10 bg-secondary shadow-sm rounded-xl">
                <div className="flex justify-between items-center py-4">
                    <h1 className="p-4 mx-4 text-muted-foreground bg-card rounded-xl text-xl">Update profile page</h1>
                    <div className="flex items-center justify-center gap-3">
                        <div className="mx-4">
                            <AddFeatureDialog id={newData.length ? newData[newData.length - 1].id + 1 : 1} setNewData={setNewData} />
                        </div>
                        <div className="mx-4">
                            <Button disabled={isDisable()} onClick={handleSave} size={'lg'}>
                                {mutation.isPending ? (
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
                {Array.isArray(newData) &&
                    newData.map((item, index) => (
                        <div key={item.id} className="border-[3px] mb-5 shadow-sm border-secondary rounded-xl">
                            <div className="flex justify-between items-center p-5">
                                <Button variant={"outline"} className="rounded-full text-xl">{index + 1}</Button>
                                {<Button variant={"outline"} onClick={() => deleteFeature(item.id)} className="rounded-xl text-xl"><Trash2Icon /></Button>}
                            </div>

                            {Object.entries(item.presentation).map(([key, value]) => {
                                if (key === "id") return null;


                                return (
                                    <div key={`${item.id}-${key}`} className="grid grid-cols-4 items-center gap-4 bg-card p-4 rounded">
                                        <Label htmlFor={`${item.id}-${key}`} className="text-left font-semibold capitalize">{key}</Label>
                                        <Input type="text" id={`${item.id}-${key}`} name={key} value={String(value)} className="col-span-3 bg-secondary" onChange={(e) => handleInputChange(e, item.id, key)} autoComplete="off" />
                                    </div>
                                );
                            })}
                        </div>
                    ))}

                {!newData.length && <h1 className="text-xl text-destructive">No have presentation here.You can click to add button for adding new presentation</h1>}
            </div>
        </>
    );
}

interface AddFeatureProps {
    id: number;
    setNewData: Dispatch<SetStateAction<ProfilePageProps[]>>;
}

export function AddFeatureDialog({ setNewData, id }: AddFeatureProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [feature, setFeature] = useState<ProfilePageProps>({
        id: id, // Default ID
        presentation: {
            link: "",
            altText: "",
            imageSrc: "",
        },
    });

    // Check if any presentation field is empty
    const isDisable = () => {
        return Object.values(feature.presentation).some(value => value.trim() === "");
    };

    // Add new feature to the list
    const AddFeature = () => {
        setNewData(prev => [...prev, feature]);
        setIsOpen(false);
    };

    // Handle dialog open/close
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setIsOpen(false);
        }
    };

    // Handle input change inside the presentation object
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        key: keyof Presentation
    ) => {
        const { value } = e.target;
        setFeature(prev => ({
            ...prev,
            presentation: { ...prev.presentation, [key]: value },
        }));
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger>
                <Button variant="outline" onClick={() => setIsOpen(true)} size="lg">
                    <Plus /> Add Presentation
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new presentation</DialogTitle>
                    <DialogDescription>You can add a new file for the profile page.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex flex-col gap-4 py-4 mx-auto">
                        {Object.entries(feature.presentation).map(([key, value]) => (
                            <div key={key} className="grid grid-cols-4 items-center gap-4 bg-card p-4 rounded">
                                <Label htmlFor={key} className="text-left font-semibold capitalize">
                                    {key}
                                </Label>
                                <Input
                                    type="text"
                                    id={key}
                                    name={key}
                                    value={value}
                                    className="col-span-3 bg-secondary"
                                    onChange={e => handleInputChange(e, key as keyof Presentation)}
                                    autoComplete="off"
                                />
                            </div>
                        ))}
                        <Button disabled={isDisable()} onClick={AddFeature} className="w-full">
                            Add
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
