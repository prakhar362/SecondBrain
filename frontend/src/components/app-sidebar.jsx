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
import { 
  Brain, 
  Image, 
  Video, 
  FileText, 
  Music, 
  File, 
  MoreHorizontal, 
  Twitter, 
  StickyNote,
  LogOut 
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { URL } from '@/utils/url'

// This is sample data.
const data = {
  navMain: [
    {
      title: "Content Types",
      items: [
        {
          title: "Images",
          icon: <Image className="w-4 h-4" />,
          type: "image"
        },
        {
          title: "Videos",
          icon: <Video className="w-4 h-4" />,
          type: "video"
        },
        {
          title: "Articles",
          icon: <FileText className="w-4 h-4" />,
          type: "article"
        },
        {
          title: "Audio",
          icon: <Music className="w-4 h-4" />,
          type: "audio"
        },
        {
          title: "Documents",
          icon: <File className="w-4 h-4" />,
          type: "document"
        },
        {
          title: "Social",
          icon: <Twitter className="w-4 h-4" />,
          type: "social"
        },
        {
          title: "Notes",
          icon: <StickyNote className="w-4 h-4" />,
          type: "note"
        },
        {
          title: "Other",
          icon: <MoreHorizontal className="w-4 h-4" />,
          type: "other"
        },
      ],
    },
  ],
}

export function AppSidebar({
  onTypeSelect,
  selectedType,
  ...props
}) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      const res=await axios.post(`${URL}/logout`, {}, {
        headers: {
          'Authorization': token
        }
      });
      
      // Remove token from localStorage
      localStorage.removeItem('token');
      console.log("Response from server",res);
      // Redirect to auth page
      navigate('/auth');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if the server request fails, we should still log the user out locally
      localStorage.removeItem('token');
      navigate('/auth');
    }
  };

  return (
    (<Sidebar {...props} className="flex flex-col h-full">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-3">
          <Brain className="w-6 h-6 text-purple-800" />
          <span className="font-semibold">Second Brain</span>
        </div>
        <SearchForm className="pt-1" />
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto">
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={selectedType === item.type}
                      onClick={() => onTypeSelect(item.type)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        {item.title}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      {/* Logout Button - Fixed at bottom */}
      <div className="sticky bottom-0 left-0 right-0 p-2 sm:p-4 bg-background border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200 hover:border-red-300"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </Sidebar>)
  );
}
