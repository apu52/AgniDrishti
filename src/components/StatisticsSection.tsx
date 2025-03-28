
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Flame, AlertTriangle, Users, Clock } from "lucide-react";

const stats = [
  {
    icon: Flame,
    value: 573,
    label: "Fires Detected",
    progress: 85,
    change: "+12%",
    trend: "up"
  },
  {
    icon: AlertTriangle,
    value: 102,
    label: "High Risk Zones",
    progress: 65,
    change: "-8%",
    trend: "down"
  },
  {
    icon: Users,
    value: 3482,
    label: "Users Protected",
    progress: 92,
    change: "+23%",
    trend: "up"
  },
  {
    icon: Clock,
    value: "5.2",
    label: "Avg. Response Time (min)",
    progress: 78,
    change: "-15%",
    trend: "down"
  }
];

const StatisticsSection = () => {
  const [animatedStats, setAnimatedStats] = useState(stats.map(stat => ({ 
    ...stat, 
    value: typeof stat.value === 'number' ? 0 : "0",
    progress: 0 
  })));

  useEffect(() => {
    // Animate the numbers counting up
    const interval = setInterval(() => {
      setAnimatedStats(prev => 
        prev.map((stat, i) => {
          const targetValue = stats[i].value;
          const targetProgress = stats[i].progress;
          
          if (typeof targetValue === 'number') {
            const currentValue = typeof stat.value === 'number' ? stat.value : 0;
            const step = Math.ceil(targetValue / 30);
            const newValue = Math.min(currentValue + step, targetValue);
            
            return {
              ...stat,
              value: newValue,
              progress: Math.min(stat.progress + 2, targetProgress)
            };
          } else {
            // Handle string values like "5.2"
            const currentValue = parseFloat(stat.value.toString() || "0");
            const targetVal = parseFloat(targetValue.toString());
            const step = targetVal / 30;
            const newValue = Math.min(currentValue + step, targetVal).toFixed(1);
            
            return {
              ...stat,
              value: newValue,
              progress: Math.min(stat.progress + 2, targetProgress)
            };
          }
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-black/60">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Fire Safety Impact
          </h2>
          <p className="text-muted-foreground text-lg">
            Real-time statistics and metrics showing our impact on fire detection and prevention
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {animatedStats.map((stat, index) => (
            <div key={index} className="bg-black/40 border border-fire/20 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-fire/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <stat.icon className="h-6 w-6 text-fire" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className={`flex items-center ${stat.trend === 'up' ? 'text-green-500' : 'text-fire'}`}>
                    {stat.change}
                  </span>
                </div>
                <Progress value={stat.progress} className="h-2 bg-muted" indicatorClassName="bg-fire" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
