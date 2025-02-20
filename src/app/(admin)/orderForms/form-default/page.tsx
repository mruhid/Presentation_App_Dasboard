import { Metadata } from "next"
import FormDefaultFeed from "./FormDefaultFeed"
export const metadata: Metadata = { title: "Form Default" }


export default function Page() {
    return <div className="w-full min-w-0 space-y-5 mx-auto text-center">
        <h1 className="text-2xl font-bold ">Order form default variable</h1>
        <FormDefaultFeed />
    </div>
}
