
import { PhoneCall, AlertTriangle, Navigation, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const SOSSection = () => {
  return (
    <section className="relative py-16 z-30"> {/* High z-index to stay above overlay */}
  <div className="container">
    <div className="max-w-5xl mx-auto">
      <div className="bg-black/90 backdrop-blur-sm border-2 border-fire/40 rounded-2xl overflow-hidden shadow-xl shadow-fire/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Text Content */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/30 text-white mb-6 border border-destructive/50">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium">Emergency Response</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              SOS Panic Button & Voice Commands
            </h2>
            
            <p className="text-white/80 mb-8"> {/* Improved contrast */}
              Instant emergency assistance with one touch or voice command. Automatically shares your location with emergency services and provides evacuation guidance.
            </p>
            
            <div className="space-y-4">
              {/* Feature Items */}
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1.5 rounded-full bg-destructive/30 border border-destructive/50">
                  <PhoneCall className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Emergency Calling</h4>
                  <p className="text-sm text-white/80 mt-1">
                    One-touch calling to fire department, medical services, and police
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1.5 rounded-full bg-destructive/30 border border-destructive/50">
                  <Navigation className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Location Sharing</h4>
                  <p className="text-sm text-white/80 mt-1">
                    Precise GPS coordinates sent automatically to emergency responders
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1.5 rounded-full bg-destructive/30 border border-destructive/50">
                  <Volume2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Voice Activation</h4>
                  <p className="text-sm text-white/80 mt-1">
                    "Hey FireGuard, call help!" for hands-free emergency assistance
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* SOS Button */}
          <div className="relative px-8 pb-8 pt-0 lg:py-12 flex items-center justify-center">
            <div className="w-full max-w-[300px] aspect-square relative">
              <div className="absolute inset-0 rounded-full bg-destructive/30 animate-ping"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Button 
                  className="w-64 h-64 rounded-full flex flex-col items-center justify-center gap-2 transition-all duration-300 
                            bg-gradient-to-br from-destructive to-destructive/90 hover:from-destructive hover:to-destructive
                            shadow-[0_0_30px_rgba(220,38,38,0.7)] hover:shadow-[0_0_50px_rgba(220,38,38,0.9)]
                            border-2 border-white/20 hover:border-white/40"
                  onClick={() => alert("SOS button clicked! In a real app, this would trigger the emergency response.")}
                >
                  <PhoneCall className="h-16 w-16 text-white" />
                  <span className="text-3xl font-bold text-white">SOS</span>
                  <span className="text-sm text-white/90">Press for Emergency</span>
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
