"use client"

import kyInstance from "@/lib/ky";
import { GoFormSectionProps, } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import InputElements from "./InputElements";

export default function GoFormFeed() {

    const { data, isFetching, isError, isLoading } = useQuery<
        GoFormSectionProps[]
    >({
        queryKey: [`go-form-feed`],
        queryFn: () =>
            kyInstance
                .get(`/api/pages/homePage/goForm/`)
                .json<GoFormSectionProps[]>(),
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