"use client"
import kyInstance from "@/lib/ky";
import { OrderFormsPriceProps, } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import InputElements from "./InputElements";

export default function FormsPriceFeed({ name, }: { name: string }) {

    const { data, isFetching, isError, isLoading } = useQuery<
        OrderFormsPriceProps
    >({
        queryKey: [`${name}-forms`, 'orderPrice-feed'],
        queryFn: () =>
            kyInstance
                .get(`/api/orderForms/${name}/orderPrice`)
                .json<OrderFormsPriceProps>(),
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