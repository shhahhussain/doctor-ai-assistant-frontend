import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Stethoscope, 
  Users, 
  MessageSquare, 
  FileText, 
  Settings, 
  Plus,
  User
} from "lucide-react";
import { logout } from "../lib/api";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = localStorage.getItem("user");
  const realName = localStorage.getItem("realName");
  let user = { name: "Dr. Smith", role: "Internal Medicine" };
  if (userData) {
    try {
      const parsedUser = JSON.parse(userData);
      user = {
        name: parsedUser.name || parsedUser.fullName || user.name,
        role: parsedUser.role || parsedUser.specialty || user.role
      };
    } catch {}
  }
  if (realName) {
    user.name = realName;
  }

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { icon: Users, label: "Patients", path: "/dashboard" },
    { icon: FileText, label: "Prompts", path: "/prompts" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Stethoscope className="h-8 w-8 text-[#1976D2]" />
          <h1 className="text-xl font-bold text-gray-900">MedAssist AI</h1>
        </div>
      </div>

      {/* New Session Button */}
      <div className="p-4">
        <Button className="w-full bg-[#1976D2] hover:bg-[#1565C0] text-white flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Session</span>
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              isActive(item.path)
                ? "bg-[#E3F2FD] text-[#1976D2]"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#1976D2] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">{user.name.split(" ").map(n => n[0]).join("")}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
        </div>
        <Button onClick={handleLogout} className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white">Logout</Button>
      </div>
    </div>
  );
};

export default Sidebar;
