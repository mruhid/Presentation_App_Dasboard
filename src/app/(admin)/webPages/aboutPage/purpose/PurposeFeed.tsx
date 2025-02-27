"use client"

import kyInstance from "@/lib/ky";
import { PurposeSectionProps, } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import InputElements from "./InputElemenrs";

export default function PurposeFeed() {

    const { data, isFetching, isError, isLoading } = useQuery<
        PurposeSectionProps[]
    >({
        queryKey: [`purpose-feed`],
        queryFn: () =>
            kyInstance
                .get(`/api/pages/aboutPage/purpose`)
                .json<PurposeSectionProps[]>(),
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