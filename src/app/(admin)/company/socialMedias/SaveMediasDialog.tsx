import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { redirect } from 'next/navigation';
import { useUpdateSocialMediaMutation } from "./mutation";
import { SocialMediaProps } from "@/lib/type";

interface UpdateProp {
    updates: SocialMediaProps[];
    action: boolean
}

export default function SaveDataDialog({ updates, action }: UpdateProp) {
    const [isOpen, setIsOpen] = useState(false);
    const mutation = useUpdateSocialMediaMutation();

    // Deep equality check function


    function handleOpenChange(open: boolean) {
        if (!open || mutation.isPending) {
            setIsOpen(false);
        }
    }

    const handleSave = async () => {
        console.log("Updates before mutation:", updates); // Check updates payload
        mutation.mutate(updates, {
            onSuccess: async () => {
                redirect("/company"); // Redirect after 2 seconds
            },
            onError: (error) => {
                console.error("Mutation error:", error); // Log error details
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)} size="lg" className="text-xl disabled:bg-secondary" disabled={action}>
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
