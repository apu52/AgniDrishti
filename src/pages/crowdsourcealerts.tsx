import React, { useState } from 'react';
import { 
  Bell, 
  MapPin, 
  Calendar, 
  Camera, 
  FileText, 
  Send, 
  CheckCircle,
  Users,
  Filter,
  Search,
  AlertTriangle,
  Globe
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data for recent alerts
const recentAlerts = [
  {
    id: 1,
    location: "Burrabazar, Kolkata",
    timestamp: "10 minutes ago",
    type: "Active Fire",
    description: "Commercial market fire on the 2nd floor, cloth merchants area",
    verified: true,
    upvotes: 23,
    severity: "high"
  },
  {
    id: 2,
    location: "Howrah Station Area",
    timestamp: "25 minutes ago",
    type: "Smoke",
    description: "Heavy smoke from warehouse near platform 8",
    verified: false,
    upvotes: 12,
    severity: "medium"
  },
  {
    id: 3,
    location: "Salt Lake Sector V",
    timestamp: "45 minutes ago",
    type: "Electrical",
    description: "Sparking from transformer near IT building",
    verified: true,
    upvotes: 18,
    severity: "medium"
  },
  {
    id: 4,
    location: "Barasat Market",
    timestamp: "1 hour ago",
    type: "Gas Leak",
    description: "Strong gas smell from restaurant area",
    verified: false,
    upvotes: 7,
    severity: "medium"
  },
  {
    id: 5,
    location: "New Town Action Area I",
    timestamp: "2 hours ago",
    type: "Small Fire",
    description: "Garbage fire near residential complex",
    verified: true,
    upvotes: 3,
    severity: "low"
  }
];

// Sample data for high-risk zones
const riskZones = [
  { id: 1, name: "Burrabazar Market Complex", level: "Critical", incidents: 32 },
  { id: 2, name: "Howrah Industrial Belt", level: "High", incidents: 27 },
  { id: 3, name: "Tangra Leather Complex", level: "High", incidents: 24 },
  { id: 4, name: "Gariahat Market", level: "Medium", incidents: 19 },
  { id: 5, name: "Behala Industrial Area", level: "Medium", incidents: 15 }
];

const CrowdsourcedAlerts = () => {
  const [language, setLanguage] = useState("english");
  const [filter, setFilter] = useState("all");
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [newReport, setNewReport] = useState({
    location: "",
    type: "smoke",
    description: "",
    image: null,
    severity: "medium"
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Language translations
  const translations = {
    english: {
      title: "Crowdsourced Fire Alerts",
      subtitle: "Real-time community reports to accelerate emergency response",
      reportButton: "Report Fire Incident",
      recentAlerts: "Recent Alerts",
      highRiskZones: "High-Risk Zones in Bengal",
      filterBy: "Filter By:",
      all: "All",
      active: "Active Fires",
      smoke: "Smoke",
      electrical: "Electrical",
      verified: "Verified",
      search: "Search location...",
      reportForm: {
        title: "Report New Incident",
        location: "Location",
        type: "Incident Type",
        description: "Description",
        upload: "Upload Photo",
        severity: "Severity",
        submit: "Submit Report",
        placeholder: "Describe what you see..."
      },
      success: "Your report has been submitted successfully!",
      viewMore: "View More",
    },
    hindi: {
      title: "सामूहिक आग अलर्ट",
      subtitle: "आपातकालीन प्रतिक्रिया को तेज करने के लिए वास्तविक समय समुदाय रिपोर्ट",
      reportButton: "आग की घटना की रिपोर्ट करें",
      recentAlerts: "हाल के अलर्ट",
      highRiskZones: "बंगाल में उच्च जोखिम वाले क्षेत्र",
      filterBy: "फ़िल्टर करें:",
      all: "सभी",
      active: "सक्रिय आग",
      smoke: "धुआं",
      electrical: "बिजली",
      verified: "सत्यापित",
      search: "स्थान खोजें...",
      reportForm: {
        title: "नई घटना की रिपोर्ट करें",
        location: "स्थान",
        type: "घटना का प्रकार",
        description: "विवरण",
        upload: "फोटो अपलोड करें",
        severity: "गंभीरता",
        submit: "रिपोर्ट जमा करें",
        placeholder: "वर्णन करें कि आप क्या देखते हैं..."
      },
      success: "आपकी रिपोर्ट सफलतापूर्वक जमा कर दी गई है!",
      viewMore: "और देखें",
    },
    bengali: {
      title: "সমষ্টিগত অগ্নি সতর্কতা",
      subtitle: "জরুরী প্রতিক্রিয়া ত্বরান্বিত করতে রিয়েল-টাইম সম্প্রদায় রিপোর্ট",
      reportButton: "অগ্নিকাণ্ডের ঘটনা রিপোর্ট করুন",
      recentAlerts: "সাম্প্রতিক সতর্কতা",
      highRiskZones: "বাংলায় উচ্চ ঝুঁকিপূর্ণ অঞ্চল",
      filterBy: "ফিল্টার করুন:",
      all: "সব",
      active: "সক্রিয় আগুন",
      smoke: "ধোঁয়া",
      electrical: "বৈদ্যুতিক",
      verified: "যাচাই করা",
      search: "অবস্থান খুঁজুন...",
      reportForm: {
        title: "নতুন ঘটনা রিপোর্ট করুন",
        location: "অবস্থান",
        type: "ঘটনার ধরন",
        description: "বিবরণ",
        upload: "ছবি আপলোড করুন",
        severity: "তীব্রতা",
        submit: "রিপোর্ট জমা দিন",
        placeholder: "আপনি যা দেখছেন তা বর্ণনা করুন..."
      },
      success: "আপনার রিপোর্ট সফলভাবে জমা দেওয়া হয়েছে!",
      viewMore: "আরো দেখুন",
    }
  };

  const text = translations[language];
  
  // Filter alerts based on selection
  const filteredAlerts = filter === "all" 
    ? recentAlerts 
    : filter === "verified" 
      ? recentAlerts.filter(alert => alert.verified) 
      : recentAlerts.filter(alert => alert.type.toLowerCase().includes(filter.toLowerCase()));

  const handleReportSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted report:", newReport);
    // Here you would normally send the data to your backend
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setReportModalOpen(false);
      setNewReport({
        location: "",
        type: "smoke",
        description: "",
        image: null,
        severity: "medium"
      });
    }, 2000);
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case "high": return "text-red-500";
      case "medium": return "text-orange-400";
      case "low": return "text-yellow-300";
      default: return "text-orange-400";
    }
  };

  const getRiskLevelColor = (level) => {
    switch(level) {
      case "Critical": return "text-red-500";
      case "High": return "text-orange-400";
      case "Medium": return "text-yellow-300";
      default: return "text-green-400";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header section with parallax effect */}
      <section className="relative py-20 bg-gradient-to-b from-black via-black to-fire/30">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('/img/fire-texture.jpg')] bg-cover bg-center bg-no-repeat"></div>
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">
                {text.title}
              </h1>
              <p className="text-white/90 text-lg max-w-2xl">
                {text.subtitle}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setReportModalOpen(true)}
                className="bg-fire hover:bg-fire/90 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 shadow-lg shadow-fire/20 transition-all duration-300"
              >
                <Bell className="h-5 w-5" />
                {text.reportButton}
              </button>
              <div className="flex rounded-lg overflow-hidden border border-white/20">
                <button 
                  onClick={() => setLanguage("english")} 
                  className={`px-3 py-2 ${language === "english" ? "bg-fire/80" : "bg-black/80"}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLanguage("hindi")} 
                  className={`px-3 py-2 ${language === "hindi" ? "bg-fire/80" : "bg-black/80"}`}
                >
                  हिंदी
                </button>
                <button 
                  onClick={() => setLanguage("bengali")} 
                  className={`px-3 py-2 ${language === "bengali" ? "bg-fire/80" : "bg-black/80"}`}
                >
                  বাংলা
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 bg-black">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent alerts column */}
            <div className="lg:col-span-2">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h2 className="text-2xl font-bold mb-4 md:mb-0 flex items-center">
                  <Bell className="mr-2 h-6 w-6 text-fire" />
                  {text.recentAlerts}
                </h2>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center bg-black/60 border border-white/20 rounded-lg overflow-hidden">
                    <button 
                      className={`px-3 py-1 text-sm ${filter === "all" ? "bg-fire/80" : ""}`} 
                      onClick={() => setFilter("all")}
                    >
                      {text.all}
                    </button>
                    <button 
                      className={`px-3 py-1 text-sm ${filter === "Active" ? "bg-fire/80" : ""}`} 
                      onClick={() => setFilter("Active")}
                    >
                      {text.active}
                    </button>
                    <button 
                      className={`px-3 py-1 text-sm ${filter === "Smoke" ? "bg-fire/80" : ""}`} 
                      onClick={() => setFilter("Smoke")}
                    >
                      {text.smoke}
                    </button>
                    <button 
                      className={`px-3 py-1 text-sm ${filter === "Electrical" ? "bg-fire/80" : ""}`} 
                      onClick={() => setFilter("Electrical")}
                    >
                      {text.electrical}
                    </button>
                    <button 
                      className={`px-3 py-1 text-sm ${filter === "verified" ? "bg-fire/80" : ""}`} 
                      onClick={() => setFilter("verified")}
                    >
                      {text.verified}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={text.search}
                      className="pl-9 pr-4 py-1 rounded-lg bg-black/60 border border-white/20 text-white/90 text-sm w-full"
                    />
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                  </div>
                </div>
              </div>

              {/* Alerts grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAlerts.map((alert) => (
                  <Card 
                    key={alert.id} 
                    className="bg-black/90 backdrop-blur-sm border border-fire/30 hover:border-fire/50 transition-all duration-300"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <AlertTriangle className={`h-5 w-5 mr-2 ${getSeverityColor(alert.severity)}`} />
                          <CardTitle className="text-lg text-white">{alert.type}</CardTitle>
                        </div>
                        {alert.verified && (
                          <span className="bg-green-500/20 text-green-400 text-xs py-1 px-2 rounded-full flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {text.verified}
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 text-fire/80 mr-2 mt-1 flex-shrink-0" />
                          <p className="text-white/90">{alert.location}</p>
                        </div>
                        <div className="flex items-start">
                          <Calendar className="h-4 w-4 text-fire/80 mr-2 mt-1 flex-shrink-0" />
                          <p className="text-white/70 text-sm">{alert.timestamp}</p>
                        </div>
                        <p className="text-white/80 text-sm">{alert.description}</p>
                        <div className="flex justify-between items-center pt-2">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-fire/80 mr-1" />
                            <span className="text-white/70 text-sm">{alert.upvotes} confirmed</span>
                          </div>
                          <button className="text-fire/90 hover:text-fire text-sm font-medium">
                            {language === "english" ? "View Details" : language === "hindi" ? "विवरण देखें" : "বিস্তারিত দেখুন"}
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar with high-risk zones */}
            <div>
              <Card className="bg-black/90 backdrop-blur-sm border border-fire/30 mb-6">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-fire" />
                    {text.highRiskZones}
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    {language === "english" 
                      ? "Areas with historically high fire incidents" 
                      : language === "hindi" 
                        ? "ऐतिहासिक रूप से अधिक आग की घटनाओं वाले क्षेत्र" 
                        : "ঐতিহাসিকভাবে অগ্নিকাণ্ডের ঘটনা বেশি এমন এলাকা"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {riskZones.map((zone) => (
                      <div key={zone.id} className="flex justify-between items-center p-3 rounded-lg bg-black/60 border border-white/10">
                        <div>
                          <h4 className="font-medium text-white">{zone.name}</h4>
                          <div className="flex items-center mt-1">
                            <span className={`text-sm ${getRiskLevelColor(zone.level)}`}>{zone.level}</span>
                            <span className="mx-2 text-white/30">•</span>
                            <span className="text-sm text-white/70">{zone.incidents} {language === "english" ? "incidents" : language === "hindi" ? "घटनाएँ" : "ঘটনা"}</span>
                          </div>
                        </div>
                        <button className="p-2 rounded-full hover:bg-white/10">
                          <MapPin className="h-4 w-4 text-fire/80" />
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/90 backdrop-blur-sm border border-fire/30">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-fire" />
                    {language === "english" ? "Local Resources" : language === "hindi" ? "स्थानीय संसाधन" : "স্থানীয় সংস্থান"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-black/60 border border-white/10">
                      <h4 className="font-medium text-white flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-fire/80" />
                        {language === "english" ? "Emergency Contacts" : language === "hindi" ? "आपातकालीन संपर्क" : "জরুরী যোগাযোগ"}
                      </h4>
                      <div className="mt-2 space-y-2 text-sm text-white/80">
                        <p>West Bengal Fire & Emergency Services: 101</p>
                        <p>Kolkata Fire Brigade HQ: 033-2226-0101</p>
                        <p>Disaster Management: 1070</p>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-black/60 border border-white/10">
                      <h4 className="font-medium text-white flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-fire/80" />
                        {language === "english" ? "Safety Tips" : language === "hindi" ? "सुरक्षा युक्तियाँ" : "নিরাপত্তা টিপস"}
                      </h4>
                      <button className="mt-2 w-full py-2 px-3 bg-fire/20 hover:bg-fire/30 text-white rounded-lg text-sm transition-colors flex items-center justify-center">
                        <FileText className="h-4 w-4 mr-2" />
                        {language === "english" ? "Download Fire Safety Guide (Bengali/Hindi)" : language === "hindi" ? "अग्नि सुरक्षा गाइड डाउनलोड करें" : "অগ্নি নিরাপত্তা গাইড ডাউনলোড করুন"}
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Local Statistics Section */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-white">
              {language === "english" ? "Bengal Fire Statistics" : language === "hindi" ? "बंगाल अग्नि आंकड़े" : "বাংলা অগ্নি পরিসংখ্যান"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-black/90 backdrop-blur-sm border border-fire/30">
                <CardHeader>
                  <CardTitle className="text-lg text-white">
                    {language === "english" ? "Market Fires (2023-2024)" : language === "hindi" ? "बाजार आग (2023-2024)" : "বাজারে আগুন (২০২৩-২০২৪)"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-fire mb-2">76</div>
                  <p className="text-white/70">
                    {language === "english" 
                      ? "47% occurred in densely packed commercial areas" 
                      : language === "hindi" 
                        ? "47% घनी व्यापारिक क्षेत्रों में हुई" 
                        : "৪৭% ঘটেছে ঘনবসতিপূর্ণ বাণিজ্যিক এলাকায়"}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-black/90 backdrop-blur-sm border border-fire/30">
                <CardHeader>
                  <CardTitle className="text-lg text-white">
                    {language === "english" ? "Industrial Fires" : language === "hindi" ? "औद्योगिक आग" : "শিল্প অগ্নিকাণ্ড"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-fire mb-2">53</div>
                  <p className="text-white/70">
                    {language === "english" 
                      ? "Mostly in Howrah & North 24 Parganas industrial zones" 
                      : language === "hindi" 
                        ? "मुख्य रूप से हावड़ा और उत्तर 24 परगना औद्योगिक क्षेत्रों में" 
                        : "মূলত হাওড়া ও উত্তর ২৪ পরগনা শিল্প অঞ্চলে"}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-black/90 backdrop-blur-sm border border-fire/30">
                <CardHeader>
                  <CardTitle className="text-lg text-white">
                    {language === "english" ? "Response Time" : language === "hindi" ? "प्रतिक्रिया समय" : "প্রতিক্রিয়া সময়"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-fire mb-2">23<span className="text-xl">min</span></div>
                  <p className="text-white/70">
                    {language === "english" 
                      ? "Average response time in crowded areas" 
                      : language === "hindi" 
                        ? "भीड़भाड़ वाले इलाकों में औसत प्रतिक्रिया समय" 
                        : "ভিড় এলাকায় গড় প্রতিক্রিয়া সময়"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Report Incident Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/80" onClick={() => setReportModalOpen(false)}></div>
          <div className="relative bg-black/95 border border-fire/40 rounded-xl p-6 w-full max-w-lg">
            {submitSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{text.success}</h3>
                <p className="text-white/70">
                  {language === "english" 
                    ? "Emergency services have been notified." 
                    : language === "hindi" 
                      ? "आपातकालीन सेवाओं को सूचित कर दिया गया है।" 
                      : "জরুরী পরিষেবাগুলিকে অবহিত করা হয়েছে।"}
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-white mb-6">{text.reportForm.title}</h3>
                <form onSubmit={handleReportSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/80 mb-2">{text.reportForm.location}</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={newReport.location}
                          onChange={(e) => setNewReport({...newReport, location: e.target.value})}
                          className="w-full bg-black border border-white/30 rounded-lg px-4 py-2 text-white"
                          placeholder="Enter address or location"
                          required
                        />
                        <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-fire/70" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-white/80 mb-2">{text.reportForm.type}</label>
                      <select
                        value={newReport.type}
                        onChange={(e) => setNewReport({...newReport, type: e.target.value})}
                        className="w-full bg-black border border-white/30 rounded-lg px-4 py-2 text-white"
                        required
                      >
                        <option value="smoke">
                          {language === "english" ? "Smoke" : language === "hindi" ? "धुआं" : "ধোঁয়া"}
                        </option>
                        <option value="active fire">
                          {language === "english" ? "Active Fire" : language === "hindi" ? "सक्रिय आग" : "সক্রিয় আগুন"}
                        </option>
                        <option value="electrical">
                          {language === "english" ? "Electrical Issue" : language === "hindi" ? "बिजली की समस्या" : "বৈদ্যুতিক সমস্যা"}
                        </option>
                        <option value="gas leak">
                          {language === "english" ? "Gas Leak" : language === "hindi" ? "गैस लीक" : "গ্যাস লিক"}
                        </option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-white/80 mb-2">{text.reportForm.severity}</label>
                      <div className="flex border border-white/30 rounded-lg overflow-hidden">
                        <button 
                          type="button"
                          className={`flex-1 py-2 ${newReport.severity === "low" ? "bg-yellow-500/30 text-yellow-300" : "bg-black text-white/70"}`}
                          onClick={() => setNewReport({...newReport, severity: "low"})}>
  {language === "english" ? "Low" : language === "hindi" ? "कम" : "কম"}
</button>
<button 
  type="button"
  className={`flex-1 py-2 ${newReport.severity === "medium" ? "bg-orange-500/30 text-orange-300" : "bg-black text-white/70"}`}
  onClick={() => setNewReport({...newReport, severity: "medium"})}>
  {language === "english" ? "Medium" : language === "hindi" ? "मध्यम" : "মাঝারি"}
</button>
<button 
  type="button"
  className={`flex-1 py-2 ${newReport.severity === "high" ? "bg-red-500/30 text-red-300" : "bg-black text-white/70"}`}
  onClick={() => setNewReport({...newReport, severity: "high"})}>
  {language === "english" ? "High" : language === "hindi" ? "उच्च" : "উচ্চ"}
</button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-white/80 mb-2">{text.reportForm.description}</label>
                      <textarea
                        value={newReport.description}
                        onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                        className="w-full bg-black border border-white/30 rounded-lg px-4 py-2 text-white h-24"
                        placeholder={text.reportForm.placeholder}
                        required
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-white/80 mb-2">{text.reportForm.upload}</label>
                      <button
                        type="button"
                        className="w-full border border-dashed border-white/30 rounded-lg p-4 flex flex-col items-center justify-center hover:border-fire/50 transition-colors"
                        onClick={() => document.getElementById('photo-upload').click()}
                      >
                        <Camera className="h-8 w-8 text-fire/70 mb-2" />
                        <span className="text-white/70 text-sm">
                          {language === "english" ? "Click to upload" : language === "hindi" ? "अपलोड करने के लिए क्लिक करें" : "আপলোড করতে ক্লিক করুন"}
                        </span>
                        <input 
                          id="photo-upload" 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => setNewReport({...newReport, image: e.target.files[0]})}
                        />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button 
                      type="submit" 
                      className="w-full bg-fire hover:bg-fire/90 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 shadow-lg shadow-fire/20"
                    >
                      <Send className="h-5 w-5" />
                      {text.reportForm.submit}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CrowdsourcedAlerts;