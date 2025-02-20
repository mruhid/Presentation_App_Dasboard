import SectionItems from "@/components/SectionItems"
import { Metadata } from "next"

export const metadata: Metadata = { title: "Home-sections" }
export default function Page() {
    const items = [
        {
            name: "Hero Section",
            pathName: "./home/hero"
        },
        {
            name: "Operation Section",
            pathName: "./home/operations"
        },
        {
            name: "WhyUs Section",
            pathName: "./home/whyUs"
        },
        {
            name: "FollowUs Section",
            pathName: "./home/followUs"
        },
        {
            name: "GoForm Section",
            pathName: "./home/goFormSection"
        },

    ]

    return (
        <SectionItems items={items} title="Home Page" className="" variant="outline" />
    )


}