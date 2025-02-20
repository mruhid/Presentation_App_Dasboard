import { Metadata } from "next"
import OtherWorksFeed from "./OtherWorksFeed"
export const metadata: Metadata = { title: "AboutPage-otherWorks" }


export default function Page() {
    return <div className="w-full min-w-0 space-y-5 mx-auto text-center">
        <h1 className="text-2xl font-bold ">Company other works section</h1>
        <OtherWorksFeed />

    </div>
}
