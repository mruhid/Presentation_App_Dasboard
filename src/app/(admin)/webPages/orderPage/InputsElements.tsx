import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DocumentSelectionOrdersProps, DocumentSelectionTitleProps } from "@/lib/type";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useUpdateOrderPageForms, useUpdateOrderPageTitle } from "./mutation";
import { redirect } from "next/navigation";

export default function InputElements({ data }: { data: DocumentSelectionOrdersProps | DocumentSelectionTitleProps }) {
    const [newData, setNewData] = useState<DocumentSelectionTitleProps | DocumentSelectionOrdersProps>(data);
    const mutation = useUpdateOrderPageTitle()
    const mutation1 = useUpdateOrderPageForms()
    const isDisable = () => {
        return newData.some((item) =>
            Object.entries(item).some(([key, value]) =>
                key !== "id" && key !== "description" && typeof value === "string" && value.trim() === ""
            )
        );
    };

    const handleSave = async () => {
        if (data.length == 1) {
            mutation.mutate(
                newData,
                {
                    onSuccess: async () => {

                        redirect("/webPages/");
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

                    redirect("/webPages/");
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

        setNewData((prevHero) => {
            if (Array.isArray(prevHero)) {
                // Update array item by ID and key
                return prevHero.map((item) =>
                    item.id === id ? { ...item, [key]: value } : item
                );
            } else {
                // Update object key directly
                return { ...prevHero, [key]: value };
            }
        });
    };

    return (
        <>
            <div className="sticky top-20 z-10 bg-secondary shadow-sm rounded-xl  ">
                <div className="flex justify-between items-center py-4">
                    <h1 className="p-4 mx-4 text-muted-foreground bg-card rounded-xl text-xl">Update orders section</h1>
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
            <div className="flex flex-col gap-4 py-4">
                {Array.isArray(newData) &&
                    newData.map((item, index) => (
                        <div key={item.id}
                            id={`item-${item.id}`}  // Add this line
                            className="border-[3px] mb-5 shadow-sm border-secondary rounded-xl">
                            <div className="flex justify-start items-center p-5">
                                <Button variant={"outline"} className="rounded-full text-xl">{index + 1}</Button>
                            </div>
                            {Object.entries(item).map(([key, value]) => {
                                if (key === "id") return null; // Skip rendering the 'id' field


                                return (
                                    <div
                                        key={`${item.id}-${key}`}
                                        className="grid grid-cols-4 items-center gap-4 bg-card p-4 rounded"
                                    >
                                        <Label
                                            htmlFor={`${item.id}-${key}`}
                                            className="text-left font-semibold capitalize"
                                        >
                                            {key}
                                        </Label>
                                        <Input
                                            type="text"
                                            id={`${item.id}-${key}`}
                                            name={key}
                                            value={String(value)}
                                            className="col-span-3 bg-secondary"
                                            onChange={(e) => handleInputChange(e, item.id, key)}
                                            autoComplete="off"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ))}
            </div>
        </>
    );
}
