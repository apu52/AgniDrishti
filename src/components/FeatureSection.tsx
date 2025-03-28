
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
    description: "Unified hub to report hazards and track response teams"
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
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fire-text">
            Comprehensive Fire Safety Features
          </h2>
          <p className="text-muted-foreground text-lg">
            अग्निदृष्टि combines cutting-edge technology with practical solutions to prevent, detect, and respond to fire emergencies
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-black/40 border-fire/20 hover:border-fire/40 transition-all duration-300">
              <CardHeader>
                <div className="bg-fire/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-fire" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
