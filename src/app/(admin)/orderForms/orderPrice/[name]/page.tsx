import { Metadata } from "next";
import FormsPriceFeed from "./FormPriceFeed";

interface PageProps {
    params: { name?: string };  // Make `name` optional to avoid runtime errors
}

export const metadata: Metadata = { title: "Form Price" };

export default async function Page({ params }: PageProps) {
    const name = params?.name || "Unknown"; // Handle undefined case

    return (
        <div className="w-full max-w-[700px] min-w-0 space-y-5 mx-auto text-center">
            <h1 className="text-2xl font-bold capitalize">{name}&apos;s form price</h1>
            <FormsPriceFeed name={name} />
        </div>
    );
}
