"use client"

import kyInstance from "@/lib/ky";
import { AboutUsSectionProps, } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import InputElements from "./inputElements";

export default function AboutUsFeed() {

    const { data, isFetching, isError, isLoading } = useQuery<
        AboutUsSectionProps[]
    >({
        queryKey: [`about-us-feed`],
        queryFn: () =>
            kyInstance
                .get(`/api/pages/aboutPage/aboutSection/`)
                .json<AboutUsSectionProps[]>(),
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