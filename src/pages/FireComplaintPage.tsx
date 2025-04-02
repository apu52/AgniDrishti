import { MapPin, AlertTriangle, Flame, PhoneCall, Upload, User, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function FireComplaintPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Emergency Header */}
      <div className="bg-fire/90 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-6 w-6" />
          <h1 className="text-xl font-bold">Fire Hazard Complaint</h1>
        </div>
        <Button variant="destructive" className="gap-2" asChild>
          <a href="tel:101">
            <PhoneCall className="h-4 w-4" />
            Call Emergency (101)
          </a>
        </Button>
      </div>

      <div className="container py-12 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Complaint Form */}
          <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Flame className="text-fire h-6 w-6" />
              Report Fire Hazard
            </h2>

            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    placeholder="Full Name"
                    className="pl-10 bg-gray-800 border-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Contact Information</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email or Phone Number"
                    className="pl-10 bg-gray-800 border-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Type of Hazard</Label>
                <RadioGroup defaultValue="electrical" className="grid grid-cols-2 gap-4">
                  <div>
                    <RadioGroupItem value="electrical" id="electrical" className="peer sr-only" />
                    <Label
                      htmlFor="electrical"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-gray-700 bg-gray-800 p-4 hover:bg-gray-700 peer-data-[state=checked]:border-fire [&:has([data-state=checked])]:border-fire"
                    >
                      <Flame className="mb-2 h-6 w-6 text-fire" />
                      Electrical Fire
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="chemical" id="chemical" className="peer sr-only" />
                    <Label
                      htmlFor="chemical"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-gray-700 bg-gray-800 p-4 hover:bg-gray-700 peer-data-[state=checked]:border-fire [&:has([data-state=checked])]:border-fire"
                    >
                      <Flame className="mb-2 h-6 w-6 text-fire" />
                      Chemical Fire
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="forest" id="forest" className="peer sr-only" />
                    <Label
                      htmlFor="forest"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-gray-700 bg-gray-800 p-4 hover:bg-gray-700 peer-data-[state=checked]:border-fire [&:has([data-state=checked])]:border-fire"
                    >
                      <Flame className="mb-2 h-6 w-6 text-fire" />
                      Forest Fire
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="other" id="other" className="peer sr-only" />
                    <Label
                      htmlFor="other"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-gray-700 bg-gray-800 p-4 hover:bg-gray-700 peer-data-[state=checked]:border-fire [&:has([data-state=checked])]:border-fire"
                    >
                      <Flame className="mb-2 h-6 w-6 text-fire" />
                      Other
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Exact Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    placeholder="Address or Landmark"
                    className="pl-10 bg-gray-800 border-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">Complaint Details</Label>
                <Textarea
                  id="details"
                  placeholder="Describe the fire hazard in detail..."
                  className="min-h-[120px] bg-gray-800 border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="evidence">Upload Evidence (Photos/Videos)</Label>
                <div className="flex items-center justify-center w-full">
                  <Label
                    htmlFor="evidence"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, MP4 (MAX. 10MB)</p>
                    </div>
                    <Input id="evidence" type="file" className="hidden" multiple />
                  </Label>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                  Cancel
                </Button>
                <Button type="submit" className="bg-fire hover:bg-fire/90 gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Submit Complaint
                </Button>
              </div>
            </form>
          </div>

          {/* Map and Information Section */}
          <div className="space-y-6">
            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="text-fire h-5 w-5" />
                Location Map
              </h3>
              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
                <p className="text-white-600">Interactive map will appear here</p>
                {/* Replace with your actual map component */}
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-fire"></div>
                  <span>Your current location</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>Nearby fire stations</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Reported fire hazards</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold mb-4">Emergency Contacts</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <PhoneCall className="h-5 w-5 text-fire" />
                    <div>
                      <p className="font-medium">Fire Emergency</p>
                      <p className="text-sm text-gray-400">24/7 Hotline</p>
                    </div>
                  </div>
                  <a
                    href="tel:101"
                    className="px-3 py-1 bg-fire/10 text-fire rounded-md text-sm hover:bg-fire/20"
                  >
                    101
                  </a>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <PhoneCall className="h-5 w-5 text-fire" />
                    <div>
                      <p className="font-medium">Disaster Management</p>
                      <p className="text-sm text-gray-400">National helpline</p>
                    </div>
                  </div>
                  <a
                    href="tel:108"
                    className="px-3 py-1 bg-fire/10 text-fire rounded-md text-sm hover:bg-fire/20"
                  >
                    108
                  </a>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <PhoneCall className="h-5 w-5 text-fire" />
                    <div>
                      <p className="font-medium">Local Fire Station</p>
                      <p className="text-sm text-gray-400">Nearest to you</p>
                    </div>
                  </div>
                  <a
                    href="tel:+911234567890"
                    className="px-3 py-1 bg-fire/10 text-fire rounded-md text-sm hover:bg-fire/20"
                  >
                    +91 1234567890
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold mb-4">Safety Tips</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <Flame className="flex-shrink-0 h-4 w-4 text-fire mt-0.5" />
                  <span>Do not attempt to extinguish large fires yourself</span>
                </li>
                <li className="flex gap-2">
                  <Flame className="flex-shrink-0 h-4 w-4 text-fire mt-0.5" />
                  <span>Evacuate immediately if you smell gas or see smoke</span>
                </li>
                <li className="flex gap-2">
                  <Flame className="flex-shrink-0 h-4 w-4 text-fire mt-0.5" />
                  <span>Use fire extinguishers only for small, contained fires</span>
                </li>
                <li className="flex gap-2">
                  <Flame className="flex-shrink-0 h-4 w-4 text-fire mt-0.5" />
                  <span>Know your building's evacuation routes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}