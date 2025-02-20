"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import SaveDataDialog from "./SaveDataDialog";

export function CompanyDataBox() {
    const queryClient = useQueryClient();
    const [details, setDetails] = useState<Record<string, any>>({}); // Generic state type

    // Get cached data
    const cachedCompanyData = queryClient.getQueryData(["admin-data"]);

    // Fetch data using `useQuery`
    const { data = cachedCompanyData, isFetching, isLoading, error } = useQuery({
        queryKey: ["admin-data"],
        queryFn: () => Promise.resolve(cachedCompanyData),
        enabled: !!cachedCompanyData,
        onSuccess: (fetchedData) => {
            if (!Object.keys(details).length) {
                setDetails(fetchedData); // Populate state on successful fetch
            }
        },
    });

    // Initialize state from cache on mount
    useEffect(() => {
        if (cachedCompanyData && !Object.keys(details).length) {
            setDetails(cachedCompanyData);
        }
    }, [cachedCompanyData, details]);

    if (isLoading || isFetching) {
        return (
            <div className="mx-auto p-5 text-center">
                <Loader2 className="mx-auto my-3 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto text-destructive p-5 text-center">
                <p>Error loading company details.</p>
            </div>
        );
    }

    if (!details || Object.keys(details).length === 0) {
        return (
            <div className="mx-auto p-5 text-center">
                <Loader2 className="mx-auto my-3 animate-spin" />
            </div>
        );
    }

    // Handle input change
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    return (
        <>
            <div className="flex flex-col gap-4 py-4">
                {Object.entries(details).map(([key, value]) =>
                    key !== "id" && (
                        <div
                            key={key}
                            className="grid bg-secondary rounded grid-cols-4 items-center gap-4"
                        >
                            <Label
                                htmlFor={key}
                                className="text-left font-semibold capitalize p-6"
                            >
                                {key}
                            </Label>
                            <Input
                                type="text"
                                id={key}
                                name={key}
                                value={value}
                                onChange={handleInput}
                                className="col-span-3 p-6"
                                autoComplete="off"
                            />
                        </div>
                    )
                )}
            </div>
            <div className=" flex py-4 justify-end ">
                <div>
                    <SaveDataDialog data={details} cachedCompanyData={data} />
                </div>
            </div>
        </>
    );
}

