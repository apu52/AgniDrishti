import React, { useState, useEffect } from 'react';
import { 
  Download, 
  FileText, 
  MapPin, 
  Calendar, 
  BarChart2, 
  PieChart,
  Filter,
  Search,
  HelpCircle,
  Globe
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

// Language dictionary
const translations = {
  en: {
    title: "Post-Fire Analysis & Reports",
    subtitle: "Data-driven heatmaps for damage assessment, insurance claims, and historical fire outbreak analysis in Kolkata",
    latestAnalysisReport: "Latest Analysis Report",
    howToUse: "How to Use This Data",
    reports: "Reports",
    heatmap: "Heat Maps",
    analytics: "Analytics",
    searchByLocation: "Search by location...",
    location: "Location",
    allLocations: "All Locations",
    timeframe: "Timeframe",
    last3Months: "Last 3 Months",
    last6Months: "Last 6 Months",
    lastYear: "Last Year",
    allTime: "All Time",
    affectedArea: "Affected Area",
    estimatedLoss: "Estimated Loss",
    affectedBusinesses: "Affected Businesses",
    casualtiesInjuries: "Casualties / Injuries",
    downloadDetailedReport: "Download Detailed Report",
    noReportsFound: "No Reports Found",
    tryAdjusting: "Try adjusting your search or filters",
    heatmapTitle: "Kolkata Fire Outbreak Heatmap",
    heatmapSubtitle: "Geographic distribution of fire incidents and damage assessment",
    year: "Year",
    filters: "Filters",
    heatmapDescription: "This visualization uses satellite imagery, sensor data, and reported incidents to create a real-time heat map of fire risk areas across Kolkata",
    highestRiskAreas: "Highest Risk Areas",
    mostImprovedAreas: "Most Improved Areas",
    predictionAccuracy: "Prediction Accuracy",
    high: "High",
    medium: "Medium",
    aiPredictionAccuracy: "AI prediction accuracy",
    downloadFullHeatmapReport: "Download Full Heatmap Report",
    damageAssessmentTitle: "Damage Assessment by Category",
    damageAssessmentSubtitle: "Financial impact breakdown across different sectors",
    totalEstimatedLoss: "Total Estimated Loss",
    insuranceClaimsTitle: "Insurance Claims Processing",
    insuranceClaimsSubtitle: "Status and statistics of fire-related insurance claims",
    claimsFiled: "Claims Filed",
    inProcessing: "In Processing",
    approved: "Approved",
    rejected: "Rejected",
    averageClaimValue: "Average Claim Value",
    averageProcessingTime: "Average Processing Time",
    days: "Days",
    generateInsuranceReport: "Generate Insurance Report",
    annualComparisonTitle: "Annual Fire Incident Comparison",
    yearOverYearChange: "Year-Over-Year Change",
    increaseInIncidents: "Increase in incidents",
    averageResponseTime: "Average Response Time",
    fasterThanPreviousYear: "Faster than previous year",
    civilianCasualties: "Civilian Casualties",
    reductionFromLastYear: "Reduction from last year",
    exportCompleteAnalytics: "Export Complete Analytics",
    severe: "Severe",
    moderate: "Moderate",
    minor: "Minor",
    language: "Language"
  },
  hi: {
    title: "अग्नि के बाद विश्लेषण और रिपोर्ट",
    subtitle: "कोलकाता में क्षति आकलन, बीमा दावों और ऐतिहासिक आग के प्रकोप विश्लेषण के लिए डेटा-आधारित हीटमैप",
    latestAnalysisReport: "नवीनतम विश्लेषण रिपोर्ट",
    howToUse: "इस डेटा का उपयोग कैसे करें",
    reports: "रिपोर्ट",
    heatmap: "हीट मैप",
    analytics: "विश्लेषण",
    searchByLocation: "स्थान से खोजें...",
    location: "स्थान",
    allLocations: "सभी स्थान",
    timeframe: "समय सीमा",
    last3Months: "पिछले 3 महीने",
    last6Months: "पिछले 6 महीने",
    lastYear: "पिछला साल",
    allTime: "सभी समय",
    affectedArea: "प्रभावित क्षेत्र",
    estimatedLoss: "अनुमानित नुकसान",
    affectedBusinesses: "प्रभावित व्यवसाय",
    casualtiesInjuries: "हताहत / चोटें",
    downloadDetailedReport: "विस्तृत रिपोर्ट डाउनलोड करें",
    noReportsFound: "कोई रिपोर्ट नहीं मिली",
    tryAdjusting: "अपनी खोज या फ़िल्टर समायोजित करने का प्रयास करें",
    heatmapTitle: "कोलकाता अग्नि प्रकोप हीटमैप",
    heatmapSubtitle: "आग की घटनाओं और क्षति आकलन का भौगोलिक वितरण",
    year: "वर्ष",
    filters: "फ़िल्टर",
    heatmapDescription: "यह विज़ुअलाइज़ेशन उपग्रह इमेजरी, सेंसर डेटा और रिपोर्ट की गई घटनाओं का उपयोग कोलकाता भर में आग के जोखिम वाले क्षेत्रों का रीयल-टाइम हीट मैप बनाने के लिए करता है",
    highestRiskAreas: "सबसे अधिक जोखिम वाले क्षेत्र",
    mostImprovedAreas: "सबसे अधिक सुधार वाले क्षेत्र",
    predictionAccuracy: "भविष्यवाणी की सटीकता",
    high: "उच्च",
    medium: "मध्यम",
    aiPredictionAccuracy: "एआई भविष्यवाणी सटीकता",
    downloadFullHeatmapReport: "पूर्ण हीटमैप रिपोर्ट डाउनलोड करें",
    damageAssessmentTitle: "श्रेणी के अनुसार क्षति आकलन",
    damageAssessmentSubtitle: "विभिन्न क्षेत्रों में वित्तीय प्रभाव का विश्लेषण",
    totalEstimatedLoss: "कुल अनुमानित नुकसान:",
    insuranceClaimsTitle: "बीमा दावों की प्रक्रिया",
    insuranceClaimsSubtitle: "आग से संबंधित बीमा दावों की स्थिति और आंकड़े",
    claimsFiled: "दावे दायर किए गए",
    inProcessing: "प्रक्रियाधीन",
    approved: "स्वीकृत",
    rejected: "अस्वीकृत",
    averageClaimValue: "औसत दावा मूल्य",
    averageProcessingTime: "औसत प्रसंस्करण समय",
    days: "दिन",
    generateInsuranceReport: "बीमा रिपोर्ट उत्पन्न करें",
    annualComparisonTitle: "वार्षिक आग घटना तुलना",
    yearOverYearChange: "वर्ष-दर-वर्ष परिवर्तन",
    increaseInIncidents: "घटनाओं में वृद्धि",
    averageResponseTime: "औसत प्रतिक्रिया समय",
    fasterThanPreviousYear: "पिछले वर्ष से तेज",
    civilianCasualties: "नागरिक हताहत",
    reductionFromLastYear: "पिछले साल से कमी",
    exportCompleteAnalytics: "पूर्ण विश्लेषण निर्यात करें",
    severe: "गंभीर",
    moderate: "मध्यम",
    minor: "मामूली",
    language: "भाषा"
  },
  bn: {
    title: "অগ্নিকাণ্ডের পরে বিশ্লেষণ এবং রিপোর্ট",
    subtitle: "কলকাতায় ক্ষতি মূল্যায়ন, বীমা দাবি, এবং ঐতিহাসিক অগ্নিকাণ্ড বিশ্লেষণের জন্য তথ্য-চালিত হিটম্যাপ",
    latestAnalysisReport: "সর্বশেষ বিশ্লেষণ রিপোর্ট",
    howToUse: "এই ডেটা ব্যবহার করার পদ্ধতি",
    reports: "রিপোর্ট",
    heatmap: "হিট ম্যাপ",
    analytics: "বিশ্লেষণ",
    searchByLocation: "অবস্থান দ্বারা অনুসন্ধান...",
    location: "অবস্থান",
    allLocations: "সব অবস্থান",
    timeframe: "সময়কাল",
    last3Months: "গত ৩ মাস",
    last6Months: "গত ৬ মাস",
    lastYear: "গত বছর",
    allTime: "সব সময়",
    affectedArea: "প্রভাবিত এলাকা",
    estimatedLoss: "আনুমানিক ক্ষতি",
    affectedBusinesses: "প্রভাবিত ব্যবসা",
    casualtiesInjuries: "মৃত্যু / আহত",
    downloadDetailedReport: "বিস্তারিত রিপোর্ট ডাউনলোড করুন",
    noReportsFound: "কোন রিপোর্ট পাওয়া যায়নি",
    tryAdjusting: "আপনার অনুসন্ধান বা ফিল্টর সমন্বয় করার চেষ্টা করুন",
    heatmapTitle: "কলকাতা অগ্নিকাণ্ড হিটম্যাপ",
    heatmapSubtitle: "অগ্নিকাণ্ড এবং ক্ষতির ভৌগলিক বিতরণ",
    year: "বছর",
    filters: "ফিল্টর",
    heatmapDescription: "এই ভিজ্যুয়ালাইজেশন স্যাটেলাইট ইমেজারি, সেন্সর ডেটা এবং রিপোর্ট করা ঘটনা ব্যবহার করে কলকাতা জুড়ে অগ্নিকাণ্ডের ঝুঁকিপূর্ণ এলাকার রিয়েল-টাইম হিটম্যাপ তৈরি করে",
    highestRiskAreas: "সর্বাধিক ঝুঁকিপূর্ণ এলাকা",
    mostImprovedAreas: "সবচেয়ে উন্নত এলাকা",
    predictionAccuracy: "ভবিষ্যদ্বাণী নির্ভুলতা",
    high: "উচ্চ",
    medium: "মাঝারি",
    aiPredictionAccuracy: "এআই ভবিষ্যদ্বাণী নির্ভুলতা",
    downloadFullHeatmapReport: "সম্পূর্ণ হিটম্যাপ রিপোর্ট ডাউনলোড করুন",
    damageAssessmentTitle: "বিভাগ অনুযায়ী ক্ষতি মূল্যায়ন",
    damageAssessmentSubtitle: "বিভিন্ন খাতে আর্থিক প্রভাব বিশ্লেষণ",
    totalEstimatedLoss: "মোট আনুমানিক ক্ষতি:",
    insuranceClaimsTitle: "বীমা দাবি প্রক্রিয়াকরণ",
    insuranceClaimsSubtitle: "অগ্নিকাণ্ড সংক্রান্ত বীমা দাবির অবস্থা এবং পরিসংখ্যান",
    claimsFiled: "দাবি দাখিল করা হয়েছে",
    inProcessing: "প্রক্রিয়াধীন",
    approved: "অনুমোদিত",
    rejected: "প্রত্যাখ্যাত",
    averageClaimValue: "গড় দাবি মূল্য",
    averageProcessingTime: "গড় প্রক্রিয়াকরণ সময়",
    days: "দিন",
    generateInsuranceReport: "বীমা রিপোর্ট তৈরি করুন",
    annualComparisonTitle: "বার্ষিক অগ্নিকাণ্ড তুলনা",
    yearOverYearChange: "বছর-অনুযায়ী পরিবর্তন",
    increaseInIncidents: "ঘটনা বৃদ্ধি",
    averageResponseTime: "গড় প্রতিক্রিয়া সময়",
    fasterThanPreviousYear: "আগের বছরের তুলনায় দ্রুত",
    civilianCasualties: "বেসামরিক হতাহত",
    reductionFromLastYear: "গত বছরের তুলনায় হ্রাস",
    exportCompleteAnalytics: "সম্পূর্ণ বিশ্লেষণ রপ্তানি করুন",
    severe: "গুরুতর",
    moderate: "মাঝারি",
    minor: "সামান্য",
    language: "ভাষা"
  }
};

// Sample data for fire incidents
const fireIncidents = [
  {
    id: 1,
    location: "Burrabazar Market",
    lat: 22.5726,
    lng: 88.3639,
    date: "2025-03-15",
    damageLevel: "Severe",
    affectedArea: "2,500 sq meters",
    estimatedLoss: "₹1.2 Crore",
    affectedBusinesses: 32,
    casualties: 0,
    injuries: 3,
    reportUrl: "/reports/burrabazar-15032025.pdf"
  },
  {
    id: 2,
    location: "Howrah Industrial Estate",
    lat: 22.5958,
    lng: 88.3699,
    date: "2025-02-28",
    damageLevel: "Moderate",
    affectedArea: "1,200 sq meters",
    estimatedLoss: "₹75 Lakhs",
    affectedBusinesses: 8,
    casualties: 0,
    injuries: 1,
    reportUrl: "/reports/howrah-28022025.pdf"
  },
  {
    id: 3,
    location: "Salt Lake Sector V",
    lat: 22.5646,
    lng: 88.3531,
    date: "2025-04-02",
    damageLevel: "Minor",
    affectedArea: "450 sq meters",
    estimatedLoss: "₹25 Lakhs",
    affectedBusinesses: 2,
    casualties: 0,
    injuries: 0,
    reportUrl: "/reports/saltlake-02042025.pdf"
  },
  {
    id: 4,
    location: "Sealdah Station Area",
    lat: 22.6139,
    lng: 88.3879,
    date: "2025-01-10",
    damageLevel: "Severe",
    affectedArea: "3,200 sq meters",
    estimatedLoss: "₹2.1 Crore",
    affectedBusinesses: 47,
    casualties: 2,
    injuries: 8,
    reportUrl: "/reports/sealdah-10012025.pdf"
  },
  {
    id: 5,
    location: "New Market Area",
    lat: 22.5033,
    lng: 88.3454,
    date: "2025-03-22",
    damageLevel: "Moderate",
    affectedArea: "850 sq meters",
    estimatedLoss: "₹62 Lakhs",
    affectedBusinesses: 12,
    casualties: 0,
    injuries: 2,
    reportUrl: "/reports/newmarket-22032025.pdf"
  }
];

// Heatmap data points [lat, lng, intensity]
const heatmapPoints = [
  [22.5726, 88.3639, 0.9],  // Burrabazar - high intensity
  [22.5958, 88.3699, 0.7],  // Howrah - medium
  [22.5646, 88.3531, 0.8],  // New Market
  [22.6139, 88.3879, 0.9],  // Sealdah
  [22.5033, 88.3454, 0.5],  // Behala - lower
  [22.5833, 88.3667, 0.6],  // Additional points
  [22.5933, 88.3567, 0.4],
  [22.5633, 88.3733, 0.7]
];

// Sample data for heatmap visualization
const heatmapData = {
  labels: ['Burrabazar', 'Howrah', 'Salt Lake', 'Sealdah', 'New Market'],
  datasets: [
    {
      label: 'Fire Incidents (2025)',
      data: [12, 8, 4, 9, 7],
      backgroundColor: 'rgba(255, 99, 71, 0.6)',
    },
    {
      label: 'Fire Incidents (2024)',
      data: [10, 9, 3, 11, 5],
      backgroundColor: 'rgba(255, 159, 64, 0.6)',
    }
  ]
};

// Sample data for damage assessment chart
const damageData = {
  labels: ['Property', 'Inventory', 'Business Disruption', 'Infrastructure'],
  datasets: [
    {
      label: 'Damage Assessment (in Lakhs ₹)',
      data: [320, 280, 450, 190],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(255, 205, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
      ],
    }
  ]
};

// Type for damage levels with color coding
type DamageLevel = {
  [key: string]: {
    color: string;
    textColor: string;
  }
};

const damageLevels: DamageLevel = {
  "Severe": {
    color: "bg-red-500/20",
    textColor: "text-red-500"
  },
  "Moderate": {
    color: "bg-amber-500/20",
    textColor: "text-amber-500"
  },
  "Minor": {
    color: "bg-yellow-500/20",
    textColor: "text-yellow-500"
  }
};

// Heatmap Layer Component
const HeatmapLayer = ({ points }: { points: Array<[number, number, number]> }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // @ts-ignore - Leaflet.heat doesn't have proper TypeScript definitions
    const heatLayer = L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      minOpacity: 0.5,
      gradient: { 
        0.4: 'blue', 
        0.6: 'cyan', 
        0.7: 'lime', 
        0.8: 'yellow', 
        1.0: 'red' 
      }
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
};

// Custom fire icon
const fireIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Mock function for report download
const downloadReport = (reportUrl: string, location: string) => {
  alert(`Downloading report for ${location}...`);
  console.log(`Download URL: ${reportUrl}`);
};

const PostFireAnalysis = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("3months");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredIncidents, setFilteredIncidents] = useState(fireIncidents);
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "hi" | "bn">("en");
  
  // Texts based on the selected language
  const texts = translations[currentLanguage];

  // Filter incidents based on search and filters
  useEffect(() => {
    let results = [...fireIncidents];
    
    if (searchQuery) {
      results = results.filter(incident => 
        incident.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedLocation !== "all") {
      results = results.filter(incident => 
        incident.location === selectedLocation
      );
    }
    
    setFilteredIncidents(results);
  }, [searchQuery, selectedLocation, selectedTimeframe]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-16 px-4 md:px-6">
      <div className="container mx-auto">
        {/* Language selector */}
        <div className="flex justify-end mb-6">
          <Select value={currentLanguage} onValueChange={(value) => setCurrentLanguage(value as "en" | "hi" | "bn")}>
            <SelectTrigger className="w-40 bg-black/60 border-fire/30 text-white">
              <div className="flex items-center gap-2">
                <Globe size={16} />
                <SelectValue placeholder={texts.language} />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-black/95 border-fire/30 text-white">
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
              <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-md">
            {texts.title}
          </h1>
          <p className="text-white/80 text-lg mb-6">
            {texts.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button className="bg-fire hover:bg-fire/80 text-white flex items-center gap-2">
              <BarChart2 size={18} />
              {texts.latestAnalysisReport}
            </Button>
            <Button variant="outline" className="border-fire text-fire hover:bg-fire/10 flex items-center gap-2">
              <HelpCircle size={18} />
              {texts.howToUse}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="reports" className="w-full">
          <TabsList className="grid grid-cols-3 max-w-md mx-auto bg-black/50">
            <TabsTrigger value="reports" className="text-white data-[state=active]:bg-fire data-[state=active]:text-white">
              {texts.reports}
            </TabsTrigger>
            <TabsTrigger value="heatmap" className="text-white data-[state=active]:bg-fire data-[state=active]:text-white">
              {texts.heatmap}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-fire data-[state=active]:text-white">
              {texts.analytics}
            </TabsTrigger>
          </TabsList>

          {/* REPORTS TAB */}
          <TabsContent value="reports" className="mt-8">
            <div className="bg-black/40 backdrop-blur-sm border border-fire/20 p-6 rounded-lg mb-8">
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input 
                      placeholder={texts.searchByLocation}
                      className="pl-10 bg-black/60 border-fire/30 text-white"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="w-full sm:w-40 bg-black/60 border-fire/30 text-white">
                      <SelectValue placeholder={texts.location} />
                    </SelectTrigger>
                    <SelectContent className="bg-black/95 border-fire/30 text-white">
                      <SelectItem value="all">{texts.allLocations}</SelectItem>
                      <SelectItem value="Burrabazar Market">Burrabazar</SelectItem>
                      <SelectItem value="Howrah Industrial Estate">Howrah</SelectItem>
                      <SelectItem value="Salt Lake Sector V">Salt Lake</SelectItem>
                      <SelectItem value="Sealdah Station Area">Sealdah</SelectItem>
                      <SelectItem value="New Market Area">New Market</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                    <SelectTrigger className="w-full sm:w-40 bg-black/60 border-fire/30 text-white">
                      <SelectValue placeholder={texts.timeframe} />
                    </SelectTrigger>
                    <SelectContent className="bg-black/95 border-fire/30 text-white">
                      <SelectItem value="3months">{texts.last3Months}</SelectItem>
                      <SelectItem value="6months">{texts.last6Months}</SelectItem>
                      <SelectItem value="1year">{texts.lastYear}</SelectItem>
                      <SelectItem value="all">{texts.allTime}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredIncidents.map((incident) => (
                <Card 
                  key={incident.id} 
                  className="bg-black/80 backdrop-blur-sm border border-fire/30 hover:border-fire/50 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-5 w-5 text-fire" />
                          <CardTitle className="text-xl text-white">{incident.location}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(incident.date).toLocaleDateString('en-IN', {day: 'numeric', month: 'short', year: 'numeric'})}</span>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full ${damageLevels[incident.damageLevel].color} ${damageLevels[incident.damageLevel].textColor} text-sm font-medium`}>
                        {texts[incident.damageLevel.toLowerCase() as keyof typeof texts]}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-white/80">
                      <div>
                        <p className="text-sm text-gray-400">{texts.affectedArea}</p>
                        <p className="font-medium">{incident.affectedArea}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{texts.estimatedLoss}</p> 
                        <p className="font-medium">{incident.estimatedLoss}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{texts.affectedBusinesses}</p>
                        <p className="font-medium">{incident.affectedBusinesses}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{texts.casualtiesInjuries}</p>
                        <p className="font-medium">{incident.casualties} / {incident.injuries}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => downloadReport(incident.reportUrl, incident.location)}
                      className="w-full bg-fire hover:bg-fire/80 text-white flex items-center justify-center gap-2"
                    >
                      <Download size={18} />
                      {texts.downloadDetailedReport}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredIncidents.length === 0 && (
              <div className="text-center py-12 bg-black/40 backdrop-blur-sm border border-fire/20 rounded-lg mt-4">
                <FileText className="h-12 w-12 mx-auto text-fire/50 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">{texts.noReportsFound}</h3>
                <p className="text-gray-400">{texts.tryAdjusting}</p>
              </div>
            )}
          </TabsContent>

          {/* HEATMAP TAB */}
          <TabsContent value="heatmap" className="mt-8">
            <Card className="bg-black/80 backdrop-blur-sm border border-fire/30">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-white">{texts.heatmapTitle}</CardTitle>
                    <CardDescription className="text-gray-400 mt-1">{texts.heatmapSubtitle}</CardDescription>
                  </div>
                  <div className="flex gap-3">
                    <Select defaultValue="2025">
                      <SelectTrigger className="w-24 bg-black/60 border-fire/30 text-white">
                        <SelectValue placeholder={texts.year} />
                      </SelectTrigger>
                      <SelectContent className="bg-black/95 border-fire/30 text-white">
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" className="border-fire text-fire hover:bg-fire/10 flex items-center gap-2">
                      <Filter size={16} />
                      {texts.filters}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-8">
                  <div className="relative bg-black/50 border border-fire/20 rounded-lg p-4 h-[500px]">
                    <MapContainer 
                      center={[22.5726, 88.3639]} 
                      zoom={13} 
                      style={{ height: '100%', width: '100%' }}
                      className="z-0 rounded-md"
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      
                      <HeatmapLayer points={heatmapPoints} />
                      
                      {fireIncidents.map(incident => (
                        <Marker
                          key={incident.id}
                          position={[incident.lat, incident.lng]}
                          icon={fireIcon}
                        >
                          <Popup>
                            <div className="space-y-1">
                              <h3 className="font-bold">{incident.location}</h3>
                              <p>Severity: {incident.damageLevel}</p>
                              <p>Date: {incident.date}</p>
                              <p>Loss: {incident.estimatedLoss}</p>
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                    </MapContainer>
                  </div>
                  <p className="text-sm text-gray-400 mt-3">{texts.heatmapDescription}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-black/50 border border-fire/20 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-3">{texts.highestRiskAreas}</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex justify-between"><span>Burrabazar</span> <span className="text-red-500">{texts.high}</span></li>
                      <li className="flex justify-between"><span>Sealdah</span> <span className="text-red-500">{texts.high}</span></li>
                      <li className="flex justify-between"><span>New Market</span> <span className="text-amber-500">{texts.medium}</span></li>
                    </ul>
                  </div>
                  <div className="bg-black/50 border border-fire/20 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-3">{texts.mostImprovedAreas}</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex justify-between"><span>Salt Lake</span> <span className="text-green-500">28%</span></li>
                      <li className="flex justify-between"><span>Howrah</span> <span className="text-green-500">15%</span></li>
                      <li className="flex justify-between"><span>Park Street</span> <span className="text-green-500">12%</span></li>
                    </ul>
                  </div>
                  <div className="bg-black/50 border border-fire/20 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-3">{texts.predictionAccuracy}</h3>
                    <div className="flex flex-col items-center">
                      <div className="text-4xl font-bold text-fire mb-2">94%</div>
                      <p className="text-gray-400 text-sm">{texts.aiPredictionAccuracy}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-fire hover:bg-fire/80 text-white flex items-center justify-center gap-2">
                  <Download size={18} />
                  {texts.downloadFullHeatmapReport}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          {/* ANALYTICS TAB */}
          <TabsContent value="analytics" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card className="bg-black/80 backdrop-blur-sm border border-fire/30">
                <CardHeader>
                  <CardTitle className="text-xl text-white">{texts.damageAssessmentTitle}</CardTitle>
                  <CardDescription className="text-gray-400">{texts.damageAssessmentSubtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72 flex items-center justify-center">
                    {/* Placeholder for pie chart */}
                    <PieChart className="h-64 w-64 text-fire/50" />
                  </div>
                  <div className="text-center mt-4">
                    <div className="text-sm text-gray-400">{texts.totalEstimatedLoss}</div>
                    <div className="text-2xl font-bold text-white">₹12.4 Crore</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/80 backdrop-blur-sm border border-fire/30">
                <CardHeader>
                  <CardTitle className="text-xl text-white">{texts.insuranceClaimsTitle}</CardTitle>
                  <CardDescription className="text-gray-400">{texts.insuranceClaimsSubtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-black/50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-white">128</div>
                      <div className="text-sm text-gray-400">{texts.claimsFiled}</div>
                    </div>
                    <div className="bg-black/50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-white">43</div>
                      <div className="text-sm text-gray-400">{texts.inProcessing}</div>
                    </div>
                    <div className="bg-black/50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-white">72</div>
                      <div className="text-sm text-gray-400">{texts.approved}</div>
                    </div>
                    <div className="bg-black/50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-white">13</div>
                      <div className="text-sm text-gray-400">{texts.rejected}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/50 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">{texts.averageClaimValue}</div>
                      <div className="text-xl font-bold text-white">₹28.6 Lakhs</div>
                    </div>
                    <div className="bg-black/50 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">{texts.averageProcessingTime}</div>
                      <div className="text-xl font-bold text-white">14.2 {texts.days}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-fire hover:bg-fire/80 text-white">
                    {texts.generateInsuranceReport}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card className="bg-black/80 backdrop-blur-sm border border-fire/30">
              <CardHeader>
                <CardTitle className="text-xl text-white">{texts.annualComparisonTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 relative mb-6">
                  {/* Placeholder for bar chart */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BarChart2 className="h-64 w-64 text-fire/50" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-black/50 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">{texts.yearOverYearChange}</div>
                    <div className="text-xl font-bold text-red-500">+12% {texts.increaseInIncidents}</div>
                  </div>
                  <div className="bg-black/50 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">{texts.averageResponseTime}</div>
                    <div className="text-xl font-bold text-green-500">8.4 min (-12% {texts.fasterThanPreviousYear})</div>
                  </div>
                  <div className="bg-black/50 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">{texts.civilianCasualties}</div>
                    <div className="text-xl font-bold text-green-500">-20% {texts.reductionFromLastYear}</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-fire hover:bg-fire/80 text-white flex items-center justify-center gap-2">
                  <Download size={18} />
                  {texts.exportCompleteAnalytics}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PostFireAnalysis;