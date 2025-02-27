"use client";

import { useQuery, } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { CompanyDetailsProps } from "@/lib/type";
import DataCompunents from "./DataCompunents";
import kyInstance from "@/lib/ky";

export function CompanyDataBox() {

    const { data: cachedCompanyData, isFetching, isLoading, error } = useQuery<CompanyDetailsProps>({
        queryKey: ["admin-data-for-edit"],
        queryFn: () =>
            kyInstance
                .get(`/api/companyDetails`)
                .json<CompanyDetailsProps>(),
        staleTime: Infinity,
    });


    if (isLoading || isFetching) {
        return (
            <div className="mx-auto p-5 text-center">
                <Loader2 className="mx-auto my-3 animate-spin" />
            </div>
        );
    }

    if (error || !cachedCompanyData) {
        return (
            <div className="mx-auto text-destructive p-5 text-center">
                <p>Error loading company details.</p>
            </div>

        );
    }



    return <DataCompunents data={cachedCompanyData} />
}

