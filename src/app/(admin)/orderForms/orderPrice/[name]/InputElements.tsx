import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrderFormsPriceProps } from "@/lib/type";
import { Loader2, } from "lucide-react";
import { useState } from "react";
import { useUpdateFormsPriceMutation } from "./mutation";
import { redirect } from "next/navigation";

export default function InputElements({ data }: { data: OrderFormsPriceProps[] }) {
    const [newData, setNewData] = useState<OrderFormsPriceProps[]>(data);
    const mutation = useUpdateFormsPriceMutation()
    const isDisable = () => {
        return newData.some((item) =>
            Object.entries(item.price).some(([key, value]) => {
                // Check if a direct price value (e.g., pages) is 0 or not a number
                if (typeof value !== "object") {
                    return value === 0 || isNaN(value);
                }

                // Check if nested object (e.g., quality, language, xidmetMuddeti) has 0 or non-numeric values
                return Object.values(value).some((oValue) => oValue === 0 || isNaN(oValue));
            })
        );
    };




    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: number,
        key: string
    ) => {
        const value = Number(e.target.value); // Convert string to number

        setNewData((prevData) => {
            if (Array.isArray(prevData)) {
                return prevData.map((item) =>
                    item.id === id ? { ...item, price: { ...item.price, [key]: value } } : item
                );
            } else {
                return { ...prevData, [key]: value };
            }
        });
    };

    const handleOptionalInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: number,
        key: string,
        Okey: string
    ) => {
        const value = Number(e.target.value); // Convert input value to a number

        setNewData((prevData) => {
            if (Array.isArray(prevData)) {
                return prevData.map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            price: {
                                ...item.price,
                                [key]: {
                                    ...(item.price[key] || {}), // Ensure existing object is preserved
                                    [Okey]: value,
                                },
                            },
                        }
                        : item
                );
            }
            return prevData;
        });
    };


    const handleSave = async () => {
        mutation.mutate(
            newData,
            {
                onSuccess: async () => {
                    redirect('/orderForms/orderPrice')
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
                    <h1 className="p-4 mx-4 text-muted-foreground bg-card rounded-xl text-xl">Update order price</h1>
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
                                <Button variant={"outline"} className="rounded-xl text-xl capitalize">{item.type}</Button>
                            </div>


                            {Object.entries(item.price).map(([key, value]) => {
                                if (key === "id") return null;

                                return (
                                    <div key={`${item.id}-${key}`} className="grid grid-cols-1 items-center gap-4 bg-card p-4 rounded">
                                        <div className="grid p-3 gap-4 border-[3px] shadow-sm border-secondary rounded-xl">
                                            <Label htmlFor={`${item.id}-${key}`} className="text-left font-semibold capitalize">{key}</Label>

                                            {typeof value !== "object" ? (
                                                <Input
                                                    type="text"
                                                    id={`${item.id}-${key}`}
                                                    name={key}
                                                    value={value ? String(value) : ""}
                                                    className="col-span-3 bg-secondary"
                                                    onChange={(e) => handleInputChange(e, item.id, key)}
                                                    autoComplete="off"
                                                />
                                            ) : (
                                                Object.entries(value).map(([oKey, oValue]) => (
                                                    <div key={`${item.id}-${key}-${oKey}`} className="flex flex-col gap-2">
                                                        <Label htmlFor={`${item.id}-${key}-${oKey}`} className="text-left font-semibold capitalize">{oKey}</Label>
                                                        <Input
                                                            type="text"
                                                            id={`${item.id}-${key}-${oKey}`}
                                                            name={oKey}
                                                            value={oValue ? String(oValue) : ""}
                                                            className="bg-secondary"
                                                            autoComplete="off"
                                                            onChange={(e) => handleOptionalInputChange(e, item.id, key, oKey)}
                                                        />
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    ))}


            </div>
        </>
    );

}
