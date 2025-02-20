"use client";

import { useQuery } from "@tanstack/react-query";
import UserButton from "../UserButton";
import kyInstance from "@/lib/ky";
import { Skeleton } from "./skeleton";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { CompanyDetailsProps, SocialMediaProps } from "@/lib/type";
import { usePathname } from 'next/navigation';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from "react";
import { useSidebar } from "./sidebar";
import { Button } from "./button";
import { Menu } from "lucide-react";

export default function Header() {
    const { toast } = useToast();
    const { toggleSidebar } = useSidebar()


    // Fetch company details
    const {
        data: companyData,
        isLoading: isCompanyLoading,
        isError: isCompanyError,
    } = useQuery<CompanyDetailsProps>({
        queryKey: ["admin-data"],
        queryFn: () =>
            kyInstance
                .get("/api/companyDetails")
                .json<CompanyDetailsProps>(),
        staleTime: Infinity,

    });

    // Fetch social media links
    const {
        data: socialMediaData,
        isLoading: isSocialMediaLoading,
        isError: isSocialMediaError,
    } = useQuery({
        queryKey: ["social-medias"],
        queryFn: () =>
            kyInstance
                .get("/api/companyDetails/socialMedias")
                .json<SocialMediaProps[]>(),
        staleTime: Infinity,
    });

    // Handle errors for both queries
    if (isCompanyError || isSocialMediaError) {
        toast({
            title: "Error",
            description: "Failed to load header data",
            variant: "destructive",
        });
    }

    const pathname = usePathname();
    const elements = pathname.split('/').filter(Boolean); // Remove empty strings

    const path = elements.map((item, index) => {
        return {
            name: item || "Dashboard",
            src: `/${elements.slice(0, index + 1).join('/')}` // Build progressive path
        };
    });

    // Ensure the root '/' is always included
    path.unshift({ name: "Dashboard", src: "/" });


    return (
        <>
            <div className="sticky top-0 z-10 bg-secondary shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-center flex-wrap gap-5 px-5 py-3">
                    <Button className='bg-secondary border border-primary rounded-xl hover:bg-secondary' onClick={toggleSidebar}>
                        <Menu className="text-primary w-5 h-5" />
                    </Button>

                    <Link href="/" className="text-2xl text-primary font-bold">
                        Vusal Dashboard
                    </Link>

                    {isCompanyLoading && (
                        <button>
                            <Skeleton className="h-16 w-16 bg-muted-foreground rounded-full" />
                        </button>
                    )}
                    {companyData && (
                        <UserButton
                            avatarUrl={companyData.company_logo_src || ""}
                            ownerName={companyData.fullName || "Unknown"}
                            className="sm:ms-auto"
                        />
                    )}
                </div>
            </div>

            {path.length !== 1 && <Breadcrumb className="mt-8  mx-auto sm:mx-8">
                <BreadcrumbList>
                    {path.map((item, index) => (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbLink className="capitalize font-bold text-[15px]" href={item.src}>
                                    {item.name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {index !== path.length - 1 && <BreadcrumbSeparator />}
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>}


        </>

    );
}