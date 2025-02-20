import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrderFormsDataProps } from "@/lib/type";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useUpdateOrderFormsDataMutation } from "./mutation";

export default function InputElements({ data, tabName }: { data: OrderFormsDataProps, tabName: string }) {
    const [newData, setNewData] = useState<OrderFormsDataProps>(data);

    const mutation = useUpdateOrderFormsDataMutation()
    // Input changes handler FNS
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        fieldId: string
    ) => {
        const { value } = e.target;
        setNewData((prevData) => ({
            ...prevData,
            data: prevData.data.map((field) =>
                field.id === fieldId ? { ...field, placeholder: value } : field
            ),
        }));
    };
    const handleOptionsChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        fieldId: string,
        optionIndex: number
    ) => {
        const { value } = e.target;

        setNewData((prevData) => ({
            ...prevData,
            data: prevData.data.map((field) =>
                field.id === fieldId
                    ? {
                        ...field,
                        options: field.options.map((opt, index) =>
                            index === optionIndex ? { ...opt, text: value } : opt
                        ),
                    }
                    : field
            ),
        }));
    };
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setNewData((prevData) => ({
            ...prevData,
            title: value, // Allow an empty string without conditions
        }));
    };
    const handleSave = async () => {
        mutation.mutate(
            newData,
            {
                onSuccess: async () => {

                    redirect("/orderForms/formsData");
                },
                onError: (error) => {
                    console.error("Error saving data:", error);
                },
            }
        );

    }



    // ----
    const isDisabled = () => {
        return newData.data.some((field) =>
            Object.entries(field).some(([key, value]) =>
                key !== "id" &&
                ((typeof value === "string" && value.trim() === "") ||
                    (Array.isArray(value) && value.some(option => option.text.trim() === "")))
            )
        ) || newData.title.trim() === "";
    };


    return (
        <>
            <div className="sticky top-20 z-10 bg-secondary shadow-sm rounded-xl">
                <div className="flex justify-between items-center py-4">
                    <h1 className="p-4 mx-4 text-muted-foreground bg-card rounded-xl text-xl">
                        Update forms data
                    </h1>
                    <div className="flex items-center justify-center gap-3">
                        <div className="mx-4">
                            <Button onClick={handleSave} disabled={isDisabled()} size="lg">
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
                {tabName == "data" && newData.data.filter((f) => f.placeholder !== null && f.options == null).map((field) => (
                    <div key={field.id} className="border-[3px] shadow-sm border-secondary rounded-xl p-5">
                        <div className="flex justify-between items-center mb-4">
                            <Button variant="outline" className="rounded-full text-xl">
                                {field.id}
                            </Button>
                        </div>

                        {tabName == "data" && field.placeholder !== null && !field.options && (
                            <div className="grid grid-cols-4 items-center gap-4 bg-card p-4 rounded">
                                <Label htmlFor={field.id} className="text-left font-semibold capitalize">
                                    {field.label}
                                </Label>
                                <Input
                                    type="text"
                                    id={field.id}
                                    name={field.id}
                                    value={field.placeholder ?? ""}
                                    className="col-span-3 bg-secondary"
                                    onChange={(e) => handleInputChange(e, field.id)}
                                    autoComplete="off"
                                />
                            </div>
                        )}


                    </div>
                ))}
                {tabName == "options" && newData.data.filter((f) => f.placeholder == null && f.options !== null).map((field) => (
                    <div key={field.id} className="border-[3px] shadow-sm border-secondary rounded-xl p-5">
                        <div className="flex justify-between items-center mb-4">
                            <Button variant="outline" className="rounded-full text-xl">
                                {field.id}
                            </Button>
                        </div>

                        {tabName === "options" && field.options && (
                            <div className="bg-card p-4 rounded">
                                <Label className="text-left font-semibold capitalize block mb-2">
                                    {field.label}
                                </Label>
                                <div className="grid grid-cols-1 gap-4">
                                    {field.options.map((option, index) => (
                                        <div key={option.value} className="flex flex-col gap-2">
                                            <Input
                                                type="text"
                                                id={option.value}
                                                name={option.value}
                                                value={option.text}
                                                className="bg-secondary"
                                                onChange={(e) => handleOptionsChange(e, field.id, index)}
                                                autoComplete="off"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {tabName === "title" && (
                    <div className="border-[3px] mb-5 shadow-sm border-secondary rounded-xl">
                        <div className="flex justify-between items-center p-5">
                            <Button variant="outline" className="rounded-full text-xl">
                                1
                            </Button>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4 bg-card p-4 rounded">
                            <Label htmlFor="title" className="text-left font-semibold capitalize">
                                Forms title
                            </Label>
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                value={String(newData.title) || ""}
                                className="col-span-3 bg-secondary"
                                onChange={handleTitleChange} // Allow updating title
                                autoComplete="off"
                            />
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}
