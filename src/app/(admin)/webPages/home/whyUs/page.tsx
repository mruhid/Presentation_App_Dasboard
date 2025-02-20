import { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Feed from "./Feed"
export const metadata: Metadata = { title: "Home-WhyUs" }


export default function Page() {
    return <div className="w-full min-w-0 space-y-5 mx-auto text-center">
        <h1 className="text-2xl font-bold ">Why Us Section</h1>
        <Tabs defaultValue="operation_section">
            <TabsList>
                <TabsTrigger value='operation_section'>WhyUs Title</TabsTrigger>
                <TabsTrigger value='operations'>WhyUs Feature</TabsTrigger>
            </TabsList>
            <TabsContent value="operation_section">
                <Feed name="WhyUsSection" />
            </TabsContent>
            <TabsContent value="operations">
                <Feed name="whyUsFeatures" />
            </TabsContent>
        </Tabs>
    </div>
}
