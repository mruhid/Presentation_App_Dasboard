import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WhyUsFeaturesProps, WhyUsProps } from "@/lib/type";
import { Dispatch, SetStateAction, useState } from "react";
import { useUpdateWhyUsFeature, useUpdateWhyUsTitle } from "./mutation";
import { redirect } from "next/navigation";
import { Loader2, Plus, Trash2Icon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function InputElements({ data, type }: { data: WhyUsFeaturesProps[] | WhyUsProps, type: boolean }) {
    const [newData, setNewData] = useState<WhyUsFeaturesProps[] | WhyUsProps>(data);
    const mutation = useUpdateWhyUsTitle();
    const mutation1 = useUpdateWhyUsFeature();

    const isDisable = () => {
        return newData.some((item) =>
            Object.entries(item).some(([key, value]) =>
                key !== "id" && typeof value === "string" && value.trim() === ""
            )
        );
    };

    const handleSave = async () => {
        if (!type) {
            mutation.mutate(
                newData,
                {
                    onSuccess: async () => {

                        redirect("/webPages/home/");
                    },
                    onError: (error) => {
                        console.error("Error saving data:", error);
                    },
                }
            );

            return
        }

        mutation1.mutate(
            newData,
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

    const deleteFeature = (id: number) => {
        setNewData((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <>
            <div className="sticky top-20 z-10 bg-secondary shadow-sm rounded-xl">
                <div className="flex justify-between items-center py-4">
                    <h1 className="p-4 mx-4 text-muted-foreground bg-card rounded-xl text-xl">Update whyUs section</h1>
                    <div className="flex items-center justify-center gap-3">
                        {type && <div className="mx-4">
                            <AddFeatureDialog id={newData.length ? newData[newData.length - 1].id + 1 : 1} setNewData={setNewData} />
                        </div>}
                        <div className="mx-4">
                            <Button disabled={isDisable()} onClick={handleSave} size={'lg'}>
                                {mutation.isPending || mutation1.isPending ? (
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
                                {newData.length !== 1 && <Button variant={"outline"} onClick={() => deleteFeature(item.id)} className="rounded-xl text-xl"><Trash2Icon /></Button>}
                            </div>

                            {Object.entries(item).map(([key, value]) => {
                                if (key === "id") return null;

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
                                        <Label htmlFor={`${item.id}-${key}`} className="text-left font-semibold capitalize">{key}</Label>
                                        <Input type="text" id={`${item.id}-${key}`} name={key} value={String(value)} className="col-span-3 bg-secondary" onChange={(e) => handleInputChange(e, item.id, key)} autoComplete="off" />
                                    </div>
                                );
                            })}
                        </div>
                    ))}
            </div>
        </>
    );
}

interface AddFeatureProps {
    id: number;
    setNewData: Dispatch<SetStateAction<WhyUsFeaturesProps[]>>;
}

export function AddFeatureDialog({ setNewData, id }: AddFeatureProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [feature, setFeature] = useState({
        id: id,
        title: "",
        description: "",
        image: "",
    });
    const isDisable = () => {
        const check = Object.entries(feature).some(([key, value]) =>
            key !== "id" && typeof value === "string" && value.trim() === ""
        )
        return check;
    };
    const AddFeature = () => {

        setNewData((prev) => [...prev, feature]);
        setIsOpen(false);
    }
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setIsOpen(false); // Close the dialog when it's not open
        }
    };

    const check = isDisable()
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        key: string
    ) => {
        const { value } = e.target;

        setFeature((prevHero) => {
            return { ...prevHero, [key]: value };
        });
    };
    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger>
                <Button variant={'outline'} onClick={() => setIsOpen(true)} size={'lg'}>
                    <Plus />Add Feature
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add WhyUs Feature</DialogTitle>
                    <DialogDescription>You can add new feature for home page</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex flex-col gap-4 py-4 mx-auto">
                        {Object.entries(feature).map(([key, value]) => {
                            if (key === "id") return null;

                            return (
                                <div
                                    key={`${key}`}
                                    className="grid grid-cols-4 items-center gap-4 bg-card p-4 rounded"
                                >
                                    <Label
                                        htmlFor={`${key}`}
                                        className="text-left font-semibold capitalize"
                                    >
                                        {key}
                                    </Label>
                                    <Input
                                        type="text"
                                        id={`${key}`}
                                        name={key}
                                        value={String(value)}
                                        className="col-span-3 bg-secondary"
                                        onChange={(e) => handleInputChange(e, key)}
                                        autoComplete="off"
                                    />
                                </div>
                            );
                        })}
                        <Button disabled={check} onClick={AddFeature} className="w-full">Add</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

}
