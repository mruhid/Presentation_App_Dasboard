import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OperationsProps, OperationTitleProps } from "@/lib/type";
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react";
import { useState } from "react";
import { useUpdateOperations, useUpdateOperationTitle } from "./mutation";
import { redirect, useRouter } from "next/navigation";

export default function InputElements({ data }: { data: OperationsProps | OperationTitleProps }) {
    const [newData, setNewData] = useState<OperationsProps | OperationTitleProps>(data);
    const mutation = useUpdateOperationTitle()
    const mutation1 = useUpdateOperations()
    const router = useRouter();

    const isDisable = () => {
        return newData.some((item) =>
            Object.entries(item).some(([key, value]) =>
                key !== "id" && typeof value === "string" && value.trim() === ""
            )
        );
    };

    const handleSave = async () => {
        if (data.length == 1) {
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

                    router.push("/webPages/home/");
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
    const handleInputAction = (newValue: boolean, id: number, key: string) => {
        setNewData((prevHero) => {
            if (Array.isArray(prevHero)) {
                // Update array item by ID and key
                return prevHero.map((item) =>
                    item.id === id ? { ...item, [key]: newValue } : item
                );
            } else {
                // Update object key directly
                return { ...prevHero, [key]: newValue };
            }
        });
    };

    const handlePlace = (value: number, direction: number, id: number, key: string) => {
        setNewData((prevHero) => {
            if (Array.isArray(prevHero)) {
                const updatedData = prevHero.map((item) => {
                    if (item.id === id) {
                        // Increase or decrease the selected item's place value
                        return { ...item, [key]: value + direction };
                    } else if (item[key] === value + direction) {
                        // Find the adjacent item and swap place values
                        return { ...item, [key]: value };
                    }
                    return item;
                });

                // Delay scrolling to allow UI updates
                setTimeout(() => {
                    const targetElement = document.getElementById(`item-${id}`);
                    if (targetElement) {
                        const headerOffset = 230; // Adjusting for header height
                        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                        const offsetPosition = elementPosition - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });


                    }
                }, 200);

                return updatedData;
            } else {
                return { ...prevHero, [key]: value + direction };
            }
        });
    };

    return (
        <>
            <div className="sticky top-20 z-10 bg-secondary shadow-sm rounded-xl  ">
                <div className="flex justify-between items-center py-4">
                    <h1 className="p-4 mx-4 text-muted-foreground bg-card rounded-xl text-xl">Update opration section</h1>
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
                    newData.sort((a, b) => a.place - b.place).map((item, index) => (
                        <div key={item.id}
                            id={`item-${item.id}`}  // Add this line
                            className="border-[3px] mb-5 shadow-sm border-secondary rounded-xl">
                            <div className="flex justify-start items-center p-5">
                                <Button variant={"outline"} className="rounded-full text-xl">{index + 1}</Button>
                            </div>
                            {Object.entries(item).map(([key, value]) => {
                                if (key === "id") return null; // Skip rendering the 'id' field
                                if (key == "place") {
                                    return (
                                        <div
                                            key={`${item.id}-${key}`}
                                            className="flex items-center justify-between bg-card rounded p-4"
                                        >
                                            <Label
                                                htmlFor={`${item.id}-${key}`}
                                                className="text-left font-semibold capitalize"
                                            >
                                                {key}
                                            </Label>

                                            <div className="flex-col">
                                                <div className="my-2">
                                                    <Button size={'icon'} onClick={() => handlePlace(item.place, -1, item.id, key)} disabled={index === 0} variant={"outline"}>
                                                        <ArrowUp className="hover:text-primary" />
                                                    </Button>
                                                </div>
                                                <div className="my-2">
                                                    <Button size={"icon"} onClick={() => handlePlace(item.place, 1, item.id, key)} disabled={index === newData.length - 1} variant={"outline"}>
                                                        <ArrowDown className="hover:text-primary " />
                                                    </Button>
                                                </div>
                                            </div>

                                        </div>
                                    )


                                }

                                if (key === "action") {
                                    return (
                                        newData.length == 1 && <div
                                            key={`${item.id}-${key}`}
                                            className="flex items-center justify-between bg-card rounded p-4"
                                        >
                                            <Label
                                                htmlFor={`${item.id}-${key}`}
                                                className="text-left font-semibold capitalize"
                                            >
                                                {key}
                                            </Label>
                                            <Button
                                                size="icon"
                                                variant={value ? "default" : "outline"}
                                                onClick={() => handleInputAction(!value, item.id, key)}
                                            >
                                                {value ? "✓" : ""}
                                            </Button>
                                        </div>
                                    );
                                }

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
