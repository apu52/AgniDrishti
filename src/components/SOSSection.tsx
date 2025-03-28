
import { PhoneCall, AlertTriangle, Navigation, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const SOSSection = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="bg-black/40 border border-fire/30 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/20 text-destructive mb-6">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">Emergency Response</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  SOS Panic Button & Voice Commands
                </h2>
                
                <p className="text-muted-foreground mb-8">
                  Instant emergency assistance with one touch or voice command. Automatically shares your location with emergency services and provides evacuation guidance.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 rounded-full bg-destructive/20">
                      <PhoneCall className="h-4 w-4 text-destructive" />
                    </div>
                    <div>
                      <h4 className="font-medium">Emergency Calling</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        One-touch calling to fire department, medical services, and police
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 rounded-full bg-destructive/20">
                      <Navigation className="h-4 w-4 text-destructive" />
                    </div>
                    <div>
                      <h4 className="font-medium">Location Sharing</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Precise GPS coordinates sent automatically to emergency responders
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 rounded-full bg-destructive/20">
                      <Volume2 className="h-4 w-4 text-destructive" />
                    </div>
                    <div>
                      <h4 className="font-medium">Voice Activation</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        "Hey FireGuard, call help!" for hands-free emergency assistance
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative px-8 pb-8 pt-0 lg:py-12 flex items-center justify-center">
                <div className="w-full max-w-[300px] aspect-square relative">
                  <div className="absolute inset-0 rounded-full bg-fire/20 animate-ping"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button 
                      className="w-64 h-64 rounded-full sos-button flex flex-col items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_30px_rgba(255,0,0,0.5)] hover:shadow-[0_0_50px_rgba(255,0,0,0.8)]"
                      onClick={() => alert("SOS button clicked! In a real app, this would trigger the emergency response.")}
                    >
                      <PhoneCall className="h-16 w-16" />
                      <span className="text-3xl font-bold">SOS</span>
                      <span className="text-sm">Press for Emergency</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SOSSection;
