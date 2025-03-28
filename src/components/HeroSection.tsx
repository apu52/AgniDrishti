
import { ArrowRight, Flame, Shield, MapPin, AlertTriangle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden py-16 md:py-24">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-fire z-0"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-fire/5 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/4 z-0"></div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight fire-text">
                अग्निदृष्टि
              </h1>
              <p className="text-xl md:text-2xl font-medium text-foreground/80">
                Advanced Fire Alert & Management System
              </p>
            </div>
            
            <p className="text-muted-foreground text-lg max-w-lg">
              Real-time fire detection, risk assessment, and emergency response system powered by IoT sensors and AI technology.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button className="sos-button text-lg px-8 py-6" asChild>
                <Link to="/sos">
                  SOS Emergency <PhoneCall className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" className="glow-border text-lg px-8 py-6" asChild>
                <Link to="/map">
                  View Fire Risk Map <MapPin className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-black/40 border border-fire/20">
                <Flame className="h-8 w-8 text-fire mb-2" />
                <p className="text-sm">Smart Fire Alerts</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-black/40 border border-fire/20">
                <MapPin className="h-8 w-8 text-fire mb-2" />
                <p className="text-sm">Risk Zone Mapping</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-black/40 border border-fire/20">
                <AlertTriangle className="h-8 w-8 text-fire mb-2" />
                <p className="text-sm">Live Tracking</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-black/40 border border-fire/20">
                <Shield className="h-8 w-8 text-fire mb-2" />
                <p className="text-sm">24/7 Support</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden glow-border">
              <img 
                src="firefighters-115800_1280.jpeg" 
                alt="Firefighters in action" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-fire rounded-full animate-pulse"></div>
                    <p className="text-sm font-medium text-fire">LIVE RESPONSE</p>
                  </div>
                  <p className="text-white text-lg font-medium">
                    Smart sensors detect fires before they spread
                  </p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 z-20 max-w-[240px] rounded-lg overflow-hidden glow-border">
              <img 
                src="karsan-wireless-fire-detectors.jpg" 
                alt="Fire detection sensor" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
