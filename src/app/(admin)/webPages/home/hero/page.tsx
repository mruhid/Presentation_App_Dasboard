import { Metadata } from "next"
import HeroFeed from "./HeroFeed"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = { title: "Home-Hero" }


export default function Page() {
    return <div className="w-full min-w-0 space-y-5 mx-auto text-center">
        <h1 className="text-2xl font-bold ">Hero Section</h1>
        <Tabs defaultValue="hero_section">
            <TabsList>
                <TabsTrigger value='hero_section'>Hero section</TabsTrigger>
                <TabsTrigger value='hero_section_media'>Hero media</TabsTrigger>
            </TabsList>
            <TabsContent value="hero_section">
                <HeroFeed name="hero_section" />
            </TabsContent>
            <TabsContent value="hero_section_media">
                <HeroFeed name="hero_section_media" />
            </TabsContent>
        </Tabs>
    </div>
}
