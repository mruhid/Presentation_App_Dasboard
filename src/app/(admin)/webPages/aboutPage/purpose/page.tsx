import { Metadata } from "next"
import PurposeFeed from "./PurposeFeed"
export const metadata: Metadata = { title: "AboutPage-Purpose" }


export default function Page() {
    return <div className="w-full min-w-0 space-y-5 mx-auto text-center">
        <h1 className="text-2xl font-bold ">Company purpose section</h1>
        <PurposeFeed />
    </div>
}
