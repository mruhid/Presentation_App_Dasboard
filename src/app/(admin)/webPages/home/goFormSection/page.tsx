import { Metadata } from "next"
import GoFormFeed from "./GoFormFeed"
export const metadata: Metadata = { title: "Home-GoForm" }


export default function Page() {
    return <div className="w-full min-w-0 space-y-5 mx-auto text-center">
        <h1 className="text-2xl font-bold ">Go form section</h1>

        <GoFormFeed />

    </div>
}
