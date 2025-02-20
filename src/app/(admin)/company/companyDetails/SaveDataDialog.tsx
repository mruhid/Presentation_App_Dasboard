import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useUpdateAdminDataMutation } from "./mutation";
import { Loader2 } from "lucide-react";
import { redirect } from 'next/navigation';

interface SaveDataDialogProps {
    data: Record<string, any>;
    cachedCompanyData: Record<string, any>;
}

export default function SaveDataDialog({ data, cachedCompanyData }: SaveDataDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const mutation = useUpdateAdminDataMutation();

    // Deep equality check function
    const deepEqual = (obj1: object, obj2: object): boolean => {
        if (obj1 === obj2) return true; // Same reference or primitive value

        if (
            typeof obj1 !== "object" ||
            typeof obj2 !== "object" ||
            obj1 === null ||
            obj2 === null
        ) {
            return false; // One is not an object or is null
        }

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) return false; // Different number of properties

        for (const key of keys1) {
            const value1 = (obj1 as any)[key];
            const value2 = (obj2 as any)[key];

            // Check for empty or space-only string values in obj1 or obj2
            if (
                (typeof value1 === "string" && value1.trim() === "") || // Empty or space-only in obj1
                (typeof value2 === "string" && value2.trim() === "")    // Empty or space-only in obj2
            ) {
                return true;
            }

            if (!keys2.includes(key) || !deepEqual(value1, value2)) {
                return false; // Key missing or values not equal
            }
        }

        return true;
    };

    const isDataEqual = deepEqual(data, cachedCompanyData);

    function handleOpenChange(open: boolean) {
        if (!open || mutation.isPending) {
            setIsOpen(false);
        }
    }

    const handleSave = async () => {
        mutation.mutate(
            data,
            {
                onSuccess: async () => {
                    // Invalidate the query to refresh the data in cache
                    setIsOpen(false)
                    // After invalidating the cache, redirect the user
                    redirect("/company");
                },
                onError: (error) => {
                    console.error("Error saving data:", error);
                },
            }
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)} size="lg" className="text-xl disabled:bg-secondary" disabled={isDataEqual}>
                    Save
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Do you want to save these changes?</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={() => setIsOpen(false)} variant="outline">
                        No
                    </Button>
                    <Button onClick={handleSave} disabled={mutation.isPending}>
                        {mutation.isPending ? (
                            <Loader2 className="mx-auto my-3 animate-spin" />
                        ) : (
                            "Yes"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
