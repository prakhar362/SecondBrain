import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { URL } from "@/utils/url";
import ContentCard from "@/components/ContentCard";
import { toast } from "sonner";
import { User, Brain, ArrowRight, Sparkles, Share2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SharedContent() {
  const { hash } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        const response = await axios.get(`${URL}/brain/share/${hash}`);
        setContent(response.data.content);
        console.log(response.data.content);
      } catch (error) {
        console.error("Error fetching shared content:", error);
        setError(error.response?.data?.error || "Failed to load shared content");
        toast.error("This shared content is no longer available");
      } finally {
        setLoading(false);
      }
    };

    if (hash) {
      fetchSharedContent();
    }
  }, [hash]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-2">Error</h1>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-300 mb-2">Content Not Found</h1>
          <p className="text-gray-400">The shared content you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60"></div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 lg:px-12 backdrop-blur-sm bg-black/10 border-b border-purple-500/20">
        <div className="flex items-center space-x-2">
          
          <Brain className="w-8 h-8 text-purple-400 animate-pulse" />
          <Link to="/">
          <span className="text-xl font-bold text-white">NeuroNest</span>
          </Link>
        </div>
        <Link to="/auth">
          <Button variant="outline" className="border-purple-400/60 text-black hover:text-amber-50 hover:bg-purple-500/30 hover:border-purple-300 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
            Get Started
          </Button>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Shared Content</h1>
              <div className="flex items-center gap-2 bg-purple-100/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-purple-500/20">
                <User className="w-5 h-5 text-purple-400" />
                <span className="text-purple-300 font-medium">
                  Shared by {content.userId.username}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
            
            </div>
          </div>

          {/* Content Card */}
          <div className="mb-12">
            <ContentCard content={content} />
          </div>

          {/* Call to Action Section */}
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-4">Create Your Own Second Brain</h2>
                <p className="text-gray-300 mb-6">
                  Start organizing your knowledge, sharing insights, and building your personal knowledge base.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-purple-300">
                    <Sparkles className="w-5 h-5" />
                    <span>Smart Organization</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-300">
                    <Share2 className="w-5 h-5" />
                    <span>Easy Sharing</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-300">
                    <Lock className="w-5 h-5" />
                    <span>Secure & Private</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Link to="/">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 hover:from-purple-700 hover:via-purple-800 hover:to-pink-700 text-white px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40 border border-purple-400/30 hover:border-purple-300/50">
                    Start Building Your Brain
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <p className="text-gray-400 text-sm text-center">Free 14-day trial • No credit card required</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 