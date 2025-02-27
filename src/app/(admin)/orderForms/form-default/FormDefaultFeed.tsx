"use client"

import kyInstance from "@/lib/ky";
import { OrderFormsDefaultProps, } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import InputElements from "./InputElements";

export default function FormDefaultFeed() {

    const { data, isFetching, isError, isLoading } = useQuery<
        OrderFormsDefaultProps[]
    >({
        queryKey: [`form-default-feed`],
        queryFn: () =>
            kyInstance
                .get(`/api/orderForms/formDefault`)
                .json<OrderFormsDefaultProps[]>(),
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

    return <InputElements data={data} />

}