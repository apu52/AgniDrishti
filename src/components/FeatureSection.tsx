import { 
  AlertTriangle, 
  MapPin, 
  PieChart, 
  PhoneCall, 
  FileText, 
  Bot, 
  Users, 
  Bell, 
  Mic 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const features = [
  {
    icon: AlertTriangle,
    title: "Smart Fire Alert Sensor",
    description: "IoT sensors detect fires and send instant alerts to users & authorities"
  },
  {
    icon: MapPin,
    title: "Fire Risk Zone Mapping",
    description: "AI heatmaps identify high-risk zones using historical/real-time data"
  },
  {
    icon: PieChart,
    title: "Live Fire Tracking Dashboard",
    description: "Real-time fire visualization with crowdsourced + sensor updates"
  },
  {
    icon: PhoneCall,
    title: "SOS Panic Button & Helpline",
    description: "One-touch emergency calls with auto-location sharing"
  },
  {
    icon: FileText,
    title: "Prevention Guides & Protocols",
    description: "Multilingual safety steps for evacuation/fire control"
  },
  {
    icon: PieChart,
    title: "Post-Fire Analysis & Reports",
    description: "Data-driven heatmaps for damage assessment/insurance"
  },
  {
    icon: Bot,
    title: "AI Crisis Chatbot",
    description: "Multilingual 24/7 chatbot for fire FAQs and emergency bridging"
  },
  {
    icon: Users,
    title: "Multi-Agency Complaint Portal",
    description: "Unified hub to report hazards and track response teams",
    link: "/complaint"
  },
  {
    icon: Bell,
    title: "Crowdsourced Alerts",
    description: "User-generated reports to validate and accelerate disaster response"
  },
  {
    icon: Mic,
    title: "Voice-Activated Emergency Mode",
    description: "\"Hey FireGuard, call help!\" – Voice commands for hands-free emergency response"
  }
];

const FeatureSection = () => {
  return (
    <section className="relative py-16 md:py-24 z-30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-md">
            Comprehensive Fire Safety Features
          </h2>
          <p className="text-white/100 text-lg">
            अग्निदृष्टि combines cutting-edge technology with practical solutions to prevent, detect, and respond to fire emergencies
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group bg-black/90 backdrop-blur-sm border border-fire/30 hover:border-fire/50 transition-all duration-300 hover:shadow-lg hover:shadow-fire/20"
            >
              {feature.link ? (
                <Link to={feature.link} className="block hover:no-underline">
                  <CardHeader className="cursor-pointer hover:bg-black/70 transition-colors duration-200 rounded-t-lg">
                    <div className="bg-fire/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-fire/30 group-hover:bg-fire/30">
                      <feature.icon className="h-6 w-6 text-fire group-hover:text-fire/90" />
                    </div>
                    <CardTitle className="text-xl text-white group-hover:text-fire">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white/80 text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Link>
              ) : (
                <>
                  <CardHeader>
                    <div className="bg-fire/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-fire/30">
                      <feature.icon className="h-6 w-6 text-fire" />
                    </div>
                    <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white/80 text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;