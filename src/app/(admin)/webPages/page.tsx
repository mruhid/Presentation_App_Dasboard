import SectionItems from "@/components/SectionItems"
import { Metadata } from "next"

export const metadata: Metadata = { title: "Web Pages" }
export default function Page() {
    const items = [
        {
            name: "Home",
            pathName: "webPages/home"
        },
        {
            name: "About",
            pathName: "webPages/aboutPage"
        },
        {
            name: "Orders",
            pathName: "webPages/orderPage"
        },
        {
            name: "Contact",
            pathName: "webPages/contactPage"
        },
        {
            name: "Profile",
            pathName: "webPages/profilePage"
        },
    ]

    return (
        <SectionItems items={items} className="" title="Web pages" variant="default" />
    )


}