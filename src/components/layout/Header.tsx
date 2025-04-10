
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, LogOut, Mail, Search, Settings, User } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { currentUser } from "@/services/mockData";

export default function Header() {
  const { toast } = useToast();

  const handleNotification = () => {
    toast({
      title: "New meeting request",
      description: "You have a new meeting request from Sarah Chen",
    });
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b py-4 px-6 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="font-bold text-xl text-primary">MeetingAI</div>
          <span className="text-xs bg-secondary px-2 py-0.5 rounded-md">Navigator</span>
        </div>

        <div className="hidden md:flex relative max-w-md w-full mx-12">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search meetings, people, or content..."
            className="pl-8 w-full"
          />
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={handleNotification}>
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Calendar className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Mail className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  {currentUser.name.charAt(0)}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">{currentUser.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
