import { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FollowUsFeed from "./FollowUsFeed"
export const metadata: Metadata = { title: "Home-FollowUs" }


export default function Page() {
    return <div className="w-full min-w-0 space-y-5 mx-auto text-center">
        <h1 className="text-2xl font-bold ">Follow-Us Section</h1>
        <Tabs defaultValue="operation_section">
            <TabsList>
                <TabsTrigger value='operation_section'>Title and description</TabsTrigger>
                <TabsTrigger value='operations'>Social medias</TabsTrigger>
            </TabsList>
            <TabsContent value="operation_section">
                <FollowUsFeed name='social_section' />
            </TabsContent>
            <TabsContent value="operations">
                <FollowUsFeed name='social_section_media' />
            </TabsContent>
        </Tabs>
    </div>
}
