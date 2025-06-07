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
import { Brain, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import CreateContentModal from "@/components/CreateContentModal"
import ContentCard from "@/components/ContentCard"
import { useState, useEffect } from "react"
import axios from "axios"
import { URL } from "@/utils/url"
import { toast } from "sonner"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contents, setContents] = useState([]);
  const [filteredContents, setFilteredContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const fetchContents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${URL}/content`, {
        headers: {
          'Authorization': token
        }
      });
      setContents(response.data.content);
      setFilteredContents(response.data.content);
      setError(null);
    } catch (err) {
      console.error("Error fetching contents:", err);
      setError("Failed to fetch contents");
      toast.error("Failed to fetch contents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  useEffect(() => {
    if (selectedType) {
      const filtered = contents.filter(content => content.type === selectedType);
      setFilteredContents(filtered);
    } else {
      setFilteredContents(contents);
    }
  }, [selectedType, contents]);

  const handleContentAdded = () => {
    fetchContents(); // Refresh content after adding new content
    setIsModalOpen(false);
  };

  const handleDeleteContent = (deletedId) => {
    fetchContents();
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type === selectedType ? null : type); // Toggle selection
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-screen">
        <AppSidebar onTypeSelect={handleTypeSelect} selectedType={selectedType} />
        <SidebarInset>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/home">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Content</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Content
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : error ? (
                <div className="text-center text-red-500">{error}</div>
              ) : filteredContents.length === 0 ? (
                <div className="text-center text-gray-500">
                  {selectedType ? `No ${selectedType} content found` : "No content found"}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredContents.map((content) => (
                    <ContentCard
                      key={content._id}
                      content={content}
                      onDelete={handleDeleteContent}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </SidebarInset>
      </div>
      <CreateContentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onContentAdded={handleContentAdded}
      />
    </SidebarProvider>
  );
}
