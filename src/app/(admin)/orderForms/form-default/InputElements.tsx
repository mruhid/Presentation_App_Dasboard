import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrderFormsDefaultProps, } from "@/lib/type";
import { Loader2, } from "lucide-react";
import { useState } from "react";
import { useUpdateFormDefault } from "./mutation";
import { redirect } from "next/navigation";

export default function InputElements({ data }: { data: OrderFormsDefaultProps[] }) {
    const [newData, setNewData] = useState<OrderFormsDefaultProps[]>(data);
    const mutation = useUpdateFormDefault()
    const isDisable = () => {
        return newData.some((item) =>
            Object.entries(item).some(([key, value]) => {
                if (key !== "id") {
                    if (key == "wpNumber") {
                        return typeof value === "string" && value.split("//wa.me/")[1].trim() == "";
                    }
                    return typeof value === "string" && value.trim() === "";
                }
                return false;
            })
        );
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: number,
        key: string
    ) => {
        const { value } = e.target;
        setNewData((prevData) => {
            return prevData.map((item) =>
                item.id === id ? { ...item, [key]: key == "wpNumber" ? `https://wa.me/${value}` : value } : item
            );
        });
    };

    const handleSave = async () => {
        mutation.mutate(
            newData,
            {
                onSuccess: async () => {
                    redirect('/orderForms')
                },
                onError: (error) => {
                    console.error("Error saving data:", error);
                },
            }
        )

    };


    return (
        <>
            <div className="sticky top-20 z-10 bg-secondary shadow-sm rounded-xl">
                <div className="flex justify-between items-center py-4">
                    <h1 className="p-4 mx-4 text-muted-foreground bg-card rounded-xl text-xl">Update order form&apos;s default data</h1>
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

                                return (
                                    <div key={`${item.id}-${key}`} className="grid grid-cols-4 items-center gap-4 bg-card p-4 rounded">
                                        <Label htmlFor={`${item.id}-${key}`} className="text-left font-semibold capitalize">{key == "modelText" ? "Confirm Massage" : key}</Label>
                                        {<Input type="text" id={`${item.id}-${key}`} name={key} value={key !== "wpNumber" ? String(value) : String(value.split("//wa.me/")[1])} className="col-span-3 bg-secondary" onChange={(e) => handleInputChange(e, item.id, key)} autoComplete="off" />
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
