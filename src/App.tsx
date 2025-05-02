import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

import Navbar from "./components/Navbar";
import Chatbot from "./pages/Chatbot";
import Footer from "@/components/Footer";
import FireComplaintPage from "./pages/FireComplaintPage";
import FirePreventionPage from "./pages/FirePreventionPage";
import MapPage from "./pages/MapPage";
import RegistrationPage from "./pages/RegistrationPage";
import LiveDashboard from "./pages/Live_Dashboard";
import SOS from "./pages/SOS_call";
import PostFireAnalysis from "./pages/postfireanalysis";
import Crowdsourcealerts from "./pages/crowdsourcealerts";
import Featuresection from "./components/FeatureSection";
import { useEffect } from "react";
import socket from "./socket";
import axios from "axios";
import { EmergencyContact } from "./pages/SOS_call";
const queryClient = new QueryClient();

const App = () => {
  const sampleContacts: EmergencyContact[] = [
    {
      id: "contact-1",
      name: "Himadri Dey",
      phone: "+919038005306",
      relation: "Family",
      isPrimary: true,
      sendLocation: true,
      sendAlerts: true,
    },
    {
      id: "contact-2",
      name: "Arpan Chowdhury",
      phone: "+918777240684",
      relation: "Neighbor",
      isPrimary: false,
      sendLocation: true,
      sendAlerts: true,
    },
    {
      id: "contact-3",
      name: "Suvrodeep Das",
      phone: "+919432456350",
      relation: "Friend",
      isPrimary: false,
      sendLocation: false,
      sendAlerts: true,
    },
  ];
  
  const messagetoemergencycontacts = async (contacts: EmergencyContact[]) => {
    try {
      for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const message = `Hi ${contact.name} Sebanti Dasgupta this side. I am in a fire emergency right now. Please help me. My Address is 1/1b Raipur East Road Kolkata: 700032 near Jadavpur University 
        Kolkata Fire Services: 101 , Kolkata Police : 100, Emergency Ambulance : 108 , Disaster Management : 1070`;
        const call = await axios.post(
          "https://agnidrishtibackend.onrender.com/api/v1/send-sms",
          {
            toNumber: contact.phone,
            message: message,
          }
        );
        console.log(call);
      }
    } catch (error) {
      console.log(error);

      alert("Failed to send SMS");
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Listening for new hardware data...");
    }, 5000);

    socket.on("hardware-data", (data) => {
      console.log("📡 Received hardware data:", data);

      if (data?.FlameSensor?.Detected === true) {
        console.log("🔥 Flame detected! Triggering SOS...");
        messagetoemergencycontacts(sampleContacts); // <-- pass your contacts here
      }
    });

    return () => {
      clearInterval(interval);
      socket.off("hardware-data");
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/MapPage" element={<MapPage />} />
            <Route path="/sos" element={<PlaceholderPage />} />
            <Route path="/alerts" element={<PlaceholderPage />} />
            <Route path="/chat" element={<Chatbot />} />
            <Route path="/reports" element={<PlaceholderPage />} />
            <Route path="/contact" element={<PlaceholderPage />} />
            <Route path="/about" element={<PlaceholderPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/protocols" element={<PlaceholderPage />} />
            <Route path="/blog" element={<PlaceholderPage />} />
            <Route path="/faq" element={<PlaceholderPage />} />
            <Route path="/support" element={<PlaceholderPage />} />
            <Route path="/careers" element={<PlaceholderPage />} />
            <Route path="/privacy" element={<PlaceholderPage />} />
            <Route path="/terms" element={<PlaceholderPage />} />
            <Route path="/cookies" element={<PlaceholderPage />} />
            <Route path="/complaint" element={<FireComplaintPage />} />
            <Route path="/prevention" element={<FirePreventionPage />} />
            <Route path="/Live_Dashboard" element={<LiveDashboard />} />
            <Route path="/SOS_call" element={<SOS />} />
            <Route path="/Chatbot" element={<Chatbot />} />
            <Route path="/postfireanalysis" element={<PostFireAnalysis />} />
            <Route path="/crowdsourcealerts" element={<Crowdsourcealerts />} />
            <Route path="/FeatureSection" element={<Featuresection />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
