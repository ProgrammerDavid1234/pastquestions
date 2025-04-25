
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const featuredCourses = [
  {
    courseCode: "CSC301",
    title: "Data Structures and Algorithms",
    year: 2024,
    semester: "1st" as const,
    questionCount: 12,
    isNew: true,
  },
  {
    courseCode: "CSC302",
    title: "Software Engineering",
    year: 2024,
    semester: "1st" as const,
    questionCount: 15,
    isNew: true,
  },
  {
    courseCode: "CSC401",
    title: "Database Systems",
    year: 2023,
    semester: "2nd" as const,
    questionCount: 10,
    isNew: false,
  },
  {
    courseCode: "CSC405",
    title: "Artificial Intelligence",
    year: 2023,
    semester: "2nd" as const,
    questionCount: 8,
    isNew: false,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <FeatureSection />
        
        {/* Featured Courses Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
              <Link to="/courses">
                <Button variant="outline" className="border-code-blue-600 text-code-blue-600 hover:bg-code-blue-50">
                  View All Courses
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard
                  key={course.courseCode}
                  courseCode={course.courseCode}
                  title={course.title}
                  year={course.year}
                  semester={course.semester}
                  questionCount={course.questionCount}
                  isNew={course.isNew}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-code-blue-600 to-code-purple-600 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to ace your exams?</h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Join Us today and get access to a comprehensive library of past software engineering exam questions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/auth?register=true">
                <Button className="bg-white text-code-purple-600 hover:bg-gray-100 text-lg py-6 px-8">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg py-6 px-8">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
