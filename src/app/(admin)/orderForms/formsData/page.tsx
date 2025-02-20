import SectionItems from "@/components/SectionItems"
import { Metadata } from "next"

export const metadata: Metadata = { title: "FormsType" }
export default function Page() {
    const items = [
        {
            name: "CV",
            pathName: "/orderForms/formsData/cv"
        },
        {
            name: "CoverLetter",
            pathName: "/orderForms/formsData/coverLetter"
        },
        {
            name: "CourseWork",
            pathName: "/orderForms/formsData/courseWork"
        },
        {
            name: "Diploma",
            pathName: "/orderForms/formsData/diploma"
        },
        {
            name: "Presentation",
            pathName: "/orderForms/formsData/presentation"
        },
        {
            name: "Word",
            pathName: "/orderForms/formsData/word"
        },

    ]

    return (
        <SectionItems items={items} className="flex flex-col gap-4 justify-center items-center py-3 flex-wrap  sm:flex-row " title="Order Data" variant="outline" />
    )


}