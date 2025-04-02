
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import FireComplaintPage from "./pages/FireComplaintPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/map" element={<PlaceholderPage />} />
          <Route path="/sos" element={<PlaceholderPage />} />
          <Route path="/alerts" element={<PlaceholderPage />} />
          <Route path="/chat" element={<PlaceholderPage />} />
          <Route path="/reports" element={<PlaceholderPage />} />
          <Route path="/contact" element={<PlaceholderPage />} />
          <Route path="/about" element={<PlaceholderPage />} />
          <Route path="/register" element={<PlaceholderPage />} />
          <Route path="/prevention" element={<PlaceholderPage />} />
          <Route path="/protocols" element={<PlaceholderPage />} />
          <Route path="/blog" element={<PlaceholderPage />} />
          <Route path="/faq" element={<PlaceholderPage />} />
          <Route path="/support" element={<PlaceholderPage />} />
          <Route path="/careers" element={<PlaceholderPage />} />
          <Route path="/privacy" element={<PlaceholderPage />} />
          <Route path="/terms" element={<PlaceholderPage />} />
          <Route path="/cookies" element={<PlaceholderPage />} />
          <Route path="/complaint" element={<FireComplaintPage/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
