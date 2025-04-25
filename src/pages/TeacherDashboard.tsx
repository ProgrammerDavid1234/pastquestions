
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { Download, FileText, Upload, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

// Define a type for the past question items
type PastQuestion = {
  id: string;
  title: string;
  course_code: string;
  year: number;
  semester: string;
  description: string | null;
  file_path: string;
  created_at: string;
  updated_at: string;
  teacher_id: string;
  // Add derived properties
  downloads: number;
  uploadDate: string;
};

const TeacherDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    courseCode: "",
    year: new Date().getFullYear().toString(),
    semester: "1st" as "1st" | "2nd",
    description: "",
  });

  const { data: uploadedQuestions = [], refetch } = useQuery({
    queryKey: ['teacher-questions', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('past_questions')
        .select('*')
        .eq('teacher_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to add the derived properties
      return (data || []).map(question => ({
        ...question,
        downloads: 0, // Default value since we don't track downloads yet
        uploadDate: new Date(question.created_at).toLocaleDateString()
      })) as PastQuestion[];
    },
    enabled: !!user?.id,
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleUpload = async (files: FileList) => {
    if (!files || !files[0]) return;
    
    try {
      setUploading(true);
      const file = files[0];
      
      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('past_questions')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('past_questions')
        .insert([
          {
            title: formData.title,
            course_code: formData.courseCode,
            year: parseInt(formData.year),
            semester: formData.semester,
            description: formData.description,
            file_path: filePath,
            teacher_id: user?.id,
          },
        ]);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Past question uploaded successfully",
      });

      setFormData({
        title: "",
        courseCode: "",
        year: new Date().getFullYear().toString(),
        semester: "1st",
        description: "",
      });

      refetch();

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUpload(e.target.files);
    }
  };

  const handleDelete = async (questionId: string, filePath: string) => {
    try {
      const { error: storageError } = await supabase.storage
        .from('past_questions')
        .remove([filePath]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('past_questions')
        .delete()
        .eq('id', questionId);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Past question deleted successfully",
      });

      refetch();

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user?.email}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Uploads</CardTitle>
              <FileText className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uploadedQuestions.length}</div>
              <p className="text-xs text-gray-500">Past questions uploaded</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
              <Download className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {uploadedQuestions.reduce((total, q) => total + q.downloads, 0)}
              </div>
              <p className="text-xs text-gray-500">Student downloads</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Newest Upload</CardTitle>
              <Upload className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-md font-bold">
                {uploadedQuestions.length > 0 ? uploadedQuestions[0].title : "No uploads yet"}
              </div>
              <p className="text-xs text-gray-500">
                {uploadedQuestions.length > 0 ? uploadedQuestions[0].uploadDate : "N/A"}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="uploads">
          <TabsList className="mb-6">
            <TabsTrigger value="uploads">Your Uploads</TabsTrigger>
            <TabsTrigger value="upload">Upload New</TabsTrigger>
          </TabsList>
          
          <TabsContent value="uploads">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="py-3 px-4 font-medium">Title</th>
                      <th className="py-3 px-4 font-medium">Course</th>
                      <th className="py-3 px-4 font-medium">Year</th>
                      <th className="py-3 px-4 font-medium">Semester</th>
                      <th className="py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {uploadedQuestions.map((question) => (
                      <tr key={question.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4">{question.title}</td>
                        <td className="py-3 px-4">{question.course_code}</td>
                        <td className="py-3 px-4">{question.year}</td>
                        <td className="py-3 px-4">{question.semester}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDelete(question.id, question.file_path)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="upload">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-medium mb-4">Upload New Past Question</h2>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div 
                  className={`border-2 border-dashed rounded-lg p-10 text-center ${
                    dragActive ? "border-code-purple-500 bg-code-purple-50" : "border-gray-300"
                  }`}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="mb-2 text-lg font-medium">Drag and drop file here</p>
                  <p className="mb-4 text-sm text-gray-500">or</p>
                  <Button
                    type="button"
                    className="bg-code-blue-600 hover:bg-code-blue-700"
                    onClick={() => document.getElementById("file-upload")?.click()}
                    disabled={uploading}
                  >
                    {uploading ? "Uploading..." : "Browse Files"}
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    disabled={uploading}
                  />
                  <p className="mt-4 text-sm text-gray-500">
                    Supported formats: PDF, Word (.doc, .docx)
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Course Code</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-md"
                      placeholder="e.g. CSC301"
                      value={formData.courseCode}
                      onChange={(e) => setFormData(prev => ({ ...prev, courseCode: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Year</label>
                    <select 
                      className="w-full px-4 py-2 border rounded-md"
                      value={formData.year}
                      onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                    >
                      {Array.from({ length: 5 }, (_, i) => (
                        <option key={i} value={new Date().getFullYear() - i}>
                          {new Date().getFullYear() - i}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Semester</label>
                    <select 
                      className="w-full px-4 py-2 border rounded-md"
                      value={formData.semester}
                      onChange={(e) => setFormData(prev => ({ ...prev, semester: e.target.value as "1st" | "2nd" }))}
                    >
                      <option>1st</option>
                      <option>2nd</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="e.g. Data Structures Final Exam"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description (Optional)</label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-md"
                    rows={3}
                    placeholder="Add any additional information about this past question"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  ></textarea>
                </div>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default TeacherDashboard;
