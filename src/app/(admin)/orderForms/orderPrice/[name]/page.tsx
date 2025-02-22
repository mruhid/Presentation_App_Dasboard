import { Metadata } from "next";
import FormsPriceFeed from "./FormPriceFeed";


export const metadata: Metadata = { title: "Form Price" };

export default async function Page({ params }: { params: Promise<{ name: string }> }) {
    const { name } = await params

    return (
        <div className="w-full max-w-[700px] min-w-0 space-y-5 mx-auto text-center">
            <h1 className="text-2xl font-bold capitalize">{name}&apos;s form price</h1>
            <FormsPriceFeed name={name} />
        </div>
    );
}
