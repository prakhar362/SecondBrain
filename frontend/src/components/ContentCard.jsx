import {
  Link as LinkIcon,
  Share2,
  Trash2,
  FileText,
  PlayCircle,
  Twitter,
  Copy,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState,useEffect } from "react";
import axios from "axios";
import { URL } from "@/utils/url";
import Home from "@/pages/Dashboard/Home";
import { toast } from "sonner";

const FRONTEND_URL = "https://neuronest-lemon.vercel.app"; // Frontend URL for sharing

const tagColors = [
  "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
  "bg-gradient-to-r from-green-500 to-green-600 text-white",
  "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white",
  "bg-gradient-to-r from-purple-500 to-purple-600 text-white",
  "bg-gradient-to-r from-pink-500 to-pink-600 text-white",
];

export default function ContentCard({ content, onDelete }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  // Check if the content has a link and fetch the image
  useEffect(() => {
    const fetchImage = async () => {
      if (content?.link) {
        try {
          const url = content.link;
          
          setIsLoadingImage(true);
          const response = await axios.get(
            `https://api.microlink.io/?url=${encodeURIComponent(url)}`
          );
          console.log("Thumbnail url recived: ",response.data?.data?.image?.url);
          setImageUrl(response.data?.data?.image?.url || null);
        } catch (error) {
          console.error("Error fetching link preview:", error);
          setImageUrl(null);
        } finally {
          setIsLoadingImage(false);
        }
      } else {
        setImageUrl(null);
      }
    };

    fetchImage();
    
    // Cleanup function to reset state when component unmounts or content changes
    return () => {
      setImageUrl(null);
      setIsLoadingImage(false);
    };
  }, [content]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${URL}/content`, {
        headers: {
          'Authorization': token
        },
        data: {
          contentId: content._id
        }
      });

      if (response.data.message === "Deleted successfully") {
        toast.success("Content deleted successfully");
        if (typeof onDelete === 'function') {
          onDelete(content._id);
        }

      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.error || "Failed to delete content");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleShare = async () => {
    try {
      setIsSharing(true);
      const token = localStorage.getItem('token');
      const response = await axios.post(`${URL}/brain/share`, {
        contentId: content._id,
        share: true
      }, {
        headers: {
          'Authorization': token
        }
      });

      const shareableLink = `${FRONTEND_URL}/shared/${response.data.hash}`;
      setShareLink(shareableLink);
      setIsShareDialogOpen(true);
    } catch (error) {
      console.error("Share error:", error);
      toast.error(error.response?.data?.error || "Failed to share content");
    } finally {
      setIsSharing(false);
    }
  };

  const handleUnshare = async () => {
    try {
      setIsSharing(true);
      const token = localStorage.getItem('token');
      await axios.post(`${URL}/brain/share`, {
        contentId: content._id,
        share: false
      }, {
        headers: {
          'Authorization': token
        }
      });
      
      setShareLink("");
      setIsShareDialogOpen(false);
      toast.success("Content unshared successfully");
    } catch (error) {
      console.error("Unshare error:", error);
      toast.error(error.response?.data?.error || "Failed to unshare content");
    } finally {
      setIsSharing(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      toast.success("Shareable link copied to clipboard!", {
        duration: 2000,
        position: "bottom-center",
        style: {
          background: "#10B981",
          color: "white",
          border: "none",
        },
      });
    } catch (error) {
      toast.error("Failed to copy link", {
        duration: 2000,
        position: "bottom-center",
        style: {
          background: "#EF4444",
          color: "white",
          border: "none",
        },
      });
    }
  };

  const renderIcon = (type) => {
    const iconClasses = "h-5 w-5";
    switch (type) {
      case "article":
        return <FileText className={`${iconClasses} text-sky-500`} />;
      case "video":
        return <PlayCircle className={`${iconClasses} text-purple-500`} />;
      case "social":
        return <Twitter className={`${iconClasses} text-blue-500`} />;
      default:
        return <FileText className={`${iconClasses} text-muted-foreground`} />;
    }
  };

  const getTagColorClass = (index) => {
    return tagColors[index % tagColors.length];
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
        {content?.link && (
          <div className="w-full h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
            {isLoadingImage ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-pulse">Loading preview...</div>
              </div>
            ) : imageUrl ? (
              <img 
                src={imageUrl} 
                alt="Link preview" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  setImageUrl(null);
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
                <LinkIcon className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>
        )}
        <CardHeader className="p-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {renderIcon(content.type)}
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {content.title || 'Untitled'}
              </CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <div 
                className="p-1.5 rounded-lg bg-background/50 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-200 cursor-pointer group-hover:scale-110"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 text-muted-foreground hover:text-purple-600 transition-colors" />
              </div>
              <div 
                className="p-1.5 rounded-lg bg-background/50 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200 cursor-pointer group-hover:scale-110"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500 transition-colors" />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-4 space-y-3">
          {content.link && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-800/50">
              <div className="p-1 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                <LinkIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <a
                href={content.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline truncate font-medium transition-colors"
              >
                {content.link}
              </a>
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-0 flex flex-col items-start gap-4">
          {content.tags && content.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {content.tags.map((tag, index) => (
                <Badge
                  key={index}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold border-0 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 ${getTagColorClass(index)}`}
                >
                  #{tag.title}
                </Badge>
              ))}
            </div>
          )}
          <div className="w-full flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium bg-muted/50 px-2 py-1 rounded-lg">
              Added on {new Date(content.createdAt).toLocaleDateString()}
            </span>
            <div className="h-1 w-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
          </div>
        </CardFooter>
      </Card>

      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Content</DialogTitle>
            <DialogDescription>
              Share this content with others using the link below.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
            <input
              type="text"
              value={shareLink}
              readOnly
              className="flex-1 bg-transparent border-none outline-none text-sm font-mono"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              className="hover:bg-background transition-colors"
              title="Copy to clipboard"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={handleUnshare}
              disabled={isSharing}
            >
              {isSharing ? "Unsharing..." : "Unshare"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the content
              "{content.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
