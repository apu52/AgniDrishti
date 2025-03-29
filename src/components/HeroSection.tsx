
import { ArrowRight, Flame, Shield, MapPin, AlertTriangle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden py-16 md:py-24">
    {/* Background image overlay with fixed sensor status */}
    <div className="fixed inset-0 -z-10">
      <img 
        src="firefighters-115800_1280.jpeg" 
        alt="Firefighters in action" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Fixed sensor status (will stay visible when scrolling) */}
      <div className="fixed bottom-8 left-8 bg-fire/90 text-white px-4 py-2 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <p className="text-sm font-bold">ACTIVE SENSORS: 94</p>
        </div>
      </div>
    </div>
    
    {/* Fire gradient effects */}
    <div className="absolute inset-0 bg-gradient-to-br from-black to-black/90 z-0 opacity-80"></div>
    <div className="absolute top-0 right-0 w-1/2 h-full bg-fire/5 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/4 z-0"></div>
    
    <div className="container relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center"> {/* Changed to single column */}
        <div className="space-y-6 bg-black/70 p-8 rounded-2xl border border-fire/30 max-w-3xl mx-auto"> {/* Centered content */}
          <div className="flex flex-col space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-center">
              अग्निदृष्टि
            </h1>
            <p className="text-xl md:text-2xl font-medium text-white/80 text-center">
              Advanced Fire Alert & Management System
            </p>
          </div>
          
          <p className="text-white/80 text-lg text-center max-w-2xl mx-auto">
            Real-time fire detection, risk assessment, and emergency response system powered by IoT sensors and AI technology.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="bg-fire hover:bg-fire/90 text-white text-lg px-8 py-6 glow-fire" asChild>
              <Link to="/sos">
                SOS Emergency <PhoneCall className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" className="border-white/30 hover:border-fire text-white hover:text-fire text-lg px-8 py-6 glow-border" asChild>
              <Link to="/map">
                View Fire Risk Map <MapPin className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            {[
              { icon: Flame, text: "Smart Fire Alerts" },
              { icon: MapPin, text: "Risk Zone Mapping" },
              { icon: AlertTriangle, text: "Live Tracking" },
              { icon: Shield, text: "24/7 Support" }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4 rounded-lg bg-black/60 border border-fire/20 hover:border-fire/50 transition-all">
                <item.icon className="h-8 w-8 text-fire mb-2" />
                <p className="text-sm text-white/90">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default HeroSection;
