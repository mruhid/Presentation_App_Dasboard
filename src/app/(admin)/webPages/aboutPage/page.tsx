import SectionItems from "@/components/SectionItems"
import { Metadata } from "next"

export const metadata: Metadata = { title: "About-Sections" }
export default function Page() {
    const items = [
        {
            name: "About Section",
            pathName: "./aboutPage/about"
        },
        {
            name: "Purpose Section",
            pathName: "./aboutPage/purpose"
        },
        {
            name: "OtherWorks Section",
            pathName: "./aboutPage/otherWorks"
        },
    ]

    return (
        <SectionItems items={items} title="About Page" className="" variant="outline" />
    )


}