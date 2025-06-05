import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Brain, Plus, Share2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import CreateContentModal from "@/components/CreateContentModal"
import ContentCard from "@/components/ContentCard"
import { useState, useEffect } from "react"
import axios from "axios"
import { URL } from "@/utils/url"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContents = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await axios.get(`${URL}/content`, {
        headers: {
          'Authorization': token
        }
      });
      setContents(response.data.content);
      setError(null);
    } catch (err) {
      console.error("Error fetching contents:", err);
      setError("Failed to fetch contents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const handleContentAdded = () => {
    fetchContents(); // Refresh content after adding new content
    setIsModalOpen(false);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#" className="flex items-center gap-2">
                    <Brain className="w-6 h-6 text-purple-800 animated-pulse " />
                    <span className="font-semibold text-black font-stretch-75%">Second Brain</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2" 
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add Content
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <p>Loading contents...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-32 text-red-500">
              <p>{error}</p>
            </div>
          ) : contents.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              <p>No contents yet. Add your first content!</p>
            </div>
          ) : (
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              {contents.map((content) => (
                <ContentCard key={content._id} content={content} />
              ))}
            </div>
          )}
        </div>
      </SidebarInset>
      <CreateContentModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onContentAdded={handleContentAdded}
      />
    </SidebarProvider>
  )
}
