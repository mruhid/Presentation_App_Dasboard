import { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FooterSideFeed from "./FooterSideFeed"
export const metadata: Metadata = { title: "Footer Side" }


export default function Page() {
    return <div className="w-full min-w-0 space-y-5 mx-auto text-center">
        <h1 className="text-2xl font-bold ">Footer side</h1>
        <Tabs defaultValue="operation_section">
            <TabsList>
                <TabsTrigger value='operation_section'>Footer text</TabsTrigger>
                <TabsTrigger value='operations'>Footer media</TabsTrigger>
            </TabsList>
            <TabsContent value="operation_section">
                <FooterSideFeed name='footer' />
            </TabsContent>
            <TabsContent value="operations">
                <FooterSideFeed name='footer_social_media' />
            </TabsContent>
        </Tabs>
    </div>
}
