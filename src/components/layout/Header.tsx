
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, LogOut, Mail, RefreshCw, Search, Settings, User, X, Eye } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { currentUser } from "@/services/mockData";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

type Notification = {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  link?: string;
};

export default function Header({ onRefresh }: { onRefresh?: () => void }) {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New meeting request",
      description: "You have a new meeting request from Sarah Chen",
      timestamp: new Date(),
      read: false,
      link: "/meetings/new-meeting-1"
    },
    {
      id: "2",
      title: "Meeting updated",
      description: "API Gateway Performance Review meeting time has changed",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      link: "/meetings/api-review"
    }
  ]);
  
  const [unreadChats, setUnreadChats] = useState(3);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotification = () => {
    const newNotification = {
      id: Date.now().toString(),
      title: "New meeting request",
      description: "You have a new meeting request from Sarah Chen",
      timestamp: new Date(),
      read: false,
      link: "/meetings/new-request"
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    toast({
      title: newNotification.title,
      description: (
        <div className="flex flex-col">
          <p>{newNotification.description}</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 w-full flex items-center gap-2"
            onClick={() => {
              toast({
                title: "Viewing message",
                description: "Opening meeting request details"
              });
              window.location.href = newNotification.link || "#";
            }}
          >
            <Eye className="h-4 w-4" />
            View Details
          </Button>
        </div>
      )
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
      toast({
        title: "Refreshed",
        description: "Your data has been refreshed.",
      });
    }
  };

  const viewChat = () => {
    toast({
      title: "Opening Chat",
      description: "Redirecting to chat interface",
    });
    setUnreadChats(0);
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b py-4 px-6 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="font-bold text-xl text-primary">RoleCall</div>
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
          <Button variant="ghost" size="icon" onClick={handleRefresh} title="Refresh data">
            <RefreshCw className="h-5 w-5" />
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="flex items-center justify-between p-4 border-b">
                <h4 className="font-semibold text-primary">Notifications</h4>
                <div className="flex items-center gap-2">
                  {notifications.length > 0 && (
                    <>
                      <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                        Mark all read
                      </Button>
                      <Button variant="ghost" size="sm" onClick={clearAllNotifications}>
                        Clear all
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <ScrollArea className="h-[300px]">
                {notifications.length > 0 ? (
                  <div className="divide-y">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`p-4 flex gap-3 items-start relative ${notification.read ? 'opacity-70' : ''}`}
                      >
                        <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${notification.read ? 'bg-muted' : 'bg-primary'}`} />
                        <div className="flex-1">
                          <div className="font-medium">{notification.title}</div>
                          <p className="text-sm text-muted-foreground">{notification.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          {notification.link && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-2 w-full flex items-center gap-2"
                              asChild
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Link to={notification.link}>
                                <Eye className="h-3.5 w-3.5" />
                                View
                              </Link>
                            </Button>
                          )}
                        </div>
                        <div className="flex gap-1">
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6" 
                              onClick={() => markAsRead(notification.id)}
                            >
                              <span className="sr-only">Mark as read</span>
                              <Mail className="h-3 w-3" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <span className="sr-only">Delete</span>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    No notifications
                  </div>
                )}
              </ScrollArea>
            </PopoverContent>
          </Popover>

          <Button variant="ghost" size="icon" onClick={handleNotification}>
            <Calendar className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative" 
            onClick={viewChat}
            asChild
          >
            <Link to="/chats">
              <Mail className="h-5 w-5" />
              {unreadChats > 0 && (
                <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center">
                  {unreadChats}
                </Badge>
              )}
            </Link>
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
