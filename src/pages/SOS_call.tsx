import { useState, useEffect } from "react";
import axios from "axios";
import {
  PhoneCall,
  Plus,
  Shield,
  Bell,
  MapPin,
  Smartphone,
  Users,
  Trash2,
  AlertCircle,
  MessageSquare,
  Settings,
  AlertTriangle,
  Info,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { error } from "console";

// Types
export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
  isPrimary: boolean;
  sendLocation: boolean;
  sendAlerts: boolean;
}

interface EmergencyService {
  id: string;
  name: string;
  num: string;
  number: string;
  type: "fire" | "police" | "ambulance" | "disaster";
  icon: React.ReactNode;
}

interface AlertSetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

// Sample data
const defaultEmergencyServices: EmergencyService[] = [
  {
    id: "fire-1",
    name: "Kolkata Fire Services",
    number: "101",
    num: "+916290517107",
    type: "fire",
    icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
  },
  {
    id: "police-1",
    name: "Kolkata Police",
    number: "100",
    num: "+919038005306",
    type: "police",
    icon: <Shield className="h-5 w-5 text-blue-500" />,
  },
  {
    id: "ambulance-1",
    name: "Emergency Ambulance",
    num: "+918777240684",
    number: "108",
    type: "ambulance",
    icon: <PhoneCall className="h-5 w-5 text-green-500" />,
  },
  {
    id: "disaster-1",
    name: "Disaster Management",
    number: "1070",
    num: "+919432456350",
    type: "disaster",
    icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
  },
];

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

const sampleContact: EmergencyContact[] = [
  {
    id: "contact-1",
    name: "Himadri Dey",
    phone: "+919038005306",
    relation: "Family",
    isPrimary: true,
    sendLocation: true,
    sendAlerts: true,
  },
];

const alertSettings: AlertSetting[] = [
  {
    id: "alert-1",
    name: "SMS Alerts",
    description: "Send SMS alerts to your emergency contacts",
    enabled: true,
  },
  {
    id: "alert-2",
    name: "Offline Mode",
    description: "Enable alerts even when device is offline",
    enabled: true,
  },
  {
    id: "alert-3",
    name: "Auto Location Share",
    description: "Automatically share your location during emergency",
    enabled: true,
  },
  {
    id: "alert-4",
    name: "Sensor Trigger",
    description: "Auto-call emergency services when fire sensors detect a fire",
    enabled: true,
  },
  {
    id: "alert-5",
    name: "Periodic Location Updates",
    description: "Send periodic location updates during emergencies",
    enabled: false,
  },
];

// Main Component
const SOSPanicButton = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>(sampleContacts);
  const [emergencyServices, setEmergencyServices] = useState<
    EmergencyService[]
  >(defaultEmergencyServices);
  const [settings, setSettings] = useState<AlertSetting[]>(alertSettings);
  const [newContact, setNewContact] = useState<Partial<EmergencyContact>>({
    name: "",
    phone: "",
    relation: "Family",
    isPrimary: false,
    sendLocation: true,
    sendAlerts: true,
  });
  const [isAddContactDialogOpen, setIsAddContactDialogOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [sosActivated, setSosActivated] = useState(false);
  const [currentTab, setCurrentTab] = useState("contacts");

  // Simulate getting current location
  useEffect(() => {
    // In a real app, this would use the browser's geolocation API
    setCurrentLocation({ lat: 22.5726, lng: 88.3639 });
  }, []);

  // Handle activating SOS
  const handleSOSActivation = () => {
    setSosActivated(true);

    setTimeout(() => {
      alert(
        "SOS activated! Emergency services have been notified and your location has been shared with your emergency contacts."
      );
      setSosActivated(false);
    }, 2000);
  };
  const messagetoemergencycontacts = async (contacts: EmergencyContact[]) => {
  try {
    setSosActivated(true);
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
      alert(
        "SOS activated! Emergency services have been notified and your location has been shared with your emergency contacts."
      );
      setSosActivated(false);
    }
  } catch (error) {
    console.log(error);
    alert("Failed to send SMS");
    setSosActivated(false);
  } finally {
    setSosActivated(false);
  }
};

  // Handle adding a new contact
  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      alert("Please enter name and phone number");
      return;
    }

    const contact: EmergencyContact = {
      id: `contact-${Date.now()}`,
      name: newContact.name,
      phone: newContact.phone,
      relation: newContact.relation || "Other",
      isPrimary: newContact.isPrimary || false,
      sendLocation:
        newContact.sendLocation !== undefined ? newContact.sendLocation : true,
      sendAlerts:
        newContact.sendAlerts !== undefined ? newContact.sendAlerts : true,
    };

    setContacts([...contacts, contact]);
    setNewContact({
      name: "",
      phone: "",
      relation: "Family",
      isPrimary: false,
      sendLocation: true,
      sendAlerts: true,
    });
    setIsAddContactDialogOpen(false);
  };

  // Handle deleting a contact
  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  // Handle setting a contact as primary
  const handleSetPrimary = (id: string) => {
    setContacts(
      contacts.map((contact) => ({
        ...contact,
        isPrimary: contact.id === id,
      }))
    );
  };

  // Handle toggling settings
  const handleToggleSetting = (id: string) => {
    setSettings(
      settings.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  // Handle contact setting toggle
  const handleContactSettingToggle = (
    id: string,
    setting: "sendLocation" | "sendAlerts"
  ) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id
          ? { ...contact, [setting]: !contact[setting] }
          : contact
      )
    );
  };

  // Mock call emergency service
  const callEmergencyService = async (service: EmergencyService) => {
    try {
      const call = await axios.post(
        "https://agnidrishtibackend.onrender.com/api/v1/initiate-call-vonage",
        {
          targetNumber: service.num,
          message: `Hi ${service.name}. Sebanti Dasgupta this side. I am in a fire emergency right now. Please help me. My Address is 1/1b Raipur East Road Kolkata: 700032 near Jadavpur University`,
        }
      );
      console.log(call);
      alert(`Calling ${service.name} at ${service.number}...`);
    } catch (error) {
      console.log("Error calling emergency service:", error);
    }
  };

  // Handle simulating a fire alert
  const simulateFireAlert = () => {
    alert(
      "FIRE ALERT: Fire detected in your premises! Notifying emergency contacts and services."
    );
    // In a real app, this would trigger the full SOS workflow
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 py-16 z-30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-md flex items-center justify-center">
            <PhoneCall className="mr-3 h-8 w-8 text-fire" />
            SOS Emergency Response
          </h1>
          <p className="text-white/80 text-lg">
            One-touch emergency calls with auto-location sharing during fire
            outbreaks and other emergencies
          </p>
        </div>

        {/* SOS Button Section */}
        <div className="max-w-4xl mx-auto mb-10">
          <Card className="bg-black/70 border-fire/30 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3">
                {/* SOS Button */}
                <div className="md:col-span-1 bg-gradient-to-br from-fire/70 to-fire/50 p-8 flex flex-col items-center justify-center">
                  <Button
                    className={`w-40 h-40 rounded-full border-4 ${
                      sosActivated
                        ? "bg-red-600 border-white animate-pulse"
                        : "bg-fire border-white/70 hover:bg-red-600"
                    } shadow-lg flex flex-col items-center justify-center transition-all duration-300`}
                    onClick={() => messagetoemergencycontacts(sampleContacts)}
                    disabled={sosActivated}
                  >
                    <PhoneCall className="h-12 w-12 mb-2" />
                    <span className="text-xl font-bold">SOS</span>
                    {sosActivated && (
                      <span className="text-sm mt-1">Calling...</span>
                    )}
                  </Button>
                  <p className="text-white/90 mt-6 text-center">
                    Press for immediate emergency assistance
                  </p>
                </div>

                {/* Quick Call Services */}
                <div className="md:col-span-2 p-6">
                  <h2 className="text-xl font-bold text-white mb-4">
                    Quick Emergency Services
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {emergencyServices.map((service) => (
                      <Button
                        key={service.id}
                        className="bg-black/50 border border-fire/20 hover:bg-fire/20 flex flex-col items-center justify-center p-4 h-auto"
                        onClick={() => callEmergencyService(service)}
                      >
                        <div className="mb-2">{service.icon}</div>
                        <span className="text-white font-medium text-sm">
                          {service.name}
                        </span>
                        <span className="text-white/70 text-xs mt-1">
                          {service.number}
                        </span>
                      </Button>
                    ))}
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-medium">
                        Your Current Location
                      </h3>
                      <Badge className="bg-green-600/80">
                        <MapPin className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                    <div className="bg-black/40 border border-fire/20 rounded-lg p-3 text-white/80 text-sm flex items-center justify-between">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-fire" />
                        {currentLocation ? (
                          <span>
                            Lat: {currentLocation.lat.toFixed(4)}, Lng:{" "}
                            {currentLocation.lng.toFixed(4)}
                          </span>
                        ) : (
                          <span>Acquiring location...</span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-fire hover:text-white hover:bg-fire/20"
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <div className="max-w-4xl mx-auto">
          <Tabs
            defaultValue="contacts"
            value={currentTab}
            onValueChange={setCurrentTab}
          >
            <TabsList className="grid grid-cols-3 max-w-md mx-auto bg-black/50 border border-fire/30">
              <TabsTrigger
                value="contacts"
                className="data-[state=active]:bg-fire/20 data-[state=active]:text-white text-white/70"
              >
                <Users className="h-4 w-4 mr-2" />
                Emergency Contacts
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-fire/20 data-[state=active]:text-white text-white/70"
              >
                <Settings className="h-4 w-4 mr-2" />
                Alert Settings
              </TabsTrigger>
              <TabsTrigger
                value="test"
                className="data-[state=active]:bg-fire/20 data-[state=active]:text-white text-white/70"
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Test System
              </TabsTrigger>
            </TabsList>

            {/* Emergency Contacts Tab */}
            <TabsContent value="contacts" className="mt-6">
              <Card className="bg-black/80 border-fire/30">
                <CardHeader className="bg-black/90 border-b border-fire/20 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-white">
                      Emergency Contacts
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      People to notify during fire emergencies
                    </CardDescription>
                  </div>
                  <Dialog
                    open={isAddContactDialogOpen}
                    onOpenChange={setIsAddContactDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="bg-fire hover:bg-fire/80 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Contact
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-black/90 border-fire/30 text-white">
                      <DialogHeader>
                        <DialogTitle className="text-white">
                          Add Emergency Contact
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            placeholder="Contact name"
                            className="bg-black/70 border-fire/30 text-white"
                            value={newContact.name}
                            onChange={(e) =>
                              setNewContact({
                                ...newContact,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            placeholder="+91 98765 43210"
                            className="bg-black/70 border-fire/30 text-white"
                            value={newContact.phone}
                            onChange={(e) =>
                              setNewContact({
                                ...newContact,
                                phone: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="relation">Relation</Label>
                          <Select
                            value={newContact.relation}
                            onValueChange={(value) =>
                              setNewContact({ ...newContact, relation: value })
                            }
                          >
                            <SelectTrigger className="bg-black/70 border-fire/30 text-white">
                              <SelectValue placeholder="Select relation" />
                            </SelectTrigger>
                            <SelectContent className="bg-black/90 border-fire/30 text-white">
                              <SelectItem value="Family">Family</SelectItem>
                              <SelectItem value="Friend">Friend</SelectItem>
                              <SelectItem value="Neighbor">Neighbor</SelectItem>
                              <SelectItem value="Colleague">
                                Colleague
                              </SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="primary"
                            checked={newContact.isPrimary}
                            onCheckedChange={(checked) =>
                              setNewContact({
                                ...newContact,
                                isPrimary: checked,
                              })
                            }
                          />
                          <Label htmlFor="primary">
                            Set as primary contact
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="location"
                            checked={
                              newContact.sendLocation !== undefined
                                ? newContact.sendLocation
                                : true
                            }
                            onCheckedChange={(checked) =>
                              setNewContact({
                                ...newContact,
                                sendLocation: checked,
                              })
                            }
                          />
                          <Label htmlFor="location">
                            Share location during emergency
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="alerts"
                            checked={
                              newContact.sendAlerts !== undefined
                                ? newContact.sendAlerts
                                : true
                            }
                            onCheckedChange={(checked) =>
                              setNewContact({
                                ...newContact,
                                sendAlerts: checked,
                              })
                            }
                          />
                          <Label htmlFor="alerts">Send emergency alerts</Label>
                        </div>
                      </div>
                      <DialogFooter className="mt-6">
                        <Button
                          variant="outline"
                          onClick={() => setIsAddContactDialogOpen(false)}
                          className="border-fire/40 text-white hover:bg-fire/20"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleAddContact}
                          className="bg-fire hover:bg-fire/80 text-white"
                        >
                          Add Contact
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-fire/10">
                    {contacts.length === 0 ? (
                      <div className="p-6 text-center text-white/60">
                        No emergency contacts added yet
                      </div>
                    ) : (
                      contacts.map((contact) => (
                        <div key={contact.id} className="p-4 hover:bg-fire/5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-fire/20 border border-fire/30 flex items-center justify-center mr-3">
                                <Users className="h-5 w-5 text-fire" />
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <h3 className="text-white font-medium">
                                    {contact.name}
                                  </h3>
                                  {contact.isPrimary && (
                                    <Badge className="ml-2 bg-fire/80">
                                      Primary
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-white/70 text-sm">
                                  {contact.phone}
                                </p>
                                <p className="text-white/50 text-xs">
                                  {contact.relation}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              {!contact.isPrimary && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-white/70 hover:text-white hover:bg-fire/20 mr-1"
                                  onClick={() => handleSetPrimary(contact.id)}
                                >
                                  Set Primary
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-400 hover:text-red-500 hover:bg-red-500/10"
                                onClick={() => handleDeleteContact(contact.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <Switch
                                id={`location-${contact.id}`}
                                checked={contact.sendLocation}
                                onCheckedChange={() =>
                                  handleContactSettingToggle(
                                    contact.id,
                                    "sendLocation"
                                  )
                                }
                              />
                              <Label
                                htmlFor={`location-${contact.id}`}
                                className="text-white/70 text-sm"
                              >
                                <MapPin className="h-3 w-3 inline mr-1" />
                                Share location
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch
                                id={`alerts-${contact.id}`}
                                checked={contact.sendAlerts}
                                onCheckedChange={() =>
                                  handleContactSettingToggle(
                                    contact.id,
                                    "sendAlerts"
                                  )
                                }
                              />
                              <Label
                                htmlFor={`alerts-${contact.id}`}
                                className="text-white/70 text-sm"
                              >
                                <Bell className="h-3 w-3 inline mr-1" />
                                Send alerts
                              </Label>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
                <CardFooter className="bg-black/40 border-t border-fire/20 py-3 px-4">
                  <div className="text-white/60 text-sm">
                    <Info className="h-4 w-4 inline mr-1" />
                    These contacts will be automatically notified during fire
                    emergencies
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Alert Settings Tab */}
            <TabsContent value="settings" className="mt-6">
              <Card className="bg-black/80 border-fire/30">
                <CardHeader className="bg-black/90 border-b border-fire/20">
                  <CardTitle className="text-white">Alert Settings</CardTitle>
                  <CardDescription className="text-white/70">
                    Configure how emergency alerts are triggered and sent
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-white font-medium mb-3">
                        Emergency Notification Settings
                      </h3>
                      <div className="space-y-4">
                        {settings.map((setting) => (
                          <div
                            key={setting.id}
                            className="flex items-center justify-between bg-black/40 border border-fire/20 rounded-lg p-3"
                          >
                            <div>
                              <h4 className="text-white font-medium">
                                {setting.name}
                              </h4>
                              <p className="text-white/70 text-sm">
                                {setting.description}
                              </p>
                            </div>
                            <Switch
                              checked={setting.enabled}
                              onCheckedChange={() =>
                                handleToggleSetting(setting.id)
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-white font-medium mb-3">
                        Emergency Message Template
                      </h3>
                      <div className="bg-black/40 border border-fire/20 rounded-lg p-3">
                        <Label
                          htmlFor="message-template"
                          className="text-white/70 text-sm mb-2 block"
                        >
                          Customize the emergency message sent to your contacts
                        </Label>
                        <textarea
                          id="message-template"
                          className="w-full bg-black/70 border border-fire/30 rounded-md text-white/90 p-3 min-h-[100px]"
                          defaultValue="EMERGENCY ALERT: Fire detected at my location. Please help or call emergency services. My current location: [LOCATION_LINK]"
                        />
                        <div className="mt-2 text-white/50 text-xs">
                          Use [LOCATION_LINK] to automatically include your
                          location
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-white font-medium mb-3">
                        Fire Sensor Integration
                      </h3>
                      <div className="bg-black/40 border border-fire/20 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="text-white font-medium">
                              Connect Fire Sensors
                            </h4>
                            <p className="text-white/70 text-sm">
                              Link your Agnidrishti fire sensors to trigger
                              automatic alerts
                            </p>
                          </div>
                          <Badge className="bg-green-600/80">Connected</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                          <div className="bg-black/60 border border-fire/20 rounded-lg p-2 flex items-center">
                            <div className="w-8 h-8 rounded-full bg-fire/20 flex items-center justify-center mr-2">
                              <AlertTriangle className="h-4 w-4 text-fire" />
                            </div>
                            <div>
                              <h5 className="text-white text-sm">
                                Living Room Sensor
                              </h5>
                              <p className="text-white/50 text-xs">
                                Status: Active
                              </p>
                            </div>
                          </div>
                          <div className="bg-black/60 border border-fire/20 rounded-lg p-2 flex items-center">
                            <div className="w-8 h-8 rounded-full bg-fire/20 flex items-center justify-center mr-2">
                              <AlertTriangle className="h-4 w-4 text-fire" />
                            </div>
                            <div>
                              <h5 className="text-white text-sm">
                                Kitchen Sensor
                              </h5>
                              <p className="text-white/50 text-xs">
                                Status: Active
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-black/40 border-t border-fire/20 flex justify-end py-3 px-4">
                  <Button className="bg-fire hover:bg-fire/80 text-white">
                    Save Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Test System Tab */}
            <TabsContent value="test" className="mt-6">
              <Card className="bg-black/80 border-fire/30">
                <CardHeader className="bg-black/90 border-b border-fire/20">
                  <CardTitle className="text-white">
                    Test Emergency System
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Verify your emergency response system is working correctly
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="bg-black/40 border border-fire/20 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-2">
                        Test Features
                      </h3>
                      <p className="text-white/70 mb-4">
                        Use these options to test different components of your
                        emergency system without triggering actual emergency
                        services.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button
                          className="bg-fire/20 border border-fire/30 text-white hover:bg-fire/40"
                          onClick={() =>
                            alert(
                              "Test message sent to your emergency contacts"
                            )
                          }
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Test Alert Messages
                        </Button>
                        <Button
                          className="bg-fire/20 border border-fire/30 text-white hover:bg-fire/40"
                          onClick={() =>
                            alert("Location sharing test initiated")
                          }
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          Test Location Sharing
                        </Button>
                        <Button
                          className="bg-fire/20 border border-fire/30 text-white hover:bg-fire/40"
                          onClick={() =>
                            alert("Sensor connection verified successfully")
                          }
                        >
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Test Sensor Connection
                        </Button>
                        <Button
                          className="bg-fire/20 border border-fire/30 text-white hover:bg-fire/40"
                          onClick={() =>
                            alert(
                              "Offline mode test complete - system will function without internet"
                            )
                          }
                        >
                          <Smartphone className="h-4 w-4 mr-2" />
                          Test Offline Mode
                        </Button>
                      </div>
                    </div>

                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-2 flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                        Simulate Fire Emergency
                      </h3>
                      <p className="text-white/70 mb-4">
                        This will simulate a complete fire emergency workflow
                        without contacting real emergency services.
                      </p>
                      <div className="flex flex-col space-y-3">
                        <div className="bg-black/60 border border-red-500/30 rounded-lg p-3">
                          <p className="text-white/80 text-sm mb-2">
                            <Info className="h-4 w-4 inline mr-1 text-red-400" />
                            This is only a test and will not contact actual
                            emergency services. It will send test notifications
                            to your selected contacts.
                          </p>
                        </div>
                        <Button
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={simulateFireAlert}
                        >
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Simulate Fire Alert
                        </Button>
                      </div>
                    </div>

                    <div className="bg-black/40 border border-fire/20 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-2">
                        System Diagnostics
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between p-2 bg-black/30 rounded-md">
                          <span className="text-white/80">
                            Sensor Connection
                          </span>
                          <Badge className="bg-green-600/80">Working</Badge>
                        </div>
                        <div className="flex justify-between p-2 bg-black/30 rounded-md">
                          <span className="text-white/80">
                            Location Services
                          </span>
                          <Badge className="bg-green-600/80">Active</Badge>
                        </div>
                        <div className="flex justify-between p-2 bg-black/30 rounded-md">
                          <span className="text-white/80">
                            Emergency Contacts
                          </span>
                          <Badge className="bg-green-600/80">
                            {contacts.length} Configured
                          </Badge>
                        </div>
                        <div className="flex justify-between p-2 bg-black/30 rounded-md">
                          <span className="text-white/80">SMS Service</span>
                          <Badge className="bg-green-600/80">Connected</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-black/40 border-t border-fire/20 flex justify-between py-3 px-4">
                  <p className="text-white/60 text-sm">
                    <AlertCircle className="h-4 w-4 inline mr-1" />
                    Last system check: Today at 10:32 AM
                  </p>
                  <Button className="bg-fire hover:bg-fire/80 text-white">
                    Run Full Diagnostic
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <p className="text-white/50 text-sm">
            SOS Emergency Response System &copy; 2025 | Developed for
            Agnidrishti Fire Safety Solutions
          </p>
          <div className="flex items-center justify-center mt-4 space-x-4">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-fire/20"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Help
            </Button>
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-fire/20"
            >
              <Info className="h-4 w-4 mr-2" />
              About
            </Button>
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-fire/20"
            >
              <Settings className="h-4 w-4 mr-2" />
              Privacy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOSPanicButton;
