"use client"

import kyInstance from "@/lib/ky";
import { ContactPlatformsProps, ContactTitleProps, } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import InputElements from "./InputElements";

export default function ContactFeed({ name }: { name: string }) {

    const { data, isFetching, isError, isLoading } = useQuery<
        ContactTitleProps | ContactPlatformsProps
    >({
        queryKey: [`${name}-feed`],
        queryFn: () =>
            kyInstance
                .get(`/api/pages/contactPage/${name}`)
                .json<ContactPlatformsProps | ContactTitleProps>(),
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

    return <InputElements data={data} type={name == 'contact_page_social_media'} />

}