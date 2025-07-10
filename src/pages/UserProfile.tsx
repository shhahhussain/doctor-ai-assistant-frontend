import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Settings, Shield, Palette } from "lucide-react";
import { getProfile, changePassword } from "../lib/api";

const UserProfile = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState<any>(null)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [changePasswordError, setChangePasswordError] = useState("")
  const [changePasswordSuccess, setChangePasswordSuccess] = useState("")

  useEffect(() => {
    const authToken = localStorage.getItem("token")
    if (!authToken) {
      navigate("/signin")
    } else {
      getProfile().then(setProfile)
    }
  }, [navigate])

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-3">
            <User className="h-6 w-6 text-[#1976D2]" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
              <p className="text-gray-600">Manage your account settings and preferences</p>
            </div>
          </div>
        </div>

        <div className="p-6 max-w-4xl mx-auto space-y-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Information</span>
              </CardTitle>
              <CardDescription>
                Update your personal and professional information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-[#1976D2] rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{profile ? (profile.fullName || profile.email || "U").split(" ").map((n: string) => n[0]).join("") : "U"}</span>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">Change Photo</Button>
                  <p className="text-sm text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" value={profile?.fullName || ""} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={profile?.email || ""} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Medical Specialty</Label>
                  <Input id="specialty" value={profile?.specialty || ""} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">Medical License</Label>
                  <Input id="license" value={profile?.licenseNumber || ""} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                  <Input id="yearsOfExperience" value={profile?.yearsOfExperience || ""} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="practiceSetting">Practice Setting</Label>
                  <Input id="practiceSetting" value={profile?.practiceSetting || ""} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" value={profile?.country || ""} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredLanguage">Preferred Language</Label>
                  <Input id="preferredLanguage" value={profile?.preferredLanguage || ""} readOnly />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-[#1976D2] hover:bg-[#1565C0]">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>AI Assistant Preferences</span>
              </CardTitle>
              <CardDescription>
                Configure your AI assistant settings and default prompts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultModel">Default AI Model</Label>
                  <Select defaultValue="gpt-4o">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="claude-3">Claude 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultPrompt">Default Prompt Set</Label>
                  <Select defaultValue="general-medicine">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general-medicine">General Medicine</SelectItem>
                      <SelectItem value="cardiology">Cardiology Focused</SelectItem>
                      <SelectItem value="emergency">Emergency Medicine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Feature Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Voice-Only Mode</p>
                      <p className="text-sm text-gray-600">Enable hands-free operation</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-Pin Important Notes</p>
                      <p className="text-sm text-gray-600">Automatically save critical findings to patient memory</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Real-time Transcription</p>
                      <p className="text-sm text-gray-600">Show live transcription during sessions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Usage Statistics</CardTitle>
              <CardDescription>
                Your activity summary and patient management stats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#1976D2]">24</p>
                  <p className="text-sm text-gray-600">Active Patients</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#81C784]">156</p>
                  <p className="text-sm text-gray-600">Total Sessions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#FFB74D]">89</p>
                  <p className="text-sm text-gray-600">AI Analyses</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">12</p>
                  <p className="text-sm text-gray-600">Custom Prompts</p>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="font-medium mb-3">Recent Activity</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Last session with Ali Rehman</span>
                    <span className="text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Created new prompt template</span>
                    <span className="text-gray-500">1 day ago</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Updated patient notes for Sarah Khan</span>
                    <span className="text-gray-500">2 days ago</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security & Privacy</span>
              </CardTitle>
              <CardDescription>
                Manage your account security and data privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600">Add an extra layer of security</p>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Enabled
                </Badge>
              </div>
              
              <Separator />
              
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  setChangePasswordError("")
                  setChangePasswordSuccess("")
                  try {
                    await changePassword(oldPassword, newPassword)
                    setChangePasswordSuccess("Password changed successfully")
                    setOldPassword("")
                    setNewPassword("")
                  } catch (err: any) {
                    setChangePasswordError(err.response?.data?.error || "Failed to change password")
                  }
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="oldPassword">Old Password</Label>
                  <Input id="oldPassword" type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                </div>
                {changePasswordError && <div className="text-red-500 text-sm">{changePasswordError}</div>}
                {changePasswordSuccess && <div className="text-green-600 text-sm">{changePasswordSuccess}</div>}
                <Button type="submit" className="bg-[#1976D2] hover:bg-[#1565C0] w-full">Change Password</Button>
              </form>
              <Button variant="outline" className="w-full justify-start">
                Download My Data
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Privacy Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
