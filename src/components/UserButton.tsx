import { DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Avatar from "./Avatar";
import { CheckIcon, Monitor, Moon, SearchCodeIcon, SquareActivityIcon, StoreIcon, Sun, Table2Icon, TabletIcon, TextQuoteIcon, UserIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

interface UserButtonProps {
    className?: string;
    avatarUrl: string;
    ownerName: string;
}

export default function UserButton({ className, avatarUrl, ownerName }: UserButtonProps) {
    const { theme, setTheme } = useTheme()
    return <DropdownMenu >
        <DropdownMenuTrigger asChild>
            <button className={cn("flex-none rounded-ful", className)}>
                <Avatar className="bg-card" avatarUrl={avatarUrl} size={60} />
            </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>

            <DropdownMenuLabel className="flex items-center justify-start py-2 px-3">
                <UserIcon className="mr-2 size-4" />
                Hello, @{ownerName}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuSub>
                <DropdownMenuSubTrigger className="felx items-center justify-between py-2 px-3" >
                    <StoreIcon className="mr-2 size-4" />
                    Company Informations
                </DropdownMenuSubTrigger>

                <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                        <Link
                            href={'/company/companyDetails'}
                        >
                            <DropdownMenuItem className="flex gap-2 items-center justify-start py-2 px-3 cursor-pointer hover:bg-secondary hover:rounded-xl" >
                                <Table2Icon className="mr-2 size-4" />
                                Company details
                            </DropdownMenuItem>
                        </Link>
                        <Link
                            href={'/company/socialMedias'}
                        >
                            <DropdownMenuItem className="flex gap-2 items-center justify-start py-2 px-3 cursor-pointer  hover:bg-secondary hover:rounded-xl" >
                                <TabletIcon className="mr-2 size-4" />
                                Company platforms
                            </DropdownMenuItem>
                        </Link>


                    </DropdownMenuSubContent>
                </DropdownMenuPortal>

            </DropdownMenuSub>

            <DropdownMenuSeparator />
            <DropdownMenuSub>
                <DropdownMenuSubTrigger className="felx items-center justify-between py-2 px-3" >
                    <SquareActivityIcon className="mr-2 size-4" />
                    Footer Side
                </DropdownMenuSubTrigger>

                <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                        <Link
                            href={'/footerSide'}
                        >
                            <DropdownMenuItem className="flex gap-2 items-center justify-start py-2 px-3 cursor-pointer hover:bg-secondary hover:rounded-xl" >
                                <SearchCodeIcon className="mr-2 size-4" />
                                Footer text and media
                            </DropdownMenuItem>
                        </Link>

                    </DropdownMenuSubContent>
                </DropdownMenuPortal>

            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
                <DropdownMenuSubTrigger className="felx items-center justify-between py-2 px-3" >
                    <Monitor className="mr-2 size-4" />
                    Theme
                </DropdownMenuSubTrigger>

                <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={() => setTheme("system")} className="flex gap-2 items-center justify-start py-2 px-3 cursor-pointer" >
                            <Sun className="mr-2 size-4" />
                            Light
                            {theme == "system" && <CheckIcon className="mr-2 size-4" />}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")} className="flex gap-2 items-center justify-start py-2 px-3 cursor-pointer" >
                            <Moon className="mr-2 size-4" />
                            Dark
                            {theme == "dark" && <CheckIcon className="mr-2 size-4" />}
                        </DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>

            </DropdownMenuSub>
        </DropdownMenuContent>
    </DropdownMenu>
}
