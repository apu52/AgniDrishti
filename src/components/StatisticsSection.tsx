
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
<section className="relative py-16 z-30 bg-black/80 backdrop-blur-sm">
  <div className="container">
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">
        Fire Safety Impact
      </h2>
      <p className="text-white/80 text-lg">
        Real-time statistics and metrics showing our impact on fire detection and prevention
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {animatedStats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-black/70 border border-fire/30 rounded-xl p-6 hover:border-fire/50 transition-all duration-300 hover:shadow-lg hover:shadow-fire/20"
        >
          <div className="flex items-center mb-4">
            <div className="bg-fire/20 w-12 h-12 rounded-full flex items-center justify-center mr-4 border border-fire/30">
              <stat.icon className="h-6 w-6 text-fire" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
              <p className="text-sm text-white/80">{stat.label}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/80">Progress</span>
              <span className={`flex items-center ${stat.trend === 'up' ? 'text-green-400' : 'text-fire'}`}>
                {stat.change}
              </span>
            </div>
            <Progress 
              value={stat.progress} 
              className="h-2 bg-black/50" 
              indicatorClassName={stat.trend === 'up' ? 'bg-green-400' : 'bg-fire'}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  );
};

export default StatisticsSection;
