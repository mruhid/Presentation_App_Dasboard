"use client"

import kyInstance from "@/lib/ky";
import { OrderFormsDataProps, } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import InputElements from "./InputElements";

export default function FormsDataFeed({ name, tabName }: { name: string, tabName: string }) {

    const { data, isFetching, isError, isLoading } = useQuery<
        OrderFormsDataProps
    >({
        queryKey: [`${name}-feed`, 'formsData'],
        queryFn: () =>
            kyInstance
                .get(`/api/orderForms/${name}/formData`)
                .json<OrderFormsDataProps>(),
        staleTime: Infinity,
    });

    if (isError || !data) {

        return
    }
    if (isLoading || isFetching) {
        return (
            <div className="mx-auto p-5 text-center">
                <Loader2 className="mx-auto my-3 animate-spin" />
            </div>
        );
    }

    return <InputElements data={data} tabName={tabName} />

}