import {
  ArrowRight,
  Flame,
  Shield,
  MapPin,
  AlertTriangle,
  PhoneCall,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// const HeroSection = () => {
//   return (
//     <div className="relative overflow-hidden py-16 md:py-24">
//     {/* Background image overlay with fixed sensor status */}
//     <div className="fixed inset-0 -z-10">
//       <img
//         src="firefighters-115800_1280.jpeg"
//         alt="Firefighters in action"
//         className="w-full h-full object-cover"
//       />
//       <div className="absolute inset-0 bg-black/50"></div>

//       {/* Fixed sensor status (will stay visible when scrolling) */}
//       <div className="fixed bottom-8 left-8 bg-fire/90 text-white px-4 py-2 rounded-lg">
//         <div className="flex items-center gap-2">
//           <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
//           <p className="text-sm font-bold">ACTIVE SENSORS: 94</p>
//         </div>
//       </div>
//     </div>

//     {/* Fire gradient effects */}
//     <div className="absolute inset-0 bg-gradient-to-br from-black to-black/90 z-0 opacity-80"></div>
//     <div className="absolute top-0 right-0 w-1/2 h-full bg-fire/5 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/4 z-0"></div>

//     <div className="container relative z-10">
//       <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center"> {/* Changed to single column */}
//         <div className="space-y-6 bg-black/70 p-8 rounded-2xl border border-fire/30 max-w-3xl mx-auto"> {/* Centered content */}
//           <div className="flex flex-col space-y-2">
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-center">
//               अग्निदृष्टि
//             </h1>
//             <p className="text-xl md:text-2xl font-medium text-white/80 text-center">
//               Advanced Fire Alert & Management System
//             </p>
//           </div>

//           <p className="text-white/80 text-lg text-center max-w-2xl mx-auto">
//             Real-time fire detection, risk assessment, and emergency response system powered by IoT sensors and AI technology.
//           </p>

//           <div className="flex flex-wrap gap-4 justify-center">
//             <Button className="bg-fire hover:bg-fire/90 text-white text-lg px-8 py-6 glow-fire" asChild>
//               <Link to="/sos">
//                 SOS Emergency <PhoneCall className="ml-2 h-5 w-5" />
//               </Link>
//             </Button>
//             <Button variant="outline" className="border-white/30 hover:border-fire text-white hover:text-fire text-lg px-8 py-6 glow-border" asChild>
//               <Link to="/map">
//                 View Fire Risk Map <MapPin className="ml-2 h-5 w-5" />
//               </Link>
//             </Button>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
//             {[
//               { icon: Flame, text: "Smart Fire Alerts" },
//               { icon: MapPin, text: "Risk Zone Mapping" },
//               { icon: AlertTriangle, text: "Live Tracking" },
//               { icon: Shield, text: "24/7 Support" }
//             ].map((item, index) => (
//               <div key={index} className="flex flex-col items-center text-center p-4 rounded-lg bg-black/60 border border-fire/20 hover:border-fire/50 transition-all">
//                 <item.icon className="h-8 w-8 text-fire mb-2" />
//                 <p className="text-sm text-white/90">{item.text}</p>
//               </div>
//             ))}

//     </div>
//     </div>
//   </div>
//   );
// };

// export default HeroSection;

{
  /* Background gradients */
}
{
  /* <div className="absolute inset-0 bg-gradient-fire z-0"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-fire/5 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/4 z-0"></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                अग्निदृष्टि
              </h1>
              <p className="text-xl md:text-2xl font-medium text-foreground/80">
                Advanced Fire Alert & Management System
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="relative h-24 flex items-center p-2 overflow-hidden">
                <div className="absolute animate-slide text-4xl md:text-5xl lg:text-6xl bg-clip-text bg-gradient-to-tr from-red-500 via-orange-600 to-yellow-700 text-transparent font-bold tracking-tight ">
                  अग्निदृष्टि
                </div>
                <div className="absolute animate-slide englishagni text-4xl md:text-5xl lg:text-6xl  bg-clip-text bg-gradient-to-tr from-red-500 via-orange-600 to-yellow-700 text-transparent font-bold tracking-tight  opacity-0">
                  AgniDrishti
                </div>
                <div className="absolute bengaliagni animate-slide text-4xl md:text-5xl lg:text-6xl  bg-clip-text bg-gradient-to-tr from-red-500 via-orange-600 to-yellow-700 text-transparent font-bold tracking-tight  opacity-0">
                  অগ্নিদৃষ্টি
                </div>
              </div>

              <p className="text-xl md:text-2xl font-medium text-foreground/80">
                Advanced Fire Alert & Management System
              </p>
            </div>

            <p className="text-muted-foreground text-lg max-w-lg">
              Real-time fire detection, risk assessment, and emergency response
              system powered by IoT sensors and AI technology.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button className="sos-button text-lg px-8 py-6" asChild>
                <Link to="/sos">
                  SOS Emergency <PhoneCall className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="glow-border text-lg px-8 py-6"
                asChild
              >
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
                    <p className="text-sm font-medium text-fire">
                      LIVE RESPONSE
                    </p>
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
      </div> */
}
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

        {/* Fixed sensor status */}
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
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">
          <div className="space-y-6 p-8 bg-transparent rounded-2xl max-w-3xl mx-auto">
            <div className="flex flex-col space-y-2">
              <div className="relative h-24 flex items-center justify-center p-2 overflow-hidden">
                <div className="absolute animate-slide text-4xl md:text-5xl lg:text-6xl bg-clip-text bg-gradient-to-tr from-red-500 via-orange-600 to-yellow-700 text-transparent font-bold tracking-tight ">
                  अग्निदृष्टि
                </div>
                <div className="absolute animate-slide englishagni text-4xl md:text-5xl lg:text-6xl  bg-clip-text bg-gradient-to-tr from-red-500 via-orange-600 to-yellow-700 text-transparent font-bold tracking-tight  opacity-0">
                  AgniDrishti
                </div>
                <div className="absolute bengaliagni animate-slide text-5xl md:text-5xl lg:text-6xl  bg-clip-text bg-gradient-to-tr from-red-500 via-orange-600 to-yellow-700 text-transparent font-bold tracking-tight  opacity-0">
                  অগ্নিদৃষ্টি
                </div>
              </div>
              <p className="text-xl md:text-2xl font-medium text-white/80 text-center">
                Advanced Fire Alert & Management System
              </p>
            </div>
            <p className="text-white/80 text-lg text-center max-w-2xl mx-auto">
              Real-time fire detection, risk assessment, and emergency response
              system powered by IoT sensors and AI technology.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                className="bg-fire hover:bg-fire/90 text-white text-lg px-8 py-6 glow-fire"
                asChild
              >
                <Link to="/SOS_call">
                  SOS Emergency <PhoneCall className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-white/30 hover:border-fire text-white hover:text-white text-lg px-8 py-6 glow-fire"
                asChild
              >
                <Link to="/MapPage">
                  View Fire Risk Map <MapPin className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            {/* Fixed grid closing tag */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              {[
                { icon: Flame, text: "Smart Fire Alerts" },
                { icon: MapPin, text: "Risk Zone Mapping" },
                { icon: AlertTriangle, text: "Live Tracking" },
                { icon: Shield, text: "24/7 Support" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-4 rounded-lg bg-black/60 border border-fire/20 hover:border-fire/50 transition-all"
                >
                  <item.icon className="h-8 w-8 text-fire mb-2" />
                  <p className="text-sm text-white/90">{item.text}</p>
                </div>
              ))}
            </div>{" "}
            {/* Added missing closing tag here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
