'use client'
import { useToast } from "@/hooks/use-toast";
import kyInstance from "@/lib/ky";
import { SocialMediaProps } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import InputColumn from "./InputColumn";

export default function SocialMediaFeed() {
    const { toast } = useToast();

    const { data, isFetching, isError, isLoading } = useQuery({
        queryKey: ["social-medias"],
        queryFn: () => kyInstance.get("/api/companyDetails/socialMedias")
            .json<SocialMediaProps[]>(),
        staleTime: Infinity,

    })


    if (isLoading || isFetching) {
        return (
            <div className="mx-auto p-5 text-center">
                <Loader2 className="mx-auto my-3 animate-spin" />
            </div>
        );
    }
    if (isError || !data) {
        toast({
            title: "Error",
            description: "Something went wrong",
            variant: "destructive"
        });
        return
    }


    return <InputColumn data={data} />
}