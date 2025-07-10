import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope } from "lucide-react";
import { login } from "../lib/api";

interface SignInProps {
  onAuth: () => void;
}

const SignIn = ({ onAuth }: SignInProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      if (data.user && data.user.fullName) {
        localStorage.setItem("realName", data.user.fullName);
      }
      onAuth();
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8 text-[#1976D2]" />
            <h1 className="text-2xl font-bold text-gray-900">MedAssist AI</h1>
          </div>
          <p className="text-sm text-gray-600 text-center">
            AI-powered voice assistant for medical professionals
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
              <Button type="submit" className="w-full bg-[#1976D2] hover:bg-[#1565C0]">
                Sign In
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#1976D2] hover:underline">
                Sign Up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
