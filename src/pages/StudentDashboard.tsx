import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CourseCard from "@/components/CourseCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface PastQuestion {
  id: string;
  title: string;
  course_code: string;
  year: number;
  semester: "1st" | "2nd";
  description: string | null;
  file_path: string;
  created_at: string;
  updated_at: string;
  teacher_id: string;
  users?: {
    full_name: string | null;
    email: string;
  };
}

const StudentDashboard = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [semesterFilter, setSemesterFilter] = useState<string>("all");

  const { data: pastQuestions = [] } = useQuery({
    queryKey: ['past-questions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('past_questions')
        .select(`
          *,
          users (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as PastQuestion[] || [];
    },
  });

  const handleDownload = async (filePath: string) => {
    try {
      console.log("Downloading file:", filePath);
      
      const fileName = filePath.split('/').pop() || 'question.pdf';
      
      toast({
        title: "Starting download",
        description: `Preparing ${fileName} for download...`
      });
      
      const downloadUrl = `/api/download?path=${encodeURIComponent(filePath)}`;
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
      
      toast({
        title: "Download started",
        description: "If the file doesn't open automatically, check your downloads folder."
      });
      
      if (user) {
        try {
          const { error: viewError } = await supabase
            .from('student_views')
            .insert({
              student_id: user.id,
              question_id: pastQuestions.find(q => q.file_path === filePath)?.id
            });
          
          if (viewError) {
            console.error("Error recording view:", viewError);
          }
        } catch (viewErr) {
          console.error("Failed to record view:", viewErr);
        }
      }
    } catch (error) {
      console.error('Error initiating download:', error);
      toast({
        title: "Download failed",
        description: "There was an error downloading the file. Please try again.",
        variant: "destructive"
      });
    }
  };

  const filteredQuestions = pastQuestions.filter((question) => {
    const matchesSearch = 
      question.course_code.toLowerCase().includes(searchTerm.toLowerCase()) || 
      question.title.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesYear = yearFilter === "all" || question.year.toString() === yearFilter;
    const matchesSemester = 
      semesterFilter === "all" || 
      (semesterFilter === "1st" && question.semester === "1st") || 
      (semesterFilter === "2nd" && question.semester === "2nd");
      
    return matchesSearch && matchesYear && matchesSemester;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user?.email}</h1>
        
        <Tabs defaultValue="courses">
          <TabsList className="mb-6">
            <TabsTrigger value="courses">All Courses</TabsTrigger>
            <TabsTrigger value="recent">Recent Questions</TabsTrigger>
            <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses">
            <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-medium mb-4">Find Past Questions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search by course code or title..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div>
                  <Select value={yearFilter} onValueChange={setYearFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      {Array.from(new Set(pastQuestions.map(q => q.year))).sort().reverse().map((year) => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by Semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Semesters</SelectItem>
                      <SelectItem value="1st">1st Semester</SelectItem>
                      <SelectItem value="2nd">2nd Semester</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((question) => (
                  <CourseCard
                    key={question.id}
                    courseCode={question.course_code}
                    title={question.title}
                    year={question.year}
                    semester={question.semester}
                    questionCount={1}
                    isNew={new Date(question.created_at).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000}
                    filePath={question.file_path}
                    onDownload={() => handleDownload(question.file_path)}
                  />
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <p className="text-lg text-gray-500">No questions match your search criteria.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="recent">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h2 className="text-2xl font-medium mb-4">Recent Questions</h2>
              <p className="text-gray-500">Your recently viewed questions will appear here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="bookmarks">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h2 className="text-2xl font-medium mb-4">Bookmarks</h2>
              <p className="text-gray-500">Your bookmarked questions will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default StudentDashboard;
