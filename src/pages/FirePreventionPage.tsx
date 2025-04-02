import ReactMarkdown from 'react-markdown';
import { Flame, AlertTriangle, Shield, Home, Factory, School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FirePreventionPage = () => {
  const preventionGuides = [
    {
      title: "Home Fire Safety",
      icon: <Home className="w-5 h-5 text-fire" />,
      content: `
## Home Fire Prevention Guide

### Essential Safety Measures
- Install **smoke alarms** on every level of your home
- Test alarms **monthly** and replace batteries annually
- Keep **fire extinguishers** in kitchen, garage, and workshop areas

### Kitchen Safety
- Never leave cooking unattended
- Keep flammable items away from stove
- Turn pot handles inward to prevent accidents

### Electrical Safety
- Avoid overloading outlets
- Replace frayed or damaged cords
- Use surge protectors for electronics
      `
    },
    {
      title: "Industrial Fire Protocols",
      icon: <Factory className="w-5 h-5 text-fire" />,
      content: `
## Industrial Fire Safety Protocols

### Hazard Control
- Implement **hot work permit systems**
- Store flammables in approved containers
- Maintain **minimum 3ft clearance** around electrical panels

### Emergency Preparedness
- Conduct **monthly fire drills**
- Mark all emergency exits clearly
- Establish evacuation assembly points

### Equipment Maintenance
- Inspect fire suppression systems quarterly
- Test emergency lighting regularly
- Service industrial heaters annually
      `
    },
    {
      title: "Public Space Guidelines",
      icon: <School className="w-5 h-5 text-fire" />,
      content: `
## Public Space Fire Safety

### Building Requirements
- Maintain **unobstructed fire exits**
- Install **automatic sprinkler systems**
- Display evacuation maps prominently

### Staff Training
- Train employees on **P.A.S.S. technique**:
  - Pull the pin
  - Aim at base of fire
  - Squeeze handle
  - Sweep side to side

### Event Safety
- Keep aisles and exits clear
- Limit occupancy to posted capacity
- Prohibit open flames without permit
      `
    }
  ];

  const generalProtocols = `
## General Fire Response Protocols

### R.A.C.E. Procedure
1. **R**escue anyone in immediate danger
2. **A**ctivate the fire alarm
3. **C**ontain the fire (close doors/windows)
4. **E**vacuate or extinguish (if trained)

### Fire Extinguisher Use
- Only fight small, contained fires
- Always have an exit at your back
- If in doubt, evacuate immediately

### Evacuation Tips
- Crawl low under smoke
- Feel doors for heat before opening
- Use stairs, never elevators
- Meet at designated assembly area
  `;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-fire/10 px-6 py-2 rounded-full mb-4">
            <Flame className="h-5 w-5 text-fire mr-2" />
            <span className="font-medium text-fire">Prevention Guides</span>
          </div>
          <h1 className="text-4xl font-bold text-white-900 mb-4">Fire Safety Protocols</h1>
          <p className="text-xl text-white-600 max-w-3xl mx-auto">
            Comprehensive guidelines to prevent, prepare for, and respond to fire emergencies
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {preventionGuides.map((guide, index) => (
            <div 
              key={index}
              className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-white/50 hover:border-fire/50 transition-all hover:shadow-lg hover:shadow-fire/20"
            >
              <div className="bg-black/5 p-6 border-b border-gray-200 flex items-center">
                {guide.icon}
                <h2 className="ml-3 text-xl font-semibold text-white-800">{guide.title}</h2>
              </div>
              <div className="p-6 prose prose-sm max-w-none">
                <ReactMarkdown>{guide.content}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>

        {/* General Protocols */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-white/30 mb-16 hover:border-fire/50 transition-all hover:shadow-lg hover:shadow-fire/20 ">
          <div className="bg-black/5 p-6 border-b border-gray-200 flex items-center">
            <Shield className="w-5 h-5 text-fire mr-3" />
            <h2 className="text-xl font-semibold text-white-800">Emergency Response Protocols</h2>
          </div>
          <div className="p-6 md:p-8 prose prose-sm max-w-none">
            <ReactMarkdown>{generalProtocols}</ReactMarkdown>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-fire/5 border border-white/50 hover:border-fire/50 transition-all hover:shadow-lg hover:shadow-fire/20 rounded-xl p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-fire mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white-900 mb-2">Need Immediate Assistance?</h3>
          <p className="text-white-600 mb-6 max-w-2xl mx-auto">
            For emergency situations or professional fire safety consultations
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-fire hover:bg-fire/90">
              <Link to="/emergency">
                Emergency Contact
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/resources">
                Download Full Guides (PDF)
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirePreventionPage;