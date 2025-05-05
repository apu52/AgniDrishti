import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Menu,
  MapPin,
  PhoneCall,
  AlertTriangle,
  MessageSquare,
  FileText,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Reusable Components
const BrandLogo = () => (
  <Link to="/" className="flex items-center gap-2">
    <AlertTriangle className="h-6 w-6 text-fire" />
    <span className="font-bold text-xl fire-text text-white">अग्निदृष्टि</span>
  </Link>
);

const NavLink = ({ to, icon: Icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-2 text-foreground hover:text-fire transition-colors"
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </Link>
);

const NotificationsPopover = ({
  notifications,
  unreadCount,
  markAllAsRead,
}) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5 text-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-fire text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>
    </PopoverTrigger>
    <PopoverContent
      className="w-80 p-0 bg-black border border-fire/30"
      align="end"
    >
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
            className={`p-4 border-b border-fire/10 hover:bg-fire/5 ${
              notification.read ? "opacity-70" : ""
            }`}
          >
            <div className="flex items-start gap-4">
              <AlertTriangle
                className={`h-5 w-5 mt-0.5 ${
                  notification.read ? "text-muted-foreground" : "text-fire"
                }`}
              />
              <div>
                <p className="text-sm">{notification.message}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {notification.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PopoverContent>
  </Popover>
);

// Main Component
const Navbar = () => {
  const [notifications, setNotifications] = useState([
    
    {
      id: 2,
      message: "High risk zone detected near RCCIIT , Beleghata",
      time: "5 min ago",
      read: false,
    },
    {
      id: 3,
      message: "SOS request from user in your area",
      time: "10 min ago",
      read: true,
    },
  ]);

  const NAV_ITEMS = [
    { to: "/MapPage", icon: MapPin, label: "Fire Risk Map" },
    { to: "/SOS_call", icon: PhoneCall, label: "SOS Emergency" },
    { to: "/alerts", icon: AlertTriangle, label: "Fire Alerts" },
    { to: "/chat", icon: MessageSquare, label: "Crisis Chatbot" },
    { to: "/postfireanalysis", icon: FileText, label: "Reports" },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-black/100 backdrop-blur-md border-b border-fire/20">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6 text-fire" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-gradient-fire border-r border-fire/20"
            >
              <div className="flex flex-col gap-6 mt-8">
                <BrandLogo />
                <div className="flex flex-col gap-4">
                  {NAV_ITEMS.map((item) => (
                    <NavLink key={item.to} {...item} />
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <BrandLogo />
        </div>

        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-foreground hover:text-fire transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <NotificationsPopover
            notifications={notifications}
            unreadCount={unreadCount}
            markAllAsRead={markAllAsRead}
          />

          <Button variant="ghost" size="icon">
            <User className="h-5 w-5 text-foreground" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
