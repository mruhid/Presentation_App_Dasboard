import { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OperationFeed from "./OperationFeed"
export const metadata: Metadata = { title: "Home-Operations" }


export default function Page() {
    return <div className="w-full min-w-0 space-y-5 mx-auto text-center">
        <h1 className="text-2xl font-bold ">Operation Section</h1>
        <Tabs defaultValue="operation_section">
            <TabsList>
                <TabsTrigger value='operation_section'>Title and description</TabsTrigger>
                <TabsTrigger value='operations'>Operations</TabsTrigger>
            </TabsList>
            <TabsContent value="operation_section">
                <OperationFeed name="operation_section" />
            </TabsContent>
            <TabsContent value="operations">
                <OperationFeed name="operations" />
            </TabsContent>
        </Tabs>
    </div>
}
