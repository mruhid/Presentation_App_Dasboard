"use client"

import kyInstance from "@/lib/ky";
import { FooterSocialMediaProps, FooterTextProps, } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import InputElements from "./InputElements";

export default function FooterSideFeed({ name }: { name: string }) {

    const { data, isFetching, isError, isLoading } = useQuery<
        FooterSocialMediaProps[] | FooterTextProps[]
    >({
        queryKey: [`${name}-feed`],
        queryFn: () =>
            kyInstance
                .get(`/api/footerSide/${name}`)
                .json<FooterSocialMediaProps[] | FooterTextProps[]>(),
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

    return <InputElements data={data} type={name == 'footer_social_media'} />

}