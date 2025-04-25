
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const UploadPastQuestion = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Past Question</CardTitle>
            <CardDescription>Upload new past questions for students</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Upload form will be implemented later */}
            <p>Upload functionality coming soon...</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default UploadPastQuestion;
