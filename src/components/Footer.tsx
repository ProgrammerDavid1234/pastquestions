
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block">
              <div className="font-bold text-xl text-code-purple-600">CodeQuest<span className="text-code-blue-600">Archive</span></div>
            </Link>
            <p className="mt-4 text-gray-600">
              Your comprehensive resource for software engineering exam preparation.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/courses" className="text-gray-600 hover:text-code-purple-600 transition-colors">All Courses</Link></li>
              <li><Link to="/years" className="text-gray-600 hover:text-code-purple-600 transition-colors">Browse by Year</Link></li>
              <li><Link to="/semesters" className="text-gray-600 hover:text-code-purple-600 transition-colors">Semester Questions</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Community</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-code-purple-600 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-code-purple-600 transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-code-purple-600 transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-600 hover:text-code-purple-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-code-purple-600 transition-colors">Terms of Use</Link></li>
              <li><Link to="/copyright" className="text-gray-600 hover:text-code-purple-600 transition-colors">Copyright</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} SoftwareEngineering. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-code-purple-600 transition-colors">
              Twitter
            </a>
            <a href="#" className="text-gray-600 hover:text-code-purple-600 transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-gray-600 hover:text-code-purple-600 transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
