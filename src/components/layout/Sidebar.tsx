
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BarChart2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Home,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Settings,
  UserCog,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  to: string;
  isCollapsed: boolean;
  isActive?: boolean;
};

const SidebarItem = ({
  icon: Icon,
  label,
  to,
  isCollapsed,
  isActive = false,
}: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center py-2 px-3 rounded-md transition-colors",
        isActive
          ? "bg-primary/10 text-primary hover:bg-primary/15"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!isCollapsed && <span className="ml-3">{label}</span>}
    </Link>
  );
};

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={cn(
        "h-screen border-r bg-white dark:bg-slate-950 py-4 flex flex-col transition-all duration-300",
        isCollapsed ? "w-[4.5rem]" : "w-64"
      )}
    >
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden px-3">
        <div className="space-y-1 py-2">
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            to="/"
            isCollapsed={isCollapsed}
            isActive={isActive("/")}
          />
          <SidebarItem
            icon={Mail}
            label="Inbox"
            to="/inbox"
            isCollapsed={isCollapsed}
            isActive={isActive("/inbox")}
          />
          <SidebarItem
            icon={Calendar}
            label="Calendar"
            to="/calendar"
            isCollapsed={isCollapsed}
            isActive={isActive("/calendar")}
          />
          <SidebarItem
            icon={Clock}
            label="Past Meetings"
            to="/past-meetings"
            isCollapsed={isCollapsed}
            isActive={isActive("/past-meetings")}
          />
        </div>

        <div className="pt-4 pb-2">
          <div className={cn("px-3 mb-2", isCollapsed ? "sr-only" : "")}>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Workspace
            </p>
          </div>
          <div className="space-y-1">
            <SidebarItem
              icon={Users}
              label="My Team"
              to="/teams"
              isCollapsed={isCollapsed}
              isActive={isActive("/teams")}
            />
            <SidebarItem
              icon={MessageSquare}
              label="Chats"
              to="/chats"
              isCollapsed={isCollapsed}
              isActive={isActive("/chats")}
            />
            <SidebarItem
              icon={BarChart2}
              label="Analytics"
              to="/analytics"
              isCollapsed={isCollapsed}
              isActive={isActive("/analytics")}
            />
          </div>
        </div>
      </div>

      <div className="mt-auto border-t pt-3 px-3">
        <div className="space-y-1">
          <SidebarItem
            icon={UserCog}
            label="Role Settings"
            to="/role-settings"
            isCollapsed={isCollapsed}
            isActive={isActive("/role-settings")}
          />
          <SidebarItem
            icon={Settings}
            label="Settings"
            to="/settings"
            isCollapsed={isCollapsed}
            isActive={isActive("/settings")}
          />
        </div>
        <div className="flex justify-center mt-6">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
