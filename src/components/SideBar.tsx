'use client'
import { BookAIcon, ChevronDown, ChevronUp, Contact, DollarSignIcon, Home, ListOrdered, TextQuoteIcon, TextSelectionIcon, TriangleIcon, User2Icon, XIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Button } from "./ui/button";
import Link from "next/link";



export default function SideBar() {
    return (
        <div >
            <SideBarElement />
        </div>
    );
}

const items2 = [
    {
        title: "Home",
        url: "/webPages/home",
        icon: Home,
        altMenu: [
            {
                title: "Hero Section",
                url: "/webPages/home/hero",
                icon: false,
            },
            {
                title: "Operations Section",
                url: "/webPages/home/operation",
                icon: false,
            },
            {
                title: "Why Us Section",
                url: "/webPages/home/whyUs",
                icon: false,
            },
            {
                title: "Follow Us Section",
                url: "/webPages/home/followUs",
                icon: false,
            },
            {
                title: "Go-Form Section",
                url: "/webPages/home/goFormSection",
                icon: false,
            },

        ]
    },
    {
        title: "About",
        url: "/webPages/aboutPage",
        icon: TextQuoteIcon,
        altMenu: [
            {
                title: "AboutUs Section",
                url: "/webPages/aboutPage/about",
                icon: false,
            },
            {
                title: "Purpose Section",
                url: "/webPages/aboutPage/purpose",
                icon: false,
            },
            {
                title: "OtherWorks Section",
                url: "/webPages/aboutPage/otherWorks",
                icon: false,
            },
        ]
    },
    {
        title: "Orders",
        url: "/webPages/orderPage",
        icon: ListOrdered,
        altMenu: false
    },
    {
        title: "Contact",
        url: "/webPages/contactPage",
        icon: Contact,
        altMenu: [
            {
                title: "Contact Platforms",
                url: "/webPages/contactPage/contact",
                icon: false,
            },

            {
                title: "Go-Form Section",
                url: "/webPages/home/goFormSection",
                icon: false,
            },

        ]

    },
    {
        title: "Profile",
        url: "/webPages/profilePage",
        icon: User2Icon,
        altMenu: false
    },


]

const orderFormsItem = [
    {
        title: "Default-Variable",
        url: "/orderForms/form-default",
        icon: TriangleIcon,
        altMenu: false

    },

    {
        title: "Forms-Data",
        url: "/orderForms/formsData",
        icon: BookAIcon,
        altMenu: [
            {
                title: "CV data",
                url: "/orderForms/formsData/cv",
                icon: false,
            },
            {
                title: "CourseWork data",
                url: "/orderForms/formsData/courseWork",
                icon: false,
            },
            {
                title: "CoverLetter data",
                url: "/orderForms/formsData/coverLetter",
                icon: false,
            },
            {
                title: "Diploma data",
                url: "/orderForms/formsData/diploma",
                icon: false,
            },
            {
                title: "Presentation data",
                url: "/orderForms/formsData/presentation",
                icon: false,
            },
            {
                title: "Word data",
                url: "/orderForms/formsData/word",
                icon: false,
            },
        ]

    },
    {
        title: "Forms-Price",
        url: "/orderForms/orderPrice",
        icon: DollarSignIcon,
        altMenu: [
            {
                title: "CV price",
                url: "/orderForms/orderPrice/cv",
                icon: false,
            },
            {
                title: "CourseWork price",
                url: "/orderForms/orderPrice/courseWork",
                icon: false,
            },
            {
                title: "CoverLetter price",
                url: "/orderForms/orderPrice/coverLetter",
                icon: false,
            },
            {
                title: "Diploma price",
                url: "/orderForms/orderPrice/diploma",
                icon: false,
            },
            {
                title: "Presentation price",
                url: "/orderForms/orderPrice/presentation",
                icon: false,
            },
            {
                title: "Word price",
                url: "/orderForms/orderPrice/word",
                icon: false,
            },
        ]

    },
]

export function SideBarElement() {
    const { toggleSidebar } = useSidebar()


    return (
        <Sidebar>
            <SidebarHeader className="mt-4" >
                <SidebarMenu className="bg-secondary rounded">
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <div className="flex items-center justify-end sm:hidden ">
                                <Button onClick={toggleSidebar} size={'icon'} variant={'outline'} className="rounded-full mb-6">
                                    <XIcon />
                                </Button>
                            </div>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="rounded  ">
                                    <h1 className="text-sm">
                                        Vusal Company
                                    </h1>
                                    <ChevronDown className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                                <DropdownMenuItem>
                                    <Link
                                        href={'/company/companyDetails'}
                                    >
                                        <span>Company Details</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link
                                        href={'/company/socialMedias'}
                                    >
                                        <span>Social Medias</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className=" scrollbar-thin scrollbar-thumb-card scrollbar-track-secondary ">
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <Link
                            href={'/webPages'}
                            className="hover:underline"
                        >
                            <h1 className="text-sm font-bold">Web Pages</h1>

                        </Link>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items2.map((item) =>
                                item.altMenu ? (
                                    // Render items with `altMenu` as DropdownMenu
                                    <Collapsible key={item.url} className="group/collapsible">
                                        <SidebarMenuItem>
                                            <div className="flex items-center py-2 justify-between  rounded-sm shadow-sm space-x-4 px-4 hover:bg-secondary">
                                                <Link
                                                    href={item.url}
                                                    className="flex  cursor-pointer justify-center items-center gap-2"
                                                >
                                                    <item.icon className="h-4 w-4" />
                                                    <h4 className="text-sm font-semibold">
                                                        {item.title}
                                                    </h4>
                                                </Link>

                                                <CollapsibleTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <ChevronDown className="h-4 w-4 transition-transform duration-300 ease-in-out group-data-[state=open]/collapsible:rotate-180" />
                                                    </Button>
                                                </CollapsibleTrigger>
                                            </div>

                                            <CollapsibleContent
                                                className="transition-[height] rounded-sm p-2  duration-300 ease-in-out overflow-hidden data-[state=open]:h-auto data-[state=closed]:h-0"

                                            >
                                                {item.altMenu.map((a, i) => (
                                                    <Link
                                                        key={i}
                                                        href={a.url}>
                                                        <div
                                                            key={i}
                                                            className="cursor-pointer  rounded-sm  px-4 py-2 text-left font-mono text-sm shadow-sm hover:bg-secondary"
                                                        >
                                                            <h2>&gt;  {a.title} </h2>
                                                        </div>
                                                    </Link>

                                                ))}
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                ) : (
                                    // Render standard items
                                    <SidebarMenuItem key={item.title}>
                                        <Link className="flex items-center px-4 py-3 justify-between  rounded-sm shadow-sm space-x-4  hover:bg-secondary"
                                            href={item.url}
                                        >
                                            <div
                                                className="flex  cursor-pointer justify-center items-center gap-2"

                                            >
                                                <item.icon className="h-4 w-4" />
                                                <h4 className="text-sm font-semibold">
                                                    {item.title}
                                                </h4>
                                            </div>

                                        </Link>


                                    </SidebarMenuItem>
                                )
                            )}

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel><Link
                        href={'/orderForms'}
                        className="hover:underline"
                    ><h1 className="text-sm font-bold">Order Forms</h1></Link></SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {orderFormsItem.map((item) =>
                                item.altMenu ? (
                                    // Render items with `altMenu` as DropdownMenu
                                    <Collapsible key={item.url} className="group/collapsible">
                                        <SidebarMenuItem>
                                            <div className="flex items-center py-2 justify-between  rounded-sm shadow-sm space-x-4 px-4 hover:bg-secondary">
                                                <Link
                                                    href={item.url}
                                                    className="flex  cursor-pointer justify-center items-center gap-2"
                                                >
                                                    <item.icon className="h-4 w-4" />
                                                    <h4 className="text-sm font-semibold">
                                                        {item.title}
                                                    </h4>
                                                </Link>

                                                <CollapsibleTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <ChevronDown className="h-4 w-4 transition-transform duration-300 ease-in-out group-data-[state=open]/collapsible:rotate-180" />
                                                    </Button>
                                                </CollapsibleTrigger>
                                            </div>

                                            <CollapsibleContent
                                                className="transition-[height] rounded-sm p-2  duration-300 ease-in-out overflow-hidden data-[state=open]:h-auto data-[state=closed]:h-0"

                                            >
                                                {item.altMenu.map((a, i) => (
                                                    <Link
                                                        key={i}
                                                        href={a.url}>
                                                        <div
                                                            key={i}
                                                            className="cursor-pointer  rounded-sm  px-4 py-2 text-left font-mono text-sm shadow-sm hover:bg-secondary"
                                                        >
                                                            <h2>&gt;  {a.title} </h2>
                                                        </div>
                                                    </Link>

                                                ))}
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                ) : (
                                    // Render standard items
                                    <SidebarMenuItem key={item.title}>
                                        <Link className="flex items-center px-4 py-3 justify-between  rounded-sm shadow-sm space-x-4  hover:bg-secondary"
                                            href={item.url}
                                        >
                                            <div
                                                className="flex  cursor-pointer justify-center items-center gap-2"

                                            >
                                                <item.icon className="h-4 w-4" />
                                                <h4 className="text-sm font-semibold">
                                                    {item.title}
                                                </h4>
                                            </div>

                                        </Link>


                                    </SidebarMenuItem>
                                )
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="mb-4">
                <SidebarMenu className="bg-secondary rounded ">
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="hover:rounded" asChild>
                                <SidebarMenuButton>
                                    <TextSelectionIcon /> Footer Side
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <Link href={'/footerSide'}>
                                    <DropdownMenuItem>
                                        <span>Footer Text</span>
                                    </DropdownMenuItem>
                                </Link>

                                <Link href={'/footerSide'}>
                                    <DropdownMenuItem>
                                        <span>Footer Media</span>
                                    </DropdownMenuItem>
                                </Link>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>

    )
}
