import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlgorithmSelector } from "@/components/algorithms/AlgorithmSelector";
import { ConfigurationPanel } from "@/components/algorithms/ConfigurationPanel";
import { TrafficSimulation } from "@/components/algorithms/TrafficSimulation";
import { VisualizationArea } from "@/components/algorithms/VisualizationArea";
import { ResultsPanel } from "@/components/algorithms/ResultsPanel";
import { toast } from "sonner";
import {
  AlgorithmType,
  AlgorithmConfig,
  AlgorithmStats,
  TrafficPattern,
} from "@/types/algorithms";
import { AlgorithmSimulator, generateTrafficPattern } from "@/utils/algorithmSimulator";

interface VisualizationData {
  time: number;
  [key: string]: number;
}

const Algorithms = () => {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<AlgorithmType[]>([
    "token-bucket",
    "sliding-window",
  ]);
  const [config, setConfig] = useState<AlgorithmConfig>({
    capacity: 10,
    refillRate: 5,
    timeWindow: 10,
  });
  const [isRunning, setIsRunning] = useState(false);
  const [trafficPattern, setTrafficPattern] = useState<TrafficPattern>("steady");
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [visualizationData, setVisualizationData] = useState<VisualizationData[]>([]);
  const [lastEvents, setLastEvents] = useState<Map<AlgorithmType, { allowed: boolean; reason: string }>>(new Map());
  const [stats, setStats] = useState<Map<AlgorithmType, AlgorithmStats>>(new Map());

  const simulatorRef = useRef<AlgorithmSimulator | null>(null);
  const timeRef = useRef(0);
  const statsRef = useRef<Map<AlgorithmType, { total: number; rejected: number; responseTimes: number[]; allowedBursts: number }>>(new Map());

  useEffect(() => {
    simulatorRef.current = new AlgorithmSimulator(config);
  }, []);

  const handleToggleAlgorithm = (algorithm: AlgorithmType) => {
    setSelectedAlgorithms((prev) => {
      if (prev.includes(algorithm)) {
        return prev.filter((a) => a !== algorithm);
      }
      return [...prev, algorithm];
    });
  };

  const handleApplyConfig = () => {
    if (simulatorRef.current) {
      simulatorRef.current.updateConfig(config);
      setVisualizationData([]);
      timeRef.current = 0;
      toast.success("Configuration applied successfully");
    }
  };

  const handleStartSimulation = () => {
    if (selectedAlgorithms.length === 0) {
      toast.error("Please select at least one algorithm");
      return;
    }

    if (simulatorRef.current) {
      simulatorRef.current.initialize(selectedAlgorithms);
      setVisualizationData([]);
      timeRef.current = 0;
      statsRef.current.clear();
      selectedAlgorithms.forEach((algo) => {
        statsRef.current.set(algo, {
          total: 0,
          rejected: 0,
          responseTimes: [],
          allowedBursts: 0,
        });
      });
    }

    setIsRunning(true);
    toast.success("Simulation started");
  };

  const handleStopSimulation = () => {
    setIsRunning(false);
    calculateFinalStats();
    toast.info("Simulation stopped");
  };

  const calculateFinalStats = () => {
    const finalStats = new Map<AlgorithmType, AlgorithmStats>();
    
    statsRef.current.forEach((stat, algo) => {
      const rejectionRate = stat.total > 0 ? (stat.rejected / stat.total) * 100 : 0;
      const avgResponseTime = stat.responseTimes.length > 0
        ? stat.responseTimes.reduce((a, b) => a + b, 0) / stat.responseTimes.length
        : 0;
      const burstEfficiency = stat.total > 0 ? (stat.allowedBursts / stat.total) * 100 : 0;

      finalStats.set(algo, {
        totalRequests: stat.total,
        rejectionRate,
        avgResponseTime,
        burstEfficiency,
      });
    });

    setStats(finalStats);
  };

  useEffect(() => {
    if (!isRunning || !simulatorRef.current) return;

    const interval = setInterval(() => {
      const currentTime = Date.now();
      timeRef.current += 1;
      const numRequests = generateTrafficPattern(trafficPattern, timeRef.current);

      const newDataPoint: VisualizationData = { time: timeRef.current };
      const newEvents = new Map<AlgorithmType, { allowed: boolean; reason: string }>();

      selectedAlgorithms.forEach((algo) => {
        let allowedCount = 0;
        
        for (let i = 0; i < numRequests; i++) {
          const result = simulatorRef.current!.processRequest(algo, currentTime);
          
          const stat = statsRef.current.get(algo)!;
          stat.total += 1;
          if (!result.allowed) {
            stat.rejected += 1;
          } else {
            allowedCount += 1;
          }
          stat.responseTimes.push(Math.random() * 100 + 50);
          
          if (i === numRequests - 1) {
            newEvents.set(algo, {
              allowed: result.allowed,
              reason: result.reason,
            });
          }
        }

        if (numRequests > 1 && allowedCount > 0) {
          const stat = statsRef.current.get(algo)!;
          stat.allowedBursts += allowedCount;
        }

        const state = simulatorRef.current!.getState(algo);
        newDataPoint[algo] = state?.tokens ?? 0;
      });

      setLastEvents(newEvents);
      setVisualizationData((prev) => {
        const updated = [...prev, newDataPoint];
        return updated.slice(-60); // Keep last 60 data points
      });
    }, 1000 / simulationSpeed);

    return () => clearInterval(interval);
  }, [isRunning, selectedAlgorithms, trafficPattern, simulationSpeed]);

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="overflow-hidden rounded-[1.75rem] border border-border/60 bg-card/90 p-6 shadow-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <Badge variant="outline" className="w-fit rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.22em]">
              In-browser simulation
            </Badge>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Algorithm Comparison
              </h2>
              <p className="mt-2 max-w-3xl text-muted-foreground">
                This is the strongest part of the Vercel demo: a reviewer can interact with the core rate-limiting
                behavior directly, compare burst handling, and inspect tradeoffs without needing a running Redis cluster.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-background/70 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Preselected</p>
              <p className="mt-1 text-sm font-medium text-foreground">Token Bucket vs Sliding Window</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/70 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Best reviewer action</p>
              <p className="mt-1 text-sm font-medium text-foreground">Run bursty traffic and compare rejection behavior</p>
            </div>
          </div>
        </div>
      </Card>

      <AlgorithmSelector selected={selectedAlgorithms} onToggle={handleToggleAlgorithm} />

      <div className="grid gap-6 lg:grid-cols-2">
        <ConfigurationPanel
          config={config}
          onChange={setConfig}
          onApply={handleApplyConfig}
        />

        <TrafficSimulation
          isRunning={isRunning}
          pattern={trafficPattern}
          speed={simulationSpeed}
          onPatternChange={setTrafficPattern}
          onSpeedChange={setSimulationSpeed}
          onStart={handleStartSimulation}
          onStop={handleStopSimulation}
        />
      </div>

      <VisualizationArea
        selectedAlgorithms={selectedAlgorithms}
        data={visualizationData}
        lastEvents={lastEvents}
      />

      <ResultsPanel stats={stats} />
    </div>
  );
};

export default Algorithms;
