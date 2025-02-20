import { deleteCulomn } from "@/components/books/deleteOne/action";
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useDeleteBookMutation } from "./mutation";
import { Loader2 } from "lucide-react";

interface DeleteButtonProps {
    id: number,
    index: number,
}
export default function DeleteCulomnButton({ id, index }: DeleteButtonProps) {
    const [open, setOpen] = useState(false)
    const mutation = useDeleteBookMutation()
    function handleOpenChange(open: boolean) {
        if (!open || mutation.isPending) {
            setOpen(false);
        }
    }
    return <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)} variant="outline">{index}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Delete cullomn</DialogTitle>
                <DialogDescription>
                    Are you sure you want to delete this cullomn?
                </DialogDescription>
            </DialogHeader>

            <DialogFooter >
                <Button onClick={() => setOpen(false)} variant={"outline"} >Cancel</Button>
                <Button onClick={() => mutation.mutate(id,
                    {
                        onSuccess: () => setOpen(false),
                    }
                )} disabled={mutation.isPending} variant="destructive">{mutation.isPending ? (<Loader2 className="mx-auto my-3 animate-spin" />) : "Delete"}</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}

