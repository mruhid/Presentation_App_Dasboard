"use client"

import kyInstance from "@/lib/ky";
import { OtherWorksSectionProps, } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import InputElements from "./InputElemenrs";

export default function OtherWorksFeed() {

    const { data, isFetching, isError, isLoading } = useQuery<
        OtherWorksSectionProps[]
    >({
        queryKey: [`other-works-feed`],
        queryFn: () =>
            kyInstance
                .get(`/api/pages/aboutPage/otherWorks`)
                .json<OtherWorksSectionProps[]>(),
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