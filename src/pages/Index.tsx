
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import StatisticsSection from "@/components/StatisticsSection";
import MapSection from "@/components/MapSection";
import SOSSection from "@/components/SOSSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection />
        <FeatureSection />
        <StatisticsSection />
        <MapSection />
        <SOSSection />
        <CTASection />
      </main>
    </div>
  );
};

export default Index;
