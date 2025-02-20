"use client"

import kyInstance from "@/lib/ky";
import { DocumentSelectionOrdersProps, DocumentSelectionTitleProps } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import InputElements from "./InputsElements";

export default function OrderFeed({ name }: { name: string }) {

    const { data, isFetching, isError, isLoading } = useQuery<
        DocumentSelectionTitleProps | DocumentSelectionOrdersProps
    >({
        queryKey: [`${name}-feed`],
        queryFn: () =>
            kyInstance
                .get(`/api/pages/orderPage/${name}`)
                .json<DocumentSelectionTitleProps | DocumentSelectionOrdersProps>(),
        staleTime: Infinity,
    });

    if (isError) {

        return
    }
    if (isLoading || isFetching) {
        return (
            <div className="mx-auto p-5 text-center">
                <Loader2 className="mx-auto my-3 animate-spin" />
            </div>
        );
    }

    return <InputElements data={data} />

}