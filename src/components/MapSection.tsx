
import { useState, useEffect } from "react";
import { MapPin, AlertTriangle, Flame, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for fire incidents
const fireIncidents = [
  { id: 1, location: "Sector 12, Block B", risk: "high", lat: 28.61, lng: 77.23 },
  { id: 2, location: "Industrial Area, Zone 3", risk: "medium", lat: 28.65, lng: 77.22 },
  { id: 3, location: "Residential Complex, East Wing", risk: "low", lat: 28.63, lng: 77.25 },
  { id: 4, location: "Commercial Hub, Central Square", risk: "high", lat: 28.60, lng: 77.21 },
  { id: 5, location: "Metro Station, North Exit", risk: "medium", lat: 28.62, lng: 77.24 }
];

const MapSection = () => {
  const [selectedIncident, setSelectedIncident] = useState(fireIncidents[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading of map data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gradient-fire-radial">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Fire Risk Zone Mapping
          </h2>
          <p className="text-muted-foreground text-lg">
            Real-time heatmap visualization of fire risks and active incidents
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <div className="aspect-video md:aspect-[16/9] overflow-hidden rounded-xl glow-border relative">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                  <div className="flex flex-col items-center">
                    <Flame className="h-12 w-12 text-fire animate-pulse" />
                    <p className="mt-4 text-lg">Loading fire risk map...</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Mock map image with heat overlay */}
                  <div className="relative w-full h-full">
                    <img 
                      src="2018-02-21-15-54-54-01ca35.png" 
                      alt="Fire Risk Map" 
                      className="w-full h-full object-cover brightness-[0.3] contrast-[1.2]"
                    />
                    
                    {/* Heat map overlay (simulated) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-fire/30 to-fire/10 opacity-80 mix-blend-screen"></div>
                    
                    {/* Fire incident markers */}
                    {fireIncidents.map((incident) => (
                      <div 
                        key={incident.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300
                        ${incident.risk === 'high' ? 'w-5 h-5 bg-red-500' : 
                          incident.risk === 'medium' ? 'w-4 h-4 bg-amber-500' : 'w-3 h-3 bg-yellow-400'}
                        rounded-full animate-pulse`}
                        style={{
                          left: `${30 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                        }}
                        onClick={() => setSelectedIncident(incident)}
                      >
                        <span className="sr-only">Fire incident at {incident.location}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Map controls */}
                  <div className="absolute right-4 top-4 flex flex-col gap-2">
                    <Button variant="secondary" size="icon" className="bg-black/70 hover:bg-black/90">
                      <Flame className="h-4 w-4 text-fire" />
                    </Button>
                    <Button variant="secondary" size="icon" className="bg-black/70 hover:bg-black/90">
                      <MapPin className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" size="icon" className="bg-black/70 hover:bg-black/90">
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Map legend */}
                  <div className="absolute left-4 bottom-4 bg-black/70 p-3 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Risk Level</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-xs">High Risk</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <span className="text-xs">Medium Risk</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <span className="text-xs">Low Risk</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div>
            <Tabs defaultValue="incidents">
              <TabsList className="grid grid-cols-2 bg-black/40">
                <TabsTrigger value="incidents">Active Incidents</TabsTrigger>
                <TabsTrigger value="stats">Area Statistics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="incidents" className="border border-fire/20 rounded-lg mt-4">
                <Card className="bg-black/40 border-0">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {fireIncidents.map((incident) => (
                        <div 
                          key={incident.id}
                          className={`p-3 rounded-lg cursor-pointer transition-all
                          ${selectedIncident.id === incident.id ? 'bg-fire/20 border border-fire/30' : 'hover:bg-fire/10'}`}
                          onClick={() => setSelectedIncident(incident)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`mt-1 p-1.5 rounded-full 
                              ${incident.risk === 'high' ? 'bg-red-500/20' : 
                                incident.risk === 'medium' ? 'bg-amber-500/20' : 'bg-yellow-400/20'}`}>
                              <AlertTriangle className={`h-4 w-4 
                                ${incident.risk === 'high' ? 'text-red-500' : 
                                  incident.risk === 'medium' ? 'text-amber-500' : 'text-yellow-400'}`} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{incident.location}</h4>
                                <Badge variant="outline" className={
                                  incident.risk === 'high' ? 'border-red-500 text-red-500' : 
                                  incident.risk === 'medium' ? 'border-amber-500 text-amber-500' : 'border-yellow-400 text-yellow-400'
                                }>
                                  {incident.risk}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Lat: {incident.lat.toFixed(4)}, Lng: {incident.lng.toFixed(4)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="stats" className="border border-fire/20 rounded-lg mt-4">
                <Card className="bg-black/40 border-0">
                  <CardContent className="p-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Risk Assessment</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>High Risk Areas</span>
                            <span>35%</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-red-500" style={{ width: '35%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Medium Risk Areas</span>
                            <span>45%</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500" style={{ width: '45%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Low Risk Areas</span>
                            <span>20%</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-400" style={{ width: '20%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Incident History</h4>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 bg-black/30 rounded-lg">
                          <p className="text-lg font-bold">28</p>
                          <p className="text-xs text-muted-foreground">Today</p>
                        </div>
                        <div className="p-2 bg-black/30 rounded-lg">
                          <p className="text-lg font-bold">183</p>
                          <p className="text-xs text-muted-foreground">This Week</p>
                        </div>
                        <div className="p-2 bg-black/30 rounded-lg">
                          <p className="text-lg font-bold">573</p>
                          <p className="text-xs text-muted-foreground">This Month</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6">
              <Button className="w-full fire-button">
                View Full Fire Risk Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
