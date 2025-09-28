export interface PreviousInjury {
  type: string;
  date: Date;
  severity: "minor" | "moderate" | "severe";
  recoveryTime: number; // days
}

export interface Player {
  id: string;
  name: string;
  age: number;
  position: string;
  height: number; // cm
  weight: number; // kg
  previousInjuries: PreviousInjury[];
  performance: {
    hoursPlayed: number;
    gamesPlayed: number;
    intensityLevel: number; // 1-10 scale
    fatigueScore: number; // 1-10 scale
  };
  medicalHistory: {
    chronicConditions: string[];
    surgeries: string[];
    medications: string[];
  };
}

export interface InjuryRisk {
  overallRisk: number; // 0-1 probability
  riskLevel: "low" | "medium" | "high";
  specificRisks: {
    hamstring: number;
    ankle: number;
    knee: number;
    shoulder: number;
    back: number;
  };
  recommendations: string[];
  riskFactors: RiskFactor[];
}

export interface RiskFactor {
  factor: string;
  impact: number; // 0-1 contribution to overall risk
  description: string;
}

export interface TeamData {
  players: Player[];
  averageRisk: number;
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
  };
}

export interface RiskAnalysis {
  player: Player;
  risk: InjuryRisk;
  trend: "increasing" | "stable" | "decreasing";
  lastUpdated: Date;
}