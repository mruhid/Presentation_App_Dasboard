import { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OrderFeed from "./OrderFeed"
export const metadata: Metadata = { title: "OrderPage-Forms" }


export default function Page() {
    return <div className="w-full min-w-0 space-y-5 mx-auto text-center">
        <h1 className="text-2xl font-bold ">Order forms Section</h1>
        <Tabs defaultValue="operation_section">
            <TabsList>
                <TabsTrigger value='operation_section'>Title and description</TabsTrigger>
                <TabsTrigger value='operations'>Order selection</TabsTrigger>
            </TabsList>
            <TabsContent value="operation_section">
                <OrderFeed name="document_selection" />
            </TabsContent>
            <TabsContent value="operations">
                <OrderFeed name="price_option" />
            </TabsContent>
        </Tabs>
    </div>
}
