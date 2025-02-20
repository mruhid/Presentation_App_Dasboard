"use client"

import kyInstance from "@/lib/ky";
import { OperationsProps, OperationTitleProps } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import InputElements from "./InputElements";

export default function HeroFeed({ name }: { name: string }) {

    const { data, isFetching, isError, isLoading } = useQuery<
        OperationsProps | OperationTitleProps
    >({
        queryKey: [`${name}`],
        queryFn: () =>
            kyInstance
                .get(`/api/pages/homePage/operations/${name}`)
                .json<OperationsProps | OperationTitleProps>(),
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