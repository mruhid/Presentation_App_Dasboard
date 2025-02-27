"use client"

import kyInstance from "@/lib/ky";
import { HeroSectionMediaProps, HeroSectionProps } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import InputsElement from "./InputsElement";

export default function HeroFeed({ name }: { name: string }) {

    const { data, isFetching, isError, isLoading } = useQuery<
        HeroSectionProps | HeroSectionMediaProps
    >({
        queryKey: [`hero-${name}`],
        queryFn: () =>
            kyInstance
                .get(`/api/pages/homePage/heroSection/${name}`)
                .json<HeroSectionProps | HeroSectionMediaProps>(),
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

    return <InputsElement data={data} type={name == "hero_section"} />

}