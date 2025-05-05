import { useState, useEffect } from "react";
import { MapPin, AlertTriangle, Users, Clock, ThermometerSun, Flag, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress"; // Import Progress for loading
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip, // Renamed to avoid conflict with Leaflet Tooltip
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
// --- Firebase Imports ---
import { database } from "@/firebase-config"; // Adjust path if needed
import { ref, onValue, off } from "firebase/database";
// --- End Firebase Imports ---

import $ from 'jquery';


// Type definitions
type FireSeverity = "critical" | "high" | "medium" | "low" | "controlled";

interface FireIncident {
  incidentId: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    area: string;
  };
  severity: FireSeverity;
  reportTime: string;
  source: "sensor" | "crowdsourced" | "emergency-services";
  status: "active" | "responding" | "contained" | "extinguished";
  temperature?: number;
  reportedBy?: string;
  details?: string;
  evacuationStatus?: string;
  respondingUnits?: string[];
  verifiedReports: number;
}

interface KolkataArea {
  name: string;
  riskLevel: "high" | "medium" | "low";
  activeFires: number;
}

// Create custom fire icons
const fireIcon = (severity: FireSeverity) => {
  const iconColor = {
    critical: 'red',
    high: 'orange',
    medium: 'yellow',
    low: 'blue',
    controlled: 'green'
  };

  return new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

// Sample data
const kolkataAreas: KolkataArea[] = [
  { name: "Burrabazar", riskLevel: "high", activeFires: 2 },
  { name: "Salt Lake", riskLevel: "low", activeFires: 0 },
  { name: "Howrah", riskLevel: "medium", activeFires: 1 },
  { name: "Park Street", riskLevel: "low", activeFires: 0 },
  { name: "New Market", riskLevel: "high", activeFires: 1 },
  { name: "Gariahat", riskLevel: "medium", activeFires: 0 },
  { name: "Barrackpore", riskLevel: "low", activeFires: 0 },
  { name: "Behala", riskLevel: "medium", activeFires: 1 }
];
// Data for the fire trend chart
const fireTrendData = [
  { month: "Jan", incidents: 12 },
  { month: "Feb", incidents: 18 },
  { month: "Mar", incidents: 25 },
  { month: "Apr", incidents: 31 },
  { month: "May", incidents: 40 },
  { month: "Jun", incidents: 22 },
  { month: "Jul", incidents: 15 },
  { month: "Aug", incidents: 19 },
  { month: "Sep", incidents: 20 },
  { month: "Oct", incidents: 28 },
  { month: "Nov", incidents: 35 },
  { month: "Dec", incidents: 38 },
];

// Helper functions
const getSeverityColor = (severity: FireSeverity): string => {
  const colors = {
    critical: "bg-red-600 text-white",
    high: "bg-orange-500 text-white",
    medium: "bg-yellow-500 text-black",
    low: "bg-blue-500 text-white",
    controlled: "bg-green-500 text-white"
  };
  return colors[severity];
};

const getSourceIcon = (source: string) => {
  switch (source) {
    case "sensor":
      return <ThermometerSun className="h-4 w-4 mr-1" />;
    case "crowdsourced":
      return <Users className="h-4 w-4 mr-1" />;
    case "emergency-services":
      return <Flag className="h-4 w-4 mr-1" />;
    default:
      return <Info className="h-4 w-4 mr-1" />;
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ", " +
         date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

// Main component
const LiveFireDashboard = () => {
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const [allIncidents, setAllIncidents] = useState<FireIncident[]>([]); // State for all fetched incidents
  const [filteredIncidents, setFilteredIncidents] = useState<FireIncident[]>([]); // State for displayed incidents
  const [selectedIncident, setSelectedIncident] = useState<FireIncident | null>(null);
  const [activeIncidentsCount, setActiveIncidentsCount] = useState<number>(0);
  const [currentTab, setCurrentTab] = useState<string>("map");
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // --- Firebase Realtime Listener ---
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    // Define the path in your Firebase Realtime Database where the incident data is stored.
    // Adjust '/hardware-data' to your actual path.
    const incidentsRef = ref(database, '/');

    const unsubscribe = onValue(incidentsRef, (snapshot) => {
      if (snapshot.exists()) {
        const rawData = snapshot.val();
        // --- Data Transformation ---
        // This part is crucial and depends heavily on your Firebase data structure.
        // You need to map the rawData object into an array of FireIncident objects.
        // Example transformation (assuming rawData is an object where keys are incident IDs):
        const transformedIncidents: FireIncident[] = Object.entries(rawData).map(([key, value]: [string, Partial<FireIncident>]) => {
          // Basic mapping - *ADJUST THIS LOGIC BASED ON YOUR ACTUAL FIREBASE DATA*
          return {
            incidentId: key,
            location: {
              lat: value.location?.lat || 22.5581, // Default or fallback
              lng: value.location?.lng || 88.3961, // Default or fallback
              address: value.location?.address || "Beleghata",
              area: value.location?.area || "RCCIIT",
            },
            // Determine severity based on data (e.g., temperature)
            severity: determineSeverity(value.temperature),
            reportTime: (value as { timestamp?: string })?.timestamp || new Date().toISOString(),
            source: value.source || "sensor", // Assuming sensor data
            // Determine status based on data
            status: determineStatus(value.status),
            temperature: value.temperature,
            details: value.details || "No details available.",
            evacuationStatus: value.evacuationStatus || "Unknown",
            respondingUnits: value.respondingUnits || [],
            verifiedReports: value.verifiedReports || 0, // If you store this
            // Add other fields as needed
          };
        });
        // --- End Data Transformation ---

        setAllIncidents(transformedIncidents);
        setError(null);
      } else {
        console.log("No data available at the specified path.");
        setAllIncidents([]); // Clear incidents if no data
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Firebase read failed:", error);
      setError("Failed to fetch real-time data. Please check the connection.");
      setIsLoading(false);
    });

    // Cleanup function to detach the listener when the component unmounts
    return () => {
      off(incidentsRef, 'value', unsubscribe);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- Helper functions for data transformation (examples) ---
  const determineSeverity = (temperature: number | undefined): FireSeverity => {
    if (!temperature) return "low";
    if (temperature > 350) return "critical";
    if (temperature > 250) return "high";
    if (temperature > 100) return "medium";
    return "low";
  };

  const determineStatus = (statusValue: unknown): FireIncident['status'] => {
    // Add logic based on your data, e.g., if response units are present, etc.
    if (typeof statusValue === "string" && ["active", "responding", "contained", "extinguished"].includes(statusValue)) {
        return statusValue as FireIncident['status'];
    }
    return "active"; // Default to active
  };
  // --- End Helper functions ---

  useEffect(() => {
    // Filter incidents based on selected area
    if (selectedArea === "all") {
      setFilteredIncidents(allIncidents);
    } else {
      setFilteredIncidents(
        allIncidents.filter(incident => incident.location.area === selectedArea)
      );
    }

    // Count active incidents
    setActiveIncidentsCount(
      allIncidents.filter(incident => incident.status === "active").length
    );

    // Set default selected incident if none is selected or if the selected one is filtered out
    const currentFilteredIds = filteredIncidents.map(inc => inc.incidentId);
    if (!selectedIncident || !currentFilteredIds.includes(selectedIncident.incidentId)) {
        setSelectedIncident(filteredIncidents.length > 0 ? filteredIncidents[0] : null);
    }
  }, [selectedArea, allIncidents, filteredIncidents, selectedIncident]); // Update filtering when allIncidents or selectedArea changes

  // Function to simulate new fire alert
  const simulateNewAlert = () => {
    // In a real application, this would come from a websocket or polling API
    alert("New fire alert detected in Salt Lake sector V! Check the dashboard for details.");
  };

  // Function to verify a report (would connect to backend in real app)
  const verifyReport = (id: string) => {
    // This function might need to interact with Firebase to update the count there
    // For now, it just updates the local state for demonstration
    const updatedAllIncidents = allIncidents.map(incident =>
      incident.incidentId === id
        ? {...incident, verifiedReports: incident.verifiedReports + 1}
        : incident
    );
    setAllIncidents(updatedAllIncidents); // Update the source data

    // Update selected incident if it's the one being verified
    if (selectedIncident && selectedIncident.incidentId === id) {
      setSelectedIncident({
        ...selectedIncident,
        verifiedReports: selectedIncident.verifiedReports + 1
      });
    }
  };

  // Function to toggle between tabs
  const handleTabChange = (value: string) => {
    setCurrentTab(value);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 py-16 z-30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start">
          {/* Header Section */}
          <div className="w-full mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center">
              <AlertTriangle className="mr-3 h-8 w-8 text-fire" />
              Live Fire Tracking Dashboard
            </h1>
            <p className="text-white/80 text-lg mb-6">
              Real-time fire visualization with sensor data & crowdsourced updates
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Select value={selectedArea} onValueChange={setSelectedArea}>
                  <SelectTrigger className="w-full bg-black/50 border-fire/30 text-white">
                    <SelectValue placeholder="Filter by Area" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-fire/30 text-white">
                    <SelectItem value="all">All Areas</SelectItem>
                    {kolkataAreas.map(area => (
                      <SelectItem key={area.name} value={area.name}>
                        {area.name} {area.activeFires > 0 && `(${area.activeFires} active)`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <Badge className="bg-red-600 text-white px-3 py-1 text-sm">
                  {activeIncidentsCount} Active Fires
                </Badge>
                <Button
                  variant="outline"
                  className="border-fire text-fire hover:bg-fire/20 hover:text-white"
                  onClick={simulateNewAlert}
                >
                  Test Alert
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading and Error States */}
        {isLoading && (
          <div className="my-6 text-center">
            <p className="text-white/80 mb-2">Connecting to live feed...</p>
            <Progress value={50} className="w-1/2 mx-auto bg-gray-700 [&>*]:bg-fire" />
          </div>
        )}
        {error && (
          <div className="my-6 p-4 bg-red-900/50 border border-red-500/50 rounded-lg text-center text-red-300">
            {error}
          </div>
        )}

        {/* Main Dashboard Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Fire Incidents List */}
          <div className="lg:col-span-1">
            <Card className="bg-black/80 border-fire/30 h-full overflow-hidden">
              <CardHeader className="bg-black/90 border-b border-fire/20">
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-fire" />
                  Fire Incidents
                </CardTitle>
                <CardDescription className="text-white/70">
                  {isLoading ? 'Loading...' :
                   error ? 'Error loading' :
                   `${filteredIncidents.length} incidents in selected area(s)}`}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 max-h-[60vh] overflow-y-auto">
                <div className="divide-y divide-fire/10">
                  {filteredIncidents.map((incident) => (
                    <div
                      key={incident.incidentId}
                      className={`p-4 hover:bg-fire/10 cursor-pointer transition-colors ${
                        selectedIncident?.incidentId === incident.incidentId ? "bg-fire/20" : ""
                      }`}
                      onClick={() => setSelectedIncident(incident)}
                    >
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-fire mr-2" />
                          <span className="text-white font-medium">
                            {incident.location.area}
                          </span>
                        </div>
                        <Badge className={getSeverityColor(incident.severity)}>
                          {incident.severity.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="text-white/90 text-sm mb-1 truncate">
                        {incident.location.address}
                      </div>

                      <div className="flex items-center justify-between text-sm text-white/70">
                        <div className="flex items-center">
                          {getSourceIcon(incident.source)}
                          <span>{incident.source}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{formatDate(incident.reportTime)}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {!isLoading && !error && filteredIncidents.length === 0 && (
                    <div className="p-6 text-center text-white/50">
                      No fire incidents in this area
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Map & Details */}
          <div className="lg:col-span-2">
            <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="w-full bg-black/50 border border-fire/30">
                <TabsTrigger value="map" className="flex-1 data-[state=active]:bg-fire/20 data-[state=active]:text-white text-white/70">
                  Fire Map
                </TabsTrigger>
                <TabsTrigger value="details" className="flex-1 data-[state=active]:bg-fire/20 data-[state=active]:text-white text-white/70">
                  Incident Details
                </TabsTrigger>
                <TabsTrigger value="stats" className="flex-1 data-[state=active]:bg-fire/20 data-[state=active]:text-white text-white/70">
                  Risk Analysis
                </TabsTrigger>
              </TabsList>

              {/* Map View */}
              <TabsContent value="map" className="mt-4">
                <Card className="bg-black/80 border-fire/30">
                  <CardContent className="p-0">
                    <div className="relative w-full h-[60vh] bg-gray-900">
                      <MapContainer
                        center={[22.5726, 88.3639]}
                        zoom={12}
                        style={{ height: '100%', width: '100%' }}
                        className="z-0"
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />

                        {filteredIncidents.map((incident) => (
                          <Marker
                            key={incident.incidentId}
                            position={[incident.location.lat, incident.location.lng]}
                            icon={fireIcon(incident.severity)}
                            eventHandlers={{
                              click: () => {
                                  setSelectedIncident(incident);
                                  setCurrentTab('details');
                              },
                            }}
                          >
                            <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                              <div className="text-sm font-medium">
                                {incident.location.area} - {incident.severity.toUpperCase()}
                              </div>
                            </Tooltip>

                            <Popup>
                              <div className="space-y-1">
                                <h3 className="font-bold">{incident.location.area}</h3>
                                <p className="text-sm">{incident.location.address}</p>
                                <div className="flex justify-between items-center">
                                  <span className="text-xs">Severity:</span>
                                  <Badge className={getSeverityColor(incident.severity) + ' text-xs'}>
                                    {incident.severity.toUpperCase()}
                                  </Badge>
                                </div>
                                <p className="text-xs">Reported: {formatDate(incident.reportTime)}</p>
                                <Button
                                  size="sm"
                                  className="mt-2 w-full text-xs"
                                  onClick={() => {
                                    setSelectedIncident(incident);
                                    setCurrentTab('details');
                                  }}
                                >
                                  View Details
                                </Button>
                              </div>
                            </Popup>
                          </Marker>
                        ))}
                      </MapContainer>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-4 bg-black/60 border border-fire/20 rounded-lg p-4">
                  <h3 className="text-white/90 font-medium mb-2">Map Legend</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-600 mr-2"></div>
                      <span className="text-white/80 text-sm">Critical Fire</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                      <span className="text-white/80 text-sm">High Risk</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-white/80 text-sm">Medium Risk</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-white/80 text-sm">Low Risk</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Incident Details View */}
              <TabsContent value="details" className="mt-4">
                {selectedIncident ? (
                  <Card className="bg-black/80 border-fire/30">
                    <CardHeader className="bg-black/90 border-b border-fire/20">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-white">
                          Fire Incident Details
                        </CardTitle>
                        <Badge className={getSeverityColor(selectedIncident.severity)}>
                          {selectedIncident.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <CardDescription className="text-white/70">
                        ID: {selectedIncident.incidentId}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-fire font-medium mb-2">Location Information</h3>
                          <p className="text-white/90 mb-1 text-lg font-medium">
                            {selectedIncident.location.area}
                          </p>
                          <p className="text-white/80 mb-4">
                            {selectedIncident.location.address}
                          </p>

                          <h3 className="text-fire font-medium mb-2">Incident Details</h3>
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            <div className="text-white/70">Status:</div>
                            <div className="text-white font-medium capitalize">
                              {selectedIncident.status.replace('-', ' ')}
                            </div>

                            <div className="text-white/70">Reported:</div>
                            <div className="text-white">
                              {formatDate(selectedIncident.reportTime)}
                            </div>

                            <div className="text-white/70">Source:</div>
                            <div className="text-white capitalize flex items-center">
                              {getSourceIcon(selectedIncident.source)}
                              {selectedIncident.source.replace('-', ' ')}
                            </div>

                            {selectedIncident.temperature && (
                              <>
                                <div className="text-white/70">Temperature:</div>
                                <div className="text-white">{selectedIncident.temperature}°C</div>
                              </>
                            )}

                            {selectedIncident.reportedBy && (
                              <>
                                <div className="text-white/70">Reported by:</div>
                                <div className="text-white">{selectedIncident.reportedBy}</div>
                              </>
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-fire font-medium mb-2">Emergency Response</h3>
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            <div className="text-white/70">Evacuation:</div>
                            <div className="text-white">{selectedIncident.evacuationStatus}</div>

                            <div className="text-white/70">Units Responding:</div>
                            <div className="text-white">
                              {selectedIncident.respondingUnits?.join(", ") || "None"}
                            </div>
                          </div>

                          <h3 className="text-fire font-medium mb-2">Details</h3>
                          <p className="text-white/80 mb-4">
                            {selectedIncident.details}
                          </p>

                          <div className="mt-6">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-fire font-medium">Community Verification</h3>
                              <Badge className="bg-green-600/70 text-white">
                                {selectedIncident.verifiedReports} Confirmations
                              </Badge>
                            </div>

                            <Button
                              className="w-full bg-fire/80 hover:bg-fire text-white"
                              onClick={() => verifyReport(selectedIncident.incidentId)}
                            >
                              <Users className="mr-2 h-4 w-4" />
                              Verify This Report
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-black/80 border-fire/30">
                    <CardContent className="p-12 text-center">
                      <p className="text-white/70">
                        Select a fire incident from the list to view details
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Risk Analysis View */}
              <TabsContent value="stats" className="mt-4">
                <Card className="bg-black/80 border-fire/30">
                  <CardHeader className="bg-black/90 border-b border-fire/20">
                    <CardTitle className="text-white">
                      Kolkata Fire Risk Analysis
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Historical and predictive fire risk patterns
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h3 className="text-fire font-medium mb-3">Area Risk Assessment</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {kolkataAreas.map((area) => (
                          <div
                            key={area.name}
                            className="bg-black/60 border border-fire/20 rounded-lg p-3 hover:border-fire/40 transition-all"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="text-white font-medium">{area.name}</h4>
                              <Badge
                                className={
                                  area.riskLevel === "high" ? "bg-red-500 text-white" :
                                  area.riskLevel === "medium" ? "bg-yellow-500 text-black" :
                                  "bg-green-500 text-white"
                                }
                              >
                                {area.riskLevel.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="text-white/80 text-sm">
                              {area.activeFires} active fire{area.activeFires !== 1 ? "s" : ""}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                       <h3 className="text-fire font-medium mb-3">Monthly Fire Incident Trends</h3>
                       <div className="bg-black/40 border border-fire/20 rounded-lg p-4 h-64">
                       <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                           data={fireTrendData}
                           margin={{ top: 10, right: 60, left: 0, bottom: 0 }}
                          >
                          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                          <XAxis dataKey="month" stroke="#fff" fontSize={12} />
                          <YAxis stroke="#fff" fontSize={12} />
                          <RechartsTooltip
                            contentStyle={{
                             backgroundColor: "#111",
                              borderColor: "#666",
                              color: "#fff",
                            }}
                          />
                         <Line
                          type="monotone"
                          dataKey="incidents"
                          stroke="#f87171"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                         />
                        </LineChart>
                       </ResponsiveContainer>
                       </div>
                 </div>


                    <div>
                      <h3 className="text-fire font-medium mb-3">Risk Factors</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black/40 border border-fire/20 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">High Risk Areas</h4>
                          <ul className="list-disc list-inside text-white/80 space-y-1">
                            <li>Congested markets with old electrical systems</li>
                            <li>Industrial zones with combustible materials</li>
                            <li>Densely populated slums with makeshift housing</li>
                            <li>Old buildings with outdated wiring</li>
                          </ul>
                        </div>

                        <div className="bg-black/40 border border-fire/20 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">Seasonal Factors</h4>
                          <ul className="list-disc list-inside text-white/80 space-y-1">
                            <li>Summer months (increased electrical fires)</li>
                            <li>Festival seasons (firecrackers & decorative lights)</li>
                            <li>Dry winter periods (increased flammability)</li>
                            <li>Post-monsoon electrical short circuits</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveFireDashboard;
