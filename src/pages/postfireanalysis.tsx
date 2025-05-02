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
import { jsPDF } from "jspdf";

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
    language: "Language",
    date: "Date",
    damageLevel: "Damage Level",
    reportDetails: "Report Details",
    generatedOn: "Generated on",
    claimsStatistics: "Claims Statistics"
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
    language: "भाषा",
    date: "दिनांक",
    damageLevel: "क्षति का स्तर",
    reportDetails: "रिपोर्ट विवरण",
    generatedOn: "उत्पन्न किया गया",
    claimsStatistics: "दावा आंकड़े"
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
    language: "ভাষা",
    date: "তারিখ",
    damageLevel: "ক্ষতির মাত্রা",
    reportDetails: "রিপোর্ট বিবরণ",
    generatedOn: "জেনারেট করা হয়েছে",
    claimsStatistics: "দাবি পরিসংখ্যান"
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
const heatmapPoints: [number, number, number][] = [
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

// PDF Generation Functions
const downloadReport = (incident, texts) => {
  const pdf = new jsPDF();
  const titleFontSize = 16;
  const headerFontSize = 12;
  const textFontSize = 10;
  
  // Title
  pdf.setFontSize(titleFontSize);
  pdf.text(`${texts.title} - ${incident.location}`, 20, 20);
  
  // Date
  pdf.setFontSize(headerFontSize);
  pdf.text(`${texts.date || 'Date'}: ${new Date(incident.date).toLocaleDateString('en-IN', {day: 'numeric', month: 'short', year: 'numeric'})}`, 20, 35);
  
  // Damage Level

  pdf.text(`${texts.damageLevel || 'Damage Level'}: ${incident.damageLevel === 'Severe' ? texts.severe : 
    (incident.damageLevel === 'Moderate' ? texts.moderate : 
    (incident.damageLevel === 'Minor' ? texts.minor : incident.damageLevel))}`, 20, 45);  // Details section
  pdf.setFontSize(headerFontSize);
  pdf.text(`${texts.reportDetails || 'Report Details'}:`, 20, 60);
  
  pdf.setFontSize(textFontSize);
  pdf.text(`${texts.affectedArea}: ${incident.affectedArea}`, 30, 70);
  pdf.text(`${texts.estimatedLoss}: ${incident.estimatedLoss}`, 30, 80);
  pdf.text(`${texts.affectedBusinesses}: ${incident.affectedBusinesses}`, 30, 90);
  pdf.text(`${texts.casualtiesInjuries}: ${incident.casualties} / ${incident.injuries}`, 30, 100);
  
  // Footer
  pdf.setFontSize(textFontSize);
  pdf.text(`${texts.generatedOn || 'Generated on'}: ${new Date().toLocaleString()}`, 20, 130);
  
  // Save PDF
  pdf.save(`fire-report-${incident.location}-${incident.date}.pdf`);
};

// For heatmap report
const downloadHeatmapReport = (texts) => {
  const pdf = new jsPDF();  
  // Title
  pdf.setFontSize(16);
  pdf.text(texts.heatmapTitle, 20, 20);
  
  // Description
  pdf.setFontSize(10);
  pdf.text(texts.heatmapDescription, 20, 30, { maxWidth: 170 });
  
  // Risk areas section
  pdf.setFontSize(12);
  pdf.text(texts.highestRiskAreas, 20, 60);
  pdf.setFontSize(10);
  pdf.text(`Burrabazar - ${texts.high}`, 30, 70);
  pdf.text(`Sealdah - ${texts.high}`, 30, 80);
  pdf.text(`New Market - ${texts.medium}`, 30, 90);
  
  // Improved areas section
  pdf.setFontSize(12);
  pdf.text(texts.mostImprovedAreas, 20, 110);
  pdf.setFontSize(10);
  pdf.text(`Salt Lake - 28%`, 30, 120);
  pdf.text(`Howrah - 15%`, 30, 130);
  pdf.text(`Park Street - 12%`, 30, 140);
  
  // Prediction accuracy
  pdf.setFontSize(12);
  pdf.text(texts.predictionAccuracy, 20, 160);
  pdf.setFontSize(10);
  pdf.text(`94% - ${texts.aiPredictionAccuracy}`, 30, 170);
  
  // Save PDF
  pdf.save(`heatmap-report-${new Date().toISOString().split('T')[0]}.pdf`);
};

// For insurance report
const generateInsuranceReport = (texts) => {
  const pdf = new jsPDF();  
  // Title
  pdf.setFontSize(16);
  pdf.text(texts.insuranceClaimsTitle, 20, 20);
  
  // Description
  pdf.setFontSize(10);
  pdf.text(texts.insuranceClaimsSubtitle, 20, 30, { maxWidth: 170 });
  
  // Claims statistics
  pdf.setFontSize(12);
  pdf.text(`${texts.claimsStatistics || 'Claims Statistics'}:`, 20, 50);
  pdf.setFontSize(10);
  pdf.text(`${texts.claimsFiled}: 128`, 30, 60);
  pdf.text(`${texts.inProcessing}: 43`, 30, 70);
  pdf.text(`${texts.approved}: 72`, 30, 80);
  pdf.text(`${texts.rejected}: 13`, 30, 90);
  
  // Additional info
  pdf.text(`${texts.averageClaimValue}: ₹28.6 Lakhs`, 30, 110);
  pdf.text(`${texts.averageProcessingTime}: 14.2 ${texts.days}`, 30, 120);
  
  // Footer
  pdf.setFontSize(10);
  pdf.text(`${texts.generatedOn || 'Generated on'}: ${new Date().toLocaleString()}`, 20, 180);
  
  // Save PDF
  pdf.save(`insurance-report-${new Date().toISOString().split('T')[0]}.pdf`);
};

// For complete analytics export
const exportCompleteAnalytics = (texts) => {
  const pdf = new jsPDF();

  // Title
  pdf.setFontSize(16);
  pdf.text(texts.annualComparisonTitle, 20, 20);
  
  // Year over year changes
  pdf.setFontSize(12);
  pdf.text(`${texts.yearOverYearChange}:`, 20, 40);
  pdf.setFontSize(10);
  pdf.text(`+12% ${texts.increaseInIncidents}`, 30, 50);
  
  // Response time
  pdf.setFontSize(12);
  pdf.text(`${texts.averageResponseTime}:`, 20, 70);
  pdf.setFontSize(10);
  pdf.text(`8.4 min (-12% ${texts.fasterThanPreviousYear})`, 30, 80);
  
  // Casualties
  pdf.setFontSize(12);
  pdf.text(`${texts.civilianCasualties}:`, 20, 100);
  pdf.setFontSize(10);
  pdf.text(`-20% ${texts.reductionFromLastYear}`, 30, 110);
  
  // Damage assessment
  pdf.setFontSize(12);
  pdf.text(`${texts.damageAssessmentTitle}:`, 20, 130);
  pdf.setFontSize(10);
  pdf.text(`${texts.totalEstimatedLoss} ₹12.4 Crore`, 30, 140);
  pdf.text('Property: ₹3.2 Crore', 30, 150);
  pdf.text('Inventory: ₹2.8 Crore', 30, 160);
  pdf.text('Business Disruption: ₹4.5 Crore', 30, 170);
  pdf.text('Infrastructure: ₹1.9 Crore', 30, 180);
  
  // Save PDF
  pdf.save(`fire-analytics-${new Date().toISOString().split('T')[0]}.pdf`);
};

// Heatmap Layer Component
const HeatmapLayer = ({ points }: { points: Array<[number, number, number]> }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // @ts-expect-error - Leaflet.heat doesn't have proper TypeScript definitions
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
        0.9: 'orange', 
        1.0: 'red' 
      }
    }).addTo(map);
    
    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);
  
  return null;
};

// Main application component
export default function FireAnalysisDashboard() {
  const [language, setLanguage] = useState("en");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [timeframe, setTimeframe] = useState("last3Months");
  const [mapCenter, setMapCenter] = useState<[number, number]>([22.5726, 88.3639]);
  const [mapZoom, setMapZoom] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredIncidents, setFilteredIncidents] = useState(fireIncidents);
  
  // Get current language texts
  const texts = translations[language as keyof typeof translations];
  
  // Filter incidents based on search query, location, and timeframe
  useEffect(() => {
    let filtered = [...fireIncidents];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(incident => 
        incident.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply location filter
    if (selectedLocation !== "all") {
      filtered = filtered.filter(incident => incident.location === selectedLocation);
    }
    
    // Apply timeframe filter
    const now = new Date();
    let cutoffDate = new Date();
    
    switch(timeframe) {
      case "last3Months":
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      case "last6Months":
        cutoffDate.setMonth(now.getMonth() - 6);
        break;
      case "lastYear":
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
      case "allTime":
      default:
        cutoffDate = new Date(0); // Beginning of time
    }
    
    filtered = filtered.filter(incident => new Date(incident.date) >= cutoffDate);
    
    setFilteredIncidents(filtered);
  }, [searchQuery, selectedLocation, timeframe]);
  
  // Handler for detailed report download
  const handleDownloadReport = (incident) => {
    console.log("Downloading report for incident:", incident);
    downloadReport(incident, texts);
  };
  
  // Handler for heatmap report download
  const handleDownloadHeatmapReport = () => {
    downloadHeatmapReport(texts);
  };
  
  // Handler for insurance report generation
  const handleGenerateInsuranceReport = () => {
    generateInsuranceReport(texts);
  };
  
  // Handler for analytics export
  const handleExportAnalytics = () => {
    exportCompleteAnalytics(texts);
  };
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{texts.title}</h1>
          <p className="text-gray-500">{texts.subtitle}</p>
        </div>
        <div className="flex gap-2 items-center">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={texts.language} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिन्दी</SelectItem>
              <SelectItem value="bn">বাংলা</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <HelpCircle className="h-4 w-4 mr-2" />
            {texts.howToUse}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="reports" className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reports">
            <FileText className="h-4 w-4 mr-2" />
            {texts.reports}
          </TabsTrigger>
          <TabsTrigger value="heatmap">
            <MapPin className="h-4 w-4 mr-2" />
            {texts.heatmap}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart2 className="h-4 w-4 mr-2" />
            {texts.analytics}
          </TabsTrigger>
        </TabsList>
        
        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <div className="grow">
              <div className="relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder={texts.searchByLocation} 
                  className="pl-8" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={texts.location} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{texts.allLocations}</SelectItem>
                {fireIncidents.map(incident => (
                  <SelectItem key={incident.id} value={incident.location}>
                    {incident.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={texts.timeframe} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last3Months">{texts.last3Months}</SelectItem>
                <SelectItem value="last6Months">{texts.last6Months}</SelectItem>
                <SelectItem value="lastYear">{texts.lastYear}</SelectItem>
                <SelectItem value="allTime">{texts.allTime}</SelectItem>
              </SelectContent>
            </Select>
            <Button size="icon" variant="outline">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          {filteredIncidents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredIncidents.map(incident => (
                <Card key={incident.id} className="overflow-hidden">
                  <CardHeader className={`${damageLevels[incident.damageLevel].color}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{incident.location}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(incident.date).toLocaleDateString('en-IN', {day: 'numeric', month: 'short', year: 'numeric'})}
                        </CardDescription>
                      </div>
                      <div className={`px-2 py-1 rounded-md text-xs font-medium ${damageLevels[incident.damageLevel].color} ${damageLevels[incident.damageLevel].textColor}`}>
                        {texts[incident.damageLevel.toLowerCase()] || incident.damageLevel}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">{texts.affectedArea}</p>
                        <p className="font-medium">{incident.affectedArea}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{texts.estimatedLoss}</p>
                        <p className="font-medium">{incident.estimatedLoss}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{texts.affectedBusinesses}</p>
                        <p className="font-medium">{incident.affectedBusinesses}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{texts.casualtiesInjuries}</p>
                        <p className="font-medium">{incident.casualties} / {incident.injuries}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-black py-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full flex gap-2"
                      onClick={() => handleDownloadReport(incident)}
                    >
                      <Download className="h-4 w-4" />
                      {texts.downloadDetailedReport}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium">{texts.noReportsFound}</h3>
              <p className="text-gray-500">{texts.tryAdjusting}</p>
            </div>
          )}
        </TabsContent>
        
        {/* Heatmap Tab */}
        <TabsContent value="heatmap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{texts.heatmapTitle}</CardTitle>
              <CardDescription>{texts.heatmapSubtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <Select defaultValue="2025">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder={texts.year} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  {texts.filters}
                </Button>
              </div>
              
              <div className="border rounded-md h-[400px] overflow-hidden">
                <div className="h-full w-full">
                  <MapContainer 
                    center={mapCenter} 
                    zoom={mapZoom} 
                    style={{ height: '100%', width: '100%' }}
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
                      >
                        <Popup>
                          <div className="p-2">
                            <h3 className="font-medium">{incident.location}</h3>
                            <p className="text-sm">{texts.date}: {new Date(incident.date).toLocaleDateString()}</p>
                            <p className="text-sm">
                              {texts.damageLevel}: {texts[incident.damageLevel.toLowerCase()] || incident.damageLevel}
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{texts.highestRiskAreas}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Burrabazar</span>
                        <span className="font-medium text-red-500">High</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Sealdah</span>
                        <span className="font-medium text-red-500">High</span>
                      </li>
                      <li className="flex justify-between">
                        <span>New Market</span>
                        <span className="font-medium text-amber-500">Medium</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{texts.mostImprovedAreas}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Salt Lake</span>
                        <span className="font-medium text-green-500">-28%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Howrah</span>
                        <span className="font-medium text-green-500">-15%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Park Street</span>
                        <span className="font-medium text-green-500">-12%</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{texts.predictionAccuracy}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <span className="text-blue-700 font-bold">94%</span>
                      </div>
                      <div className="text-sm">
                        <p>{texts.aiPredictionAccuracy}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-black py-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full flex gap-2"
                onClick={handleDownloadHeatmapReport}
              >
                <Download className="h-4 w-4" />
                {texts.downloadFullHeatmapReport}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>{texts.damageAssessmentTitle}</CardTitle>
                <CardDescription>{texts.damageAssessmentSubtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* We would render a chart here - using a placeholder div */}
                <div className="bg-red-950 rounded-md p-4 h-64 flex items-center justify-center">
                  <PieChart className="h-12 w-12 text-gray-400" />
                </div>
                <div className="mt-4">
                  <p className="font-medium">{texts.totalEstimatedLoss}</p>
                  <h3 className="text-2xl font-bold">₹12.4 Crore</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{texts.insuranceClaimsTitle}</CardTitle>
                <CardDescription>{texts.insuranceClaimsSubtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-black p-3 rounded-md">
                    <p className="text-xs text-blue-600">{texts.claimsFiled}</p>
                    <h4 className="text-2xl font-bold">128</h4>
                  </div>
                  <div className="bg-red-950 p-3 rounded-md">
                    <p className="text-xs text-amber-600">{texts.inProcessing}</p>
                    <h4 className="text-2xl font-bold">43</h4>
                  </div>
                  <div className="bg-red-950 p-3 rounded-md">
                    <p className="text-xs text-green-600">{texts.approved}</p>
                    <h4 className="text-2xl font-bold">72</h4>
                  </div>
                  <div className="bg-black p-3 rounded-md">
                    <p className="text-xs text-red-600">{texts.rejected}</p>
                    <h4 className="text-2xl font-bold">13</h4>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{texts.averageClaimValue}</span>
                    <span className="font-medium">₹28.6 Lakhs</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{texts.averageProcessingTime}</span>
                    <span className="font-medium">14.2 {texts.days}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-red-950 py-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full flex gap-2"
                  onClick={handleGenerateInsuranceReport}
                >
                  <Download className="h-4 w-4" />
                  {texts.generateInsuranceReport}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>{texts.annualComparisonTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* We would render a chart here - using a placeholder div */}
              <div className="bg-red-950 rounded-md p-4 h-64 flex items-center justify-center">
                <BarChart2 className="h-12 w-12 text-gray-400" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="border p-3 rounded-md">
                  <p className="text-xs text-gray-500">{texts.yearOverYearChange}</p>
                  <h4 className="text-xl font-bold text-red-500">+12%</h4>
                  <p className="text-xs text-gray-500">{texts.increaseInIncidents}</p>
                </div>
                <div className="border p-3 rounded-md">
                  <p className="text-xs text-gray-500">{texts.averageResponseTime}</p>
                  <h4 className="text-xl font-bold text-green-500">8.4 min</h4>
                  <p className="text-xs text-gray-500">-12% {texts.fasterThanPreviousYear}</p>
                </div>
                <div className="border p-3 rounded-md">
                  <p className="text-xs text-gray-500">{texts.civilianCasualties}</p>
                  <h4 className="text-xl font-bold text-green-500">-20%</h4>
                  <p className="text-xs text-gray-500">{texts.reductionFromLastYear}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-red-800 py-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full flex gap-2"
                onClick={handleExportAnalytics}
              >
                <Download className="h-4 w-4" />
                {texts.exportCompleteAnalytics}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
