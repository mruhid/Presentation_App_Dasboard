import { Metadata } from "next"
import AboutUsFeed from "./AboutUsFeed"
export const metadata: Metadata = { title: "AboutPage-About" }


export default function Page() {
    return <div className="w-full min-w-0 space-y-5 mx-auto text-center">
        <h1 className="text-2xl font-bold ">About us section</h1>
        <AboutUsFeed />
    </div>
}
