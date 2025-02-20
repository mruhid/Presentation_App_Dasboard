import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoFormSectionProps } from "@/lib/type";
import { Loader2, } from "lucide-react";
import { useState } from "react";
import { useUpdateGoFormMutate } from "./mutation";
import { redirect } from "next/navigation";

export default function InputElements({ data }: { data: GoFormSectionProps[] }) {
    const [newData, setNewData] = useState<GoFormSectionProps[]>(data);
    const mutation = useUpdateGoFormMutate()
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



    return (
        <>
            <div className="sticky top-20 z-10 bg-secondary shadow-sm rounded-xl">
                <div className="flex justify-between items-center py-4">
                    <h1 className="p-4 mx-4 text-muted-foreground bg-card rounded-xl text-xl">Update goForms section</h1>
                    <div className="flex items-center justify-center gap-3">

                        <div className="mx-4">
                            <Button onClick={handleSave} disabled={isDisable() || !newData.length} size={'lg'}>
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
                                        {<Input type="text" id={`${item.id}-${key}`} name={key} value={String(value)} className="col-span-3 bg-secondary" onChange={(e) => handleInputChange(e, item.id, key)} autoComplete="off" />
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
