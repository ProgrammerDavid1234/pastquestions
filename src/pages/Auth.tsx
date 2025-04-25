
import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("register") ? "signup" : "login");
  const [userType, setUserType] = useState<"student" | "teacher">("student");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for login would be implemented with Supabase auth
    console.log("Login attempted");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for signup would be implemented with Supabase auth
    console.log("Signup attempted");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12 bg-gray-50">
        <div className="w-full max-w-md px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Welcome to SoftwareEngineeringPastQuestions
              </CardTitle>
              <CardDescription className="text-center">
                {activeTab === "login" ? "Sign in to your account" : "Create a new account"}
              </CardDescription>
            </CardHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="email@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" required />
                    </div>
                    <div className="flex items-center justify-between">
                      <RadioGroup defaultValue="student" className="flex space-x-4" onValueChange={(value) => setUserType(value as "student" | "teacher")}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="student" id="student-login" />
                          <Label htmlFor="student-login">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="teacher" id="teacher-login" />
                          <Label htmlFor="teacher-login">Teacher</Label>
                        </div>
                      </RadioGroup>
                      <Link to="/forgot-password" className="text-sm text-code-blue-600 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <Button className="w-full bg-code-purple-600 hover:bg-code-purple-700" type="submit">
                      Login
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignup}>
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullname">Full Name</Label>
                      <Input id="fullname" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input id="signup-email" type="email" placeholder="email@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input id="signup-password" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" required />
                    </div>
                    <div>
                      <Label>I am a:</Label>
                      <RadioGroup defaultValue="student" className="flex space-x-4 mt-2" onValueChange={(value) => setUserType(value as "student" | "teacher")}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="student" id="student-signup" />
                          <Label htmlFor="student-signup">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="teacher" id="teacher-signup" />
                          <Label htmlFor="teacher-signup">Teacher</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <Button className="w-full bg-code-purple-600 hover:bg-code-purple-700" type="submit">
                      Create Account
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
