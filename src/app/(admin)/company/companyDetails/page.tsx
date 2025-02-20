import { Metadata } from "next";
import { CompanyDataBox } from "./CompanyDataBox";

export const metadata: Metadata = { title: "Company Details" };

export default function Page() {
    return (
        <div className="mx-auto p-5 text-center">
            <h1 className="text-2xl font-bold mb-4">Company Details</h1>
            <CompanyDataBox />
        </div>
    );
}

