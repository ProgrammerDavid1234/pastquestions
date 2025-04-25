
import { BookOpen, Calendar, Download, Users } from "lucide-react";

const features = [
  {
    icon: <Calendar className="w-12 h-12 text-code-blue-500" />,
    title: "5 Years of Past Questions",
    description:
      "Access a comprehensive archive of software engineering exam questions from the past five years."
  },
  {
    icon: <Download className="w-12 h-12 text-code-purple-500" />,
    title: "Easy Downloads",
    description:
      "Download past questions in PDF format for easy viewing online or offline studying."
  },
  {
    icon: <BookOpen className="w-12 h-12 text-code-blue-500" />,
    title: "Course Categorization",
    description:
      "Find questions organized by course code, year, and semester for efficient navigation."
  },
  {
    icon: <Users className="w-12 h-12 text-code-purple-500" />,
    title: "Student & Teacher Access",
    description:
      "Separate interfaces for students to access questions and teachers to manage content."
  }
];

const FeatureSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Exam Preparation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We provide the resources you need to excel in your software engineering courses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:border-code-purple-200 transition-all hover:shadow-md"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
