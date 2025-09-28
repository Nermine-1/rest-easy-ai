import { useState } from "react";
import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import PlayerCard from "@/components/PlayerCard";
import RiskChart from "@/components/RiskChart";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InjuryPredictor } from "@/utils/injuryPredictor";
import { Player } from "@/types/player";
import { 
  Activity, 
  Users, 
  AlertTriangle, 
  TrendingDown,
  Brain,
  Target,
  Shield,
  Zap
} from "lucide-react";
import heroImage from "@/assets/sports-hero.jpg";

// Mock data for demonstration
const mockPlayers: Player[] = [
  {
    id: "001",
    name: "Alex Rodriguez",
    age: 28,
    position: "Forward",
    height: 185,
    weight: 78,
    previousInjuries: [
      { type: "hamstring", date: new Date("2023-03-15"), severity: "minor", recoveryTime: 14 }
    ],
    performance: {
      hoursPlayed: 1240,
      gamesPlayed: 45,
      intensityLevel: 8.5,
      fatigueScore: 6.2
    },
    medicalHistory: {
      chronicConditions: [],
      surgeries: [],
      medications: []
    }
  },
  {
    id: "002", 
    name: "Maria Santos",
    age: 24,
    position: "Midfielder",
    height: 170,
    weight: 65,
    previousInjuries: [
      { type: "ankle", date: new Date("2023-01-20"), severity: "moderate", recoveryTime: 28 },
      { type: "knee", date: new Date("2022-08-10"), severity: "severe", recoveryTime: 90 }
    ],
    performance: {
      hoursPlayed: 1580,
      gamesPlayed: 52,
      intensityLevel: 9.1,
      fatigueScore: 7.8
    },
    medicalHistory: {
      chronicConditions: ["previous_knee_injury"],
      surgeries: ["knee_reconstruction"],
      medications: []
    }
  },
  {
    id: "003",
    name: "James Wilson", 
    age: 31,
    position: "Defender",
    height: 190,
    weight: 85,
    previousInjuries: [],
    performance: {
      hoursPlayed: 980,
      gamesPlayed: 38,
      intensityLevel: 7.2,
      fatigueScore: 4.5
    },
    medicalHistory: {
      chronicConditions: [],
      surgeries: [],
      medications: []
    }
  }
];

const Index = () => {
  const [selectedView, setSelectedView] = useState<"dashboard" | "players" | "analytics">("dashboard");
  const predictor = new InjuryPredictor();
  
  // Calculate risks for all players
  const playerRisks = mockPlayers.map(player => ({
    player,
    risk: predictor.analyzeRisk(player)
  }));

  const riskDistribution = [
    { name: "Low Risk", risk: playerRisks.filter(p => p.risk.riskLevel === "low").length, color: "low" },
    { name: "Medium Risk", risk: playerRisks.filter(p => p.risk.riskLevel === "medium").length, color: "medium" },
    { name: "High Risk", risk: playerRisks.filter(p => p.risk.riskLevel === "high").length, color: "high" }
  ];

  const chartData = playerRisks.map(({ player, risk }) => ({
    name: player.name.split(' ')[0],
    risk: Math.round(risk.overallRisk * 100),
    color: risk.riskLevel
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
        <img 
          src={heroImage} 
          alt="Sports Analytics Dashboard" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-20 container mx-auto px-6 py-16">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center space-x-2 text-primary">
              <Brain className="h-6 w-6" />
              <Badge variant="outline" className="text-primary border-primary/30">
                AI-Powered Analytics
              </Badge>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Predict. Prevent. Perform.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Revolutionary AI-driven sports injury prediction platform that keeps your athletes safe and performing at their peak.
            </p>
            <div className="flex space-x-4">
              <Button variant="premium" size="lg" className="relative overflow-hidden group">
                <Zap className="h-5 w-5 mr-2" />
                <span className="relative z-10">Start Analysis</span>
              </Button>
              <Button variant="outline" size="lg">
                <Target className="h-5 w-5 mr-2" />
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex space-x-2 mb-8">
          {[
            { key: "dashboard", label: "Dashboard", icon: Activity },
            { key: "players", label: "Players", icon: Users },
            { key: "analytics", label: "Analytics", icon: TrendingDown }
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={selectedView === key ? "default" : "ghost"}
              onClick={() => setSelectedView(key as typeof selectedView)}
              className="flex items-center space-x-2"
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Button>
          ))}
        </div>

        {selectedView === "dashboard" && (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Players"
                value={mockPlayers.length}
                icon={<Users className="h-5 w-5" />}
                trend={{ value: 12, label: "this month" }}
              />
              <StatsCard
                title="High Risk Players"
                value={playerRisks.filter(p => p.risk.riskLevel === "high").length}
                icon={<AlertTriangle className="h-5 w-5" />}
                variant="danger"
                trend={{ value: -8, label: "vs last week" }}
              />
              <StatsCard
                title="Avg Risk Score"
                value={`${Math.round(playerRisks.reduce((acc, p) => acc + p.risk.overallRisk, 0) / playerRisks.length * 100)}%`}
                icon={<Activity className="h-5 w-5" />}
                variant="warning"
              />
              <StatsCard
                title="Injury Prevention"
                value="94%"
                icon={<Shield className="h-5 w-5" />}
                variant="success"
                trend={{ value: 15, label: "effectiveness" }}
              />
            </div>

            {/* Charts and Upload */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RiskChart data={riskDistribution} type="pie" />
              <FileUploader />
            </div>
          </div>
        )}

        {selectedView === "players" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playerRisks.map(({ player, risk }) => (
              <PlayerCard key={player.id} player={player} risk={risk} />
            ))}
          </div>
        )}

        {selectedView === "analytics" && (
          <div className="space-y-6">
            <RiskChart data={chartData} type="bar" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-card/50 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-4">Injury Trends</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Hamstring Injuries</span>
                    <Badge variant="destructive">+15%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Ankle Injuries</span>
                    <Badge variant="secondary">-8%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Knee Injuries</span>
                    <Badge variant="secondary">-23%</Badge>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 bg-card/50 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
                <div className="space-y-3">
                  {playerRisks
                    .filter(p => p.risk.riskLevel !== "low")
                    .slice(0, 3)
                    .map(({ player, risk }) => (
                    <div key={player.id} className="p-3 bg-accent/50 rounded-lg">
                      <div className="font-medium">{player.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {risk.recommendations[0]}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
