import {
  Link as LinkIcon,
  Share2,
  Trash2,
  FileText,
  PlayCircle,
  Twitter,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tagColors = [
  "bg-blue-100 text-blue-800",
  "bg-green-100 text-green-800",
  "bg-yellow-100 text-yellow-800",
  "bg-purple-100 text-purple-800",
  "bg-pink-100 text-pink-800",
];

export default function ContentCard({ content }) {
  const renderIcon = (type) => {
    switch (type) {
      case "article":
        return <FileText className="h-4 w-4 text-sky-600" />;
      case "video":
        return <PlayCircle className="h-4 w-4 text-purple-600" />;
      case "social":
        return <Twitter className="h-4 w-4 text-blue-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTagColorClass = (index) => {
    return tagColors[index % tagColors.length];
  };

  return (
    <Card className="w-full max-w-sm border border-gray-200 shadow-sm rounded-xl transition hover:shadow-md bg-white">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {renderIcon(content.type)}
            <CardTitle className="text-base font-semibold text-gray-800 line-clamp-2">
              {content.title}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2 text-gray-400 pt-1">
            <Share2 className="h-4 w-4 hover:text-gray-600 cursor-pointer" />
            <Trash2 className="h-4 w-4 hover:text-red-500 cursor-pointer" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="text-sm pb-4 space-y-2">
        {content.link && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <LinkIcon className="h-4 w-4 text-blue-500" />
            <a
              href={content.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline truncate"
            >
              {content.link}
            </a>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 flex flex-col items-start gap-2">
        <div className="flex flex-wrap gap-2">
          {content.tags &&
            content.tags.map((tag, index) => (
              <Badge
                key={index}
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${getTagColorClass(index)}`}
              >
                #{tag.title}
              </Badge>
            ))}
        </div>
        <span className="text-xs text-gray-500">
          Added on {new Date(content.createdAt).toLocaleDateString()}
        </span>
      </CardFooter>
    </Card>
  );
}
