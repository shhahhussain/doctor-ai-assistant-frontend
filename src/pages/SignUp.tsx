import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stethoscope } from "lucide-react";
import { signup } from "../lib/api";

interface SignUpProps {
  onAuth: () => void;
}

const SignUp = ({ onAuth }: SignUpProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [practiceSetting, setPracticeSetting] = useState("");
  const [country, setCountry] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const data = await signup({
        email,
        password,
        fullName,
        specialty,
        yearsOfExperience: yearsOfExperience ? Number(yearsOfExperience) : undefined,
        practiceSetting,
        country,
        preferredLanguage,
        licenseNumber
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onAuth();
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Signup failed");
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
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Create your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
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
              <div>
                <Label htmlFor="specialty">Specialty</Label>
                <Input
                  id="specialty"
                  type="text"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                <Input
                  id="yearsOfExperience"
                  type="number"
                  min="0"
                  max="50"
                  value={yearsOfExperience}
                  onChange={(e) => setYearsOfExperience(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="practiceSetting">Practice Setting</Label>
                <Input
                  id="practiceSetting"
                  type="text"
                  value={practiceSetting}
                  onChange={(e) => setPracticeSetting(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="preferredLanguage">Preferred Language</Label>
                <Input
                  id="preferredLanguage"
                  type="text"
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="licenseNumber">License Number</Label>
                <Input
                  id="licenseNumber"
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
              <Button type="submit" className="w-full bg-[#1976D2] hover:bg-[#1565C0]">
                Sign Up
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/signin" className="text-[#1976D2] hover:underline">
                Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
