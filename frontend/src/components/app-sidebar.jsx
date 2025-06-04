import * as React from "react"
import { SearchForm } from "@/components/search-form"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Brain, Twitter, Video, FileText, Link2, Tags } from 'lucide-react'

// This is sample data.
const data = {
  navMain: [
    {
      title: "Content",
      items: [
        {
          title: "Tweets",
          url: "#",
          icon: <Twitter className="w-4 h-4" />,
        },
        {
          title: "Videos",
          url: "#",
          icon: <Video className="w-4 h-4" />,
        },
        {
          title: "Documents",
          url: "#",
          icon: <FileText className="w-4 h-4" />,
        },
        {
          title: "Links",
          url: "#",
          icon: <Link2 className="w-4 h-4" />,
        },
        {
          title: "Tags",
          url: "#",
          icon: <Tags className="w-4 h-4" />,
        },
      ],
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-3">
          <Brain className="w-6 h-6 text-purple-800" />
          <span className="font-semibold">Second Brain</span>
        </div>
        <SearchForm className="pt-1" />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url} className="flex items-center gap-2">
                        {item.icon}
                        {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>)
  );
}
