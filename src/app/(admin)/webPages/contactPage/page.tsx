import SectionItems from "@/components/SectionItems"
import { Metadata } from "next"

export const metadata: Metadata = { title: "ContactPage-Sections" }
export default function Page() {
    const items = [
        {
            name: "Contact Information",
            pathName: "./contactPage/contact"
        },

        {
            name: "GoForm Section",
            pathName: "/webPages/home/goFormSection"
        },

    ]

    return (
        <SectionItems items={items} title="Contact Page" className="" variant="outline" />
    )


}