import SectionItems from "@/components/SectionItems"
import { Metadata } from "next"

export const metadata: Metadata = { title: "Forms-Type" }
export default function Page() {
    const items = [
        {
            name: "CV",
            pathName: "/orderForms/orderPrice/cv"
        },
        {
            name: "CoverLetter",
            pathName: "/orderForms/orderPrice/coverLetter"
        },
        {
            name: "CourseWork",
            pathName: "/orderForms/orderPrice/courseWork"
        },
        {
            name: "Diploma",
            pathName: "/orderForms/orderPrice/diploma"
        },
        {
            name: "Presentation",
            pathName: "/orderForms/orderPrice/presentation"
        },
        {
            name: "Word",
            pathName: "/orderForms/orderPrice/word"
        },

    ]

    return (
        <SectionItems items={items} className="flex flex-col gap-4 justify-center items-center py-3 flex-wrap  sm:flex-row " title="Forms Price" variant="outline" />
    )


}