import { Metadata } from "next"
import ProfileFeed from "./ProfileFeed"
export const metadata: Metadata = { title: "ProfilePage" }


export default function Page() {
    return <div className="w-full min-w-0 space-y-5 mx-auto text-center">
        <h1 className="text-2xl font-bold ">Company profile page</h1>
        <ProfileFeed />

    </div>
}
