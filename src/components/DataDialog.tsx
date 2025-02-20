import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import Link from "next/link";

interface DataDialogProps {
    data: {
        type: string;
        data: Record<string, any>;
    };
}

export default function DataDialog({ data }: DataDialogProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
    };

    return (
        <>
            {/* Clicking on this element opens the dialog */}
            <div
                onClick={() => setIsOpen(true)}
                className="cursor-pointer"

            >
                {data.type}
            </div>

            {/* Dialog Component */}
            <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Customer Data</DialogTitle>
                        <DialogDescription>See customer data from here</DialogDescription>
                    </DialogHeader>
                    <div className="p-4 mx-auto w-full">
                        {Object.entries(data.data).map(([key, value], i) => (
                            <div key={i} className="capitalize flex items-center justify-between my-2 flex-wrap">
                                <h2 className="text-sm font-semibold capitalize">{key}</h2>
                                {key !== "phoneNumber" ? <p className="text-sm text-primary">{(key == "others" && !value.length) ? "Customers didn't write on others" : String(value)}</p>
                                    : <p className="text-green-900">
                                        {key === "phoneNumber" && <Link
                                            href={`https://wa.me/${value}`}>
                                            {value}
                                        </Link>}
                                    </p>

                                }

                            </div>
                        ))}
                    </div>

                </DialogContent>
            </Dialog>
        </>
    );
}
