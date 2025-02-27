"use client"

import kyInstance from "@/lib/ky";
import { WhyUsFeaturesProps, WhyUsProps } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import InputElements from "./InputElements";

export default function Feed({ name }: { name: string }) {

    const { data, isFetching, isError, isLoading } = useQuery<
        WhyUsProps | WhyUsFeaturesProps[]
    >({
        queryKey: [`${name}`],
        queryFn: () =>
            kyInstance
                .get(`/api/pages/homePage/whyUs/${name}`)
                .json<WhyUsProps | WhyUsFeaturesProps[]>(),
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

    return <InputElements data={data} type={name == 'whyUsFeatures'} />

}