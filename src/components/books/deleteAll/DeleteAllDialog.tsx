import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteAllClients } from "./mutation";
import { Loader2 } from "lucide-react";



export default function DeleteAllDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAll, SetIsAll] = useState(false);
    const mutation = useDeleteAllClients()
    const handleButtonLOading = () => {
        SetIsAll(true)
        return mutation.mutate(false,
            {
                onSuccess: () => setIsOpen(false),
            }
        )
    }

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
    };

    return (


        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild><Button variant="outline">Delete</Button></DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete all client info</DialogTitle>
                    <DialogDescription>You can choose these options</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex justify-center items-center px-4 py-2 ">
                        <div className="p-4"><Button
                            onClick={() => mutation.mutate(true,
                                {
                                    onSuccess: () => setIsOpen(false),
                                }
                            )}
                            disabled={mutation.isPending}
                            variant="destructive">
                            {(!isAll &&
                                mutation.isPending ? (<Loader2 className="mx-auto my-3 animate-spin" />) : "Delete marked clients"
                            )}
                        </Button></div>

                        <div className="p-4"><Button
                            onClick={handleButtonLOading}

                            variant='destructive'>
                            {(isAll &&
                                mutation.isPending ? (<Loader2 className="mx-auto my-3 animate-spin" />) : "Delete All"
                            )}
                        </Button></div>
                    </div>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}
