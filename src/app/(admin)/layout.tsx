import SideBar from "@/components/SideBar";
import Header from "@/components/ui/Header";
import { SidebarProvider } from "@/components/ui/sidebar";



export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider defaultOpen={false}>
            <div className="flex w-full bg-background">
                {/* Sidebar */}
                <SideBar />

                <div className="flex flex-col flex-1">
                    {/* Header */}
                    <Header />

                    {/* Main Content Area */}
                    <main className="flex flex-1 flex-col items-center p-6 bg-card text-foreground">
                        <div className="w-full max-w-5xl">{children}</div>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
