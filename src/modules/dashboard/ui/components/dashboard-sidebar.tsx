"use client";

import{
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";

import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@radix-ui/react-separator";

const firstSection = [
{
    icons: VideoIcon,
    label: "Meetings",
    href: "/meetings",
},

{
    icons: BotIcon,
    label: "Agents",
    href: "/agents",
},
]

const secondSection = [
{
    icons: StarIcon,
    label: "Upgrade",
    href: "/upgrade",
},

]

export const DashboardSidebar = () => {
    return (
        <Sidebar>
            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link href="/dashboard" className="flex items-center gap-2 px-2 pt-2">
                        <Image src="/logo.svg" alt="Logo" className="h-8 w-8" width={32} height={32} />
                        <span className="text-lg font-semibold">Meet.Ai</span>
                    </Link>
                </SidebarHeader>
                <div className="px-4 py-2">
                    <Separator className="opacity-100 text-[#5D6B68]" />
                </div>
        </Sidebar>
    )
};