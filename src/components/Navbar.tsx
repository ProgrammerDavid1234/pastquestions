
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <div className="font-bold text-2xl text-code-purple-600">CodeQuest<span className="text-code-blue-600">Archive</span></div>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            <>
              <Link to="/courses" className="text-gray-700 hover:text-code-purple-600 transition-colors">
                Courses
              </Link>
              <Button variant="outline" onClick={signOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/" className="text-gray-700 hover:text-code-purple-600 transition-colors">
                Home
              </Link>
              <Link to="/courses" className="text-gray-700 hover:text-code-purple-600 transition-colors">
                Courses
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-code-purple-600 transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-code-purple-600 transition-colors">
                Contact
              </Link>
              <div className="ml-4 space-x-2">
                <Link to="/auth/student">
                  <Button variant="outline" className="border-code-blue-600 text-code-blue-600 hover:bg-code-blue-50">
                    Student Login
                  </Button>
                </Link>
                <Link to="/auth/teacher">
                  <Button className="bg-code-purple-600 hover:bg-code-purple-700 text-white">
                    Teacher Login
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white pt-16 px-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
            className="absolute top-4 right-4"
          >
            <X />
          </Button>

          <div className="flex flex-col space-y-4 pt-4">
            {user ? (
              <>
                <Link to="/courses" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full text-left">
                    Courses
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => {
                  signOut();
                  toggleMenu();
                }} className="w-full">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth/student" onClick={toggleMenu}>
                  <Button variant="outline" className="w-full border-code-blue-600 text-code-blue-600 hover:bg-code-blue-50">
                    Student Login
                  </Button>
                </Link>
                <Link to="/auth/teacher" onClick={toggleMenu}>
                  <Button className="w-full bg-code-purple-600 hover:bg-code-purple-700 text-white">
                    Teacher Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
