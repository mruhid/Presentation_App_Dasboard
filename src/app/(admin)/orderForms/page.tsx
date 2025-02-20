import SectionItems from "@/components/SectionItems"
import { Metadata } from "next"

export const metadata: Metadata = { title: "Order Forms" }
export default function Page() {
    const items = [
        {
            name: "Default Variable",
            pathName: "/orderForms/form-default/"
        },
        {
            name: "Forms Data",
            pathName: "/orderForms/formsData/"
        },
        {
            name: "Forms Price",
            pathName: "/orderForms/orderPrice/"
        },


    ]

    return (
        <SectionItems items={items} className="" title="Order Forms" variant="default" />
    )


}