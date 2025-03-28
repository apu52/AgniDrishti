
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Bell, 
  Menu, 
  X, 
  MapPin, 
  PhoneCall, 
  AlertTriangle, 
  MessageSquare, 
  FileText,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Navbar = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Fire alert in Sector 7", time: "Just now", read: false },
    { id: 2, message: "High risk zone detected near your location", time: "5 min ago", read: false },
    { id: 3, message: "SOS request from user in your area", time: "10 min ago", read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-fire/20">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6 text-fire" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-gradient-fire border-r border-fire/20">
              <div className="flex flex-col gap-6 mt-8">
                <Link to="/" className="flex items-center gap-2 text-fire font-bold text-xl">
                  <AlertTriangle className="h-6 w-6" />
                  <span>अग्निदृष्टि</span>
                </Link>
                <div className="flex flex-col gap-4">
                  <Link to="/map" className="flex items-center gap-2 text-foreground hover:text-fire transition-colors">
                    <MapPin className="h-5 w-5" />
                    <span>Fire Risk Map</span>
                  </Link>
                  <Link to="/sos" className="flex items-center gap-2 text-foreground hover:text-fire transition-colors">
                    <PhoneCall className="h-5 w-5" />
                    <span>SOS Emergency</span>
                  </Link>
                  <Link to="/alerts" className="flex items-center gap-2 text-foreground hover:text-fire transition-colors">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Fire Alerts</span>
                  </Link>
                  <Link to="/chat" className="flex items-center gap-2 text-foreground hover:text-fire transition-colors">
                    <MessageSquare className="h-5 w-5" />
                    <span>Crisis Chatbot</span>
                  </Link>
                  <Link to="/reports" className="flex items-center gap-2 text-foreground hover:text-fire transition-colors">
                    <FileText className="h-5 w-5" />
                    <span>Reports</span>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-fire" />
            <span className="font-bold text-xl fire-text">अग्निदृष्टि</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/map" className="text-foreground hover:text-fire transition-colors">Fire Risk Map</Link>
          <Link to="/sos" className="text-foreground hover:text-fire transition-colors">SOS Emergency</Link>
          <Link to="/alerts" className="text-foreground hover:text-fire transition-colors">Fire Alerts</Link>
          <Link to="/chat" className="text-foreground hover:text-fire transition-colors">Crisis Chatbot</Link>
          <Link to="/reports" className="text-foreground hover:text-fire transition-colors">Reports</Link>
        </div>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-foreground" />
                {unreadCount > 0 && (
                  <span className="notification-badge">{unreadCount}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 bg-black border border-fire/30" align="end">
              <div className="p-4 border-b border-fire/20">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Notifications</h4>
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Mark all as read
                  </Button>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`p-4 border-b border-fire/10 hover:bg-fire/5 ${notification.read ? 'opacity-70' : ''}`}
                  >
                    <div className="flex items-start gap-4">
                      <AlertTriangle className={`h-5 w-5 mt-0.5 ${notification.read ? 'text-muted-foreground' : 'text-fire'}`} />
                      <div>
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Button variant="ghost" size="icon">
            <User className="h-5 w-5 text-foreground" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
