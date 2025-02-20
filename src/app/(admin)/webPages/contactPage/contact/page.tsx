import { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ContactFeed from "./ContactFeed"
export const metadata: Metadata = { title: "Contact information" }


export default function Page() {
    return <div className="w-full min-w-0 space-y-5 mx-auto text-center">
        <h1 className="text-2xl font-bold ">Contact page</h1>
        <Tabs defaultValue="operation_section">
            <TabsList>
                <TabsTrigger value='operation_section'>Title and description</TabsTrigger>
                <TabsTrigger value='operations'>Contact platforms</TabsTrigger>
            </TabsList>
            <TabsContent value="operation_section">
                <ContactFeed name='contact_page' />
            </TabsContent>
            <TabsContent value="operations">
                <ContactFeed name='contact_page_social_media' />
            </TabsContent>
        </Tabs>
    </div>
}
