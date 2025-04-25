
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-code-blue-50 to-code-purple-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Software Engineering <br />
              <span className="bg-gradient-to-r from-code-blue-600 to-code-purple-600 bg-clip-text text-transparent">
                Past Questions Archive
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
              Access a comprehensive collection of the last 5 years of software engineering exam questions. Perfect for study and exam preparation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth/student">
                <Button className="bg-code-purple-600 hover:bg-code-purple-700 text-white text-lg py-6 px-8">
                  Student Login
                </Button>
              </Link>
              <Link to="/auth/teacher">
                <Button variant="outline" className="border-code-blue-600 text-code-blue-600 hover:bg-code-blue-50 text-lg py-6 px-8">
                  Teacher Login
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-code-blue-500 to-code-purple-500 rounded-lg blur opacity-30"></div>
              <div className="bg-white p-6 rounded-lg shadow-xl relative">
                <div className="grid grid-cols-2 gap-4">
                  {[2025, 2024, 2023, 2022, 2021, 2020].map((year) => (
                    <div key={year} className="bg-gray-50 p-4 rounded-md border border-gray-200 hover:border-code-purple-300 transition-colors cursor-pointer">
                      <p className="font-medium text-gray-900">{year} Questions</p>
                      <p className="text-sm text-gray-500">Software Engineering</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

