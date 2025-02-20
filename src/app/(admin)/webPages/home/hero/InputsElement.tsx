import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HeroSectionMediaProps, HeroSectionProps } from "@/lib/type";
import { useState } from "react";
import SocialMediaElements from "./SocialMediaElements";
import { redirect } from "next/navigation";
import { useUpdateHeroSection } from "./mutation";
import { Loader2 } from "lucide-react";



const InputsElement = ({ data, type }: { data: HeroSectionMediaProps | HeroSectionProps; type: boolean }) => {
    const [hero, setHero] = useState<HeroSectionMediaProps | HeroSectionProps>(data);
    const mutation = useUpdateHeroSection()

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: number,
        key: string
    ) => {
        const { value } = e.target;

        setHero((prevHero) => {
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
        setHero((prevHero) => {
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

    const handleSave = async () => {
        mutation.mutate(
            hero,
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

    const isDisable = () => {
        const check = hero.some((item) =>
            Object.entries(item).some(([key, value]) =>
                key !== "action" && typeof value === "string" && value.trim() === ""
            )
        );
        return check;
    };





    const Disabled = isDisable()


    return (
        <>
            {type ? (
                <div className="flex flex-col gap-4 py-4">
                    {Array.isArray(hero) &&
                        hero.map((item) =>
                            Object.entries(item).map(([key, value]) =>
                                key !== "id" && key !== "buttonSrc" ? (
                                    key !== "action" ? (
                                        <div
                                            key={`${item.id}-${key}`}
                                            className="grid bg-secondary rounded grid-cols-4 items-center gap-4"
                                        >
                                            <Label
                                                htmlFor={`${item.id}-${key}`}
                                                className="text-left font-semibold capitalize p-6"
                                            >
                                                {key}
                                            </Label>
                                            <Input
                                                type="text"
                                                id={`${item.id}-${key}`}
                                                name={key}
                                                value={String(value)}
                                                onChange={(e) => handleInputChange(e, item.id, key)}
                                                className="col-span-3 p-6"
                                                autoComplete="off"
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            key={`${item.id}-${key}`}
                                            className="flex items-center justify-between bg-secondary"
                                        >
                                            <Label
                                                htmlFor={`${item.id}-${key}`}
                                                className="text-left font-semibold capitalize p-6"
                                            >
                                                {key}
                                            </Label>
                                            <div className="mr-4">
                                                <Button size="icon" onClick={() => handleInputAction(!value, item.id, key)} variant={value ? "default" : "outline"}>
                                                    {value ? "✓" : ""}
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                ) : null
                            )
                        )}
                </div>
            ) : (
                <SocialMediaElements elements={hero as HeroSectionMediaProps[]} setElements={setHero} />
            )}
            {type && <Button disabled={Disabled} className="w-full" onClick={handleSave}>
                {mutation.isPending ? (
                    <Loader2 className="mx-auto my-3 animate-spin" />
                ) : (
                    "Save"
                )}

            </Button>}
        </>
    );
};


export default InputsElement;
