import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useChangeStatusMutation } from "./mutation";
import { Loader2 } from "lucide-react";

interface StatusButtonProps {
    status: boolean;
    id: number;
}

export default function StatusButton({ status, id }: StatusButtonProps) {
    const [open, setOpen] = useState(false);
    const mutation = useChangeStatusMutation();

    function handleOpenChange(open: boolean) {
        if (!open || mutation.isPending) {
            setOpen(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button size="icon" onClick={() => setOpen(true)} variant={status ? "default" : "outline"}>
                    {status ? "✓" : ""}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Do you want to mark this client?</DialogTitle>
                    <DialogDescription>
                        This is for marking your customers&apos; orders after they have been prepared.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        onClick={() =>
                            mutation.mutate(
                                { id, check: !status },
                                {
                                    onSuccess: () => setOpen(false),
                                }
                            )
                        }
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? (<Loader2 className="mx-auto my-3 animate-spin" />) : "Yes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
