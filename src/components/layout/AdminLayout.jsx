import {
  Navigate,
  Outlet,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  FileText,
  LogOut,
  Inbox,
  ImageIcon,
  Tag,
  Star,
  Users,
  Award,
  Settings,
} from "lucide-react";
import { getAdminToken, adminLogout } from "../../lib/api";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = getAdminToken();

  // Protect route: Redirect to login if no token is found
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login");
  };

const navLinks = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Inbox", path: "/admin/inbox", icon: Inbox },
    { name: "Properties", path: "/admin/properties", icon: Building2 },
    { name: "Projects", path: "/admin/projects", icon: Briefcase },
    { name: "News", path: "/admin/news", icon: FileText },
    { name: "Offers", path: "/admin/offers", icon: Tag },
    { name: "Experiences", path: "/admin/experiences", icon: Star },
    { name: "Careers", path: "/admin/careers", icon: Users },
    { name: "Team & Awards", path: "/admin/about", icon: Award },
    { name: "Site Settings", path: "/admin/settings", icon: Settings },
    { name: "Media", path: "/admin/media", icon: ImageIcon },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-50 font-sans text-neutral-900">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-200 bg-white">
        <div className="flex h-16 items-center border-b border-neutral-200 px-6">
          <span className="font-serif text-lg font-medium text-[#18392f]">
            Schneitec CMS
          </span>
        </div>

        <nav className="p-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#18392f] text-white"
                    : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                <Icon size={18} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-64 border-t border-neutral-200 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 cursor-pointer"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="flex h-16 items-center border-b border-neutral-200 bg-white px-8">
          <h1 className="text-lg font-medium text-neutral-900">
            Content Management
          </h1>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
