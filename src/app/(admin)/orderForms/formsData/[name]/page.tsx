import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormsDataFeed from "./FormsDataFeed";

interface PageProps {
    params: { name: string };  // Ensure `name` is required
}


export default function Page({ params }: PageProps) {
    const name = params?.name ?? "Unknown"; // Use optional chaining safely

    return (
        <div className="w-full min-w-0 space-y-5 mx-auto text-center">
            <h1 className="text-2xl font-bold">Order Forms Data</h1>

            <Tabs defaultValue="operation_section">
                <TabsList>
                    <TabsTrigger value="operation_section">Forms Title</TabsTrigger>
                    <TabsTrigger value="operations">Forms Inputs</TabsTrigger>
                    <TabsTrigger value="options">Forms Options</TabsTrigger>
                </TabsList>

                <TabsContent value="operation_section">
                    <FormsDataFeed name={name} tabName="title" />
                </TabsContent>
                <TabsContent value="operations">
                    <FormsDataFeed name={name} tabName="data" />
                </TabsContent>
                <TabsContent value="options">
                    <FormsDataFeed name={name} tabName="options" />
                </TabsContent>
            </Tabs>
        </div>
    );
}
