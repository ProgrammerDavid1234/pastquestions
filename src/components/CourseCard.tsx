
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CourseCardProps {
  courseCode: string;
  title: string;
  year: number;
  semester: "1st" | "2nd";
  questionCount: number;
  isNew?: boolean;
  filePath?: string;
  onDownload?: () => void;
}

const CourseCard = ({ 
  courseCode, 
  title, 
  year, 
  semester, 
  questionCount,
  isNew = false,
  filePath,
  onDownload
}: CourseCardProps) => {
  
  const handleDownload = async () => {
    if (onDownload) {
      try {
        toast({
          title: "Preparing download",
          description: `Getting ${courseCode} question paper...`
        });
        
        // Call the parent component's download handler
        onDownload();
      } catch (error) {
        console.error("Download error:", error);
        toast({
          title: "Download failed",
          description: "There was an error downloading the file. Please try again.",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Download unavailable",
        description: "This question paper is currently unavailable for download.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="h-full hover:border-code-purple-300 hover:shadow-md transition-all">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">{courseCode}</CardTitle>
          {isNew && (
            <Badge className="bg-code-purple-500">New</Badge>
          )}
        </div>
        <CardDescription className="text-base font-medium text-gray-800">{title}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-100">
            {year}
          </Badge>
          <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-100">
            {semester} Semester
          </Badge>
          <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-100">
            {questionCount} Questions
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-code-blue-600 hover:bg-code-blue-700"
          onClick={handleDownload}
        >
          <FileDown className="mr-2 h-4 w-4" /> Download Question
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
