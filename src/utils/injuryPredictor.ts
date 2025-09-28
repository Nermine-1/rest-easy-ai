import { Player, InjuryRisk, RiskFactor } from "@/types/player";

export class InjuryPredictor {
  private calculateOverallRisk(player: Player): number {
    let riskScore = 0;
    
    // Age factor (higher risk for older players)
    const ageFactor = Math.min((player.age - 20) / 15, 1);
    riskScore += ageFactor * 0.15;
    
    // Previous injury factor
    const injuryHistory = player.previousInjuries.length;
    const injuryFactor = Math.min(injuryHistory / 5, 1);
    riskScore += injuryFactor * 0.25;
    
    // Performance load factor
    const hoursPerGame = player.performance.hoursPlayed / player.performance.gamesPlayed || 0;
    const loadFactor = Math.min(hoursPerGame / 3, 1);
    riskScore += loadFactor * 0.2;
    
    // Fatigue factor
    const fatigueFactor = player.performance.fatigueScore / 10;
    riskScore += fatigueFactor * 0.2;
    
    // Intensity factor
    const intensityFactor = player.performance.intensityLevel / 10;
    riskScore += intensityFactor * 0.15;
    
    // Medical history factor
    const medicalFactor = Math.min(player.medicalHistory.chronicConditions.length / 3, 1);
    riskScore += medicalFactor * 0.05;
    
    return Math.min(riskScore, 1);
  }
  
  private calculateSpecificRisks(player: Player) {
    const baseRisk = this.calculateOverallRisk(player);
    
    return {
      hamstring: this.adjustRiskForInjuryType(baseRisk, player, "hamstring"),
      ankle: this.adjustRiskForInjuryType(baseRisk, player, "ankle"),
      knee: this.adjustRiskForInjuryType(baseRisk, player, "knee"),
      shoulder: this.adjustRiskForInjuryType(baseRisk, player, "shoulder"),
      back: this.adjustRiskForInjuryType(baseRisk, player, "back")
    };
  }
  
  private adjustRiskForInjuryType(baseRisk: number, player: Player, injuryType: string): number {
    let adjustedRisk = baseRisk;
    
    // Check for previous injuries of this type
    const previousInjuryOfType = player.previousInjuries.find(injury => 
      injury.type.toLowerCase().includes(injuryType.toLowerCase())
    );
    
    if (previousInjuryOfType) {
      // Increase risk for previous injuries
      adjustedRisk += 0.2;
      
      // Recent injuries increase risk more
      const daysSinceInjury = (Date.now() - previousInjuryOfType.date.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceInjury < 365) {
        adjustedRisk += 0.1;
      }
    }
    
    // Position-specific adjustments
    switch (injuryType) {
      case "hamstring":
        if (player.position.toLowerCase().includes("forward")) adjustedRisk += 0.1;
        break;
      case "ankle":
        if (player.position.toLowerCase().includes("midfielder")) adjustedRisk += 0.1;
        break;
      case "knee":
        if (player.position.toLowerCase().includes("defender")) adjustedRisk += 0.05;
        break;
    }
    
    return Math.min(adjustedRisk, 1);
  }
  
  private getRiskLevel(risk: number): "low" | "medium" | "high" {
    if (risk >= 0.7) return "high";
    if (risk >= 0.4) return "medium";
    return "low";
  }
  
  private generateRecommendations(player: Player, risk: InjuryRisk): string[] {
    const recommendations: string[] = [];
    
    if (risk.riskLevel === "high") {
      recommendations.push("Immediate rest and medical evaluation recommended");
      recommendations.push("Reduce training intensity by 50% for next 7 days");
    } else if (risk.riskLevel === "medium") {
      recommendations.push("Monitor closely and reduce training intensity by 25%");
      recommendations.push("Focus on injury prevention exercises");
    } else {
      recommendations.push("Continue current training regimen");
      recommendations.push("Maintain regular fitness assessments");
    }
    
    // Specific recommendations based on high-risk areas
    if (risk.specificRisks.hamstring > 0.6) {
      recommendations.push("Focus on hamstring flexibility and strengthening");
    }
    if (risk.specificRisks.knee > 0.6) {
      recommendations.push("Include knee stabilization exercises");
    }
    if (player.performance.fatigueScore > 7) {
      recommendations.push("Prioritize recovery and sleep optimization");
    }
    
    return recommendations;
  }
  
  private identifyRiskFactors(player: Player): RiskFactor[] {
    const factors: RiskFactor[] = [];
    
    if (player.age > 30) {
      factors.push({
        factor: "Age",
        impact: 0.15,
        description: "Players over 30 have increased injury risk"
      });
    }
    
    if (player.previousInjuries.length > 2) {
      factors.push({
        factor: "Injury History", 
        impact: 0.25,
        description: "Multiple previous injuries increase re-injury risk"
      });
    }
    
    if (player.performance.fatigueScore > 7) {
      factors.push({
        factor: "High Fatigue",
        impact: 0.2,
        description: "Elevated fatigue levels compromise injury resistance"
      });
    }
    
    const hoursPerGame = player.performance.hoursPlayed / player.performance.gamesPlayed;
    if (hoursPerGame > 2.5) {
      factors.push({
        factor: "High Playing Time",
        impact: 0.15,
        description: "Excessive playing time increases injury risk"
      });
    }
    
    return factors.sort((a, b) => b.impact - a.impact);
  }
  
  public analyzeRisk(player: Player): InjuryRisk {
    const overallRisk = this.calculateOverallRisk(player);
    const specificRisks = this.calculateSpecificRisks(player);
    const riskLevel = this.getRiskLevel(overallRisk);
    const riskFactors = this.identifyRiskFactors(player);
    
    const risk: InjuryRisk = {
      overallRisk,
      riskLevel,
      specificRisks,
      riskFactors,
      recommendations: []
    };
    
    risk.recommendations = this.generateRecommendations(player, risk);
    
    return risk;
  }
}