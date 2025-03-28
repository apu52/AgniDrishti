
import { ArrowRight, Bot, Headphones, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 Z-20">
      <div className="container">
        <div className="max-w-5xl mx-auto text-center relative z-30">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Ready to Enhance Your Fire Safety?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto drop-shadow-md">
            Join thousands of users already protected by अग्निदृष्टि's advanced fire detection and alert system
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-black/60 border border-fire/20 rounded-xl p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-fire/10 flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-fire" />
              </div>
              <h3 className="text-xl font-medium mb-2">View Risk Map</h3>
              <p className="text-muted-foreground mb-4">
                Check fire risks in your area with our interactive heatmap
              </p>
              <Button variant="link" className="text-fire mt-auto group" asChild>
                <Link to="/map">
                  Explore Map
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            
            <div className="bg-black/60 border border-fire/20 rounded-xl p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-fire/10 flex items-center justify-center mb-4">
                <Bot className="h-8 w-8 text-fire" />
              </div>
              <h3 className="text-xl font-medium mb-2">Chat with AI</h3>
              <p className="text-muted-foreground mb-4">
                Get fire safety tips and emergency guidance from our AI assistant
              </p>
              <Button variant="link" className="text-fire mt-auto group" asChild>
                <Link to="/chat">
                  Start Chatting
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            
            <div className="bg-black/60 border border-fire/20 rounded-xl p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-fire/10 flex items-center justify-center mb-4">
                <Headphones className="h-8 w-8 text-fire" />
              </div>
              <h3 className="text-xl font-medium mb-2">Contact Support</h3>
              <p className="text-muted-foreground mb-4">
                Need help with setup or have questions about our services?
              </p>
              <Button variant="link" className="text-fire mt-auto group" asChild>
                <Link to="/contact">
                  Get Support
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
          
          <Button size="lg" className="sos-button text-lg px-8 py-6" asChild>
            <Link to="/register">
              Get Started with अग्निदृष्टि
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
