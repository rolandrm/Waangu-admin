"use client";




import { IconCamera, IconCar, IconChartBar, IconDashboard, IconDatabase, IconFileAi, IconFileDescription, IconFileWord, IconFolder, IconHelp, IconInnerShadowTop, IconListDetails, IconReport, IconSearch, IconSettings, IconUsers } from "@tabler/icons-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
// import { NavSecondary } from "@/components/nav-secondary";
// import { NavDocuments } from "@/components/nav-documents";
// import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
// import { Button } from "./ui/button";
import * as React from "react";
import Link from "next/link";




const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Taxi",
      url: "/taxi",
      icon: IconCar,
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Projects",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Team",
      url: "#",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      title: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      title: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      title: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
};




type TNavGroupProps = {
  url_prefix: string;
  navs: {
    title: string;
    url: string;
    icon: typeof IconCamera;
  }[]
}
function NavGroups({ navs, url_prefix }: TNavGroupProps) {
  return <SidebarGroup>
    <SidebarGroupContent className="flex flex-col gap-2">
      {/* <SidebarMenu>
        <SidebarMenuItem className="flex items-center gap-2">
          <SidebarMenuButton
            tooltip="Quick Create"
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
          >
            <IconCirclePlusFilled />
            <span>Quick Create</span>
          </SidebarMenuButton>
          <Button
            size="icon"
            className="size-8 group-data-[collapsible=icon]:opacity-0"
            variant="outline"
          >
            <IconMail />
            <span className="sr-only">Inbox</span>
          </Button>
        </SidebarMenuItem>
      </SidebarMenu> */}
      <SidebarMenu>
        {
          navs.map((item) => <Link key={item.title} href={url_prefix + item.url}>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>)
        }
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
};




export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return <Sidebar collapsible="offcanvas" {...props}>
    {/* <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
            <a href="#">
              <IconInnerShadowTop className="!size-5" />
              <span className="text-base font-semibold">
                Waangu Taxi-Admin
              </span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader> */}

    <SidebarContent>
      <NavGroups navs={data.navMain} url_prefix="/dashboard" />
      <NavGroups navs={data.documents} url_prefix="/dashboard" />
      <NavGroups navs={data.navSecondary} url_prefix="/dashboard" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser user={data.user} />
    </SidebarFooter>
  </Sidebar>;
};