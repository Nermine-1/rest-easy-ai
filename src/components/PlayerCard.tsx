import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import RiskIndicator from "@/components/RiskIndicator";
import { Player, InjuryRisk } from "@/types/player";
import { Eye, TrendingUp, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlayerCardProps {
  player: Player;
  risk: InjuryRisk;
}

const PlayerCard = ({ player, risk }: PlayerCardProps) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 hover:shadow-elegant group">
      <div className="space-y-4">
        {/* Player Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-lg">{player.name}</h3>
              <Badge variant="outline" className="text-xs">
                #{player.id}
              </Badge>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{player.position}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{player.age}y</span>
              </span>
            </div>
          </div>
          <RiskIndicator riskLevel={risk.overallRisk} />
        </div>

        {/* Risk Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Risk</span>
            <span className={cn("text-sm font-semibold", getRiskColor(risk.riskLevel))}>
              {Math.round(risk.overallRisk * 100)}%
            </span>
          </div>
          <Progress 
            value={risk.overallRisk * 100} 
            className="h-2"
          />
        </div>

        {/* Top Risk Factors */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Top Risk Factors</h4>
          <div className="flex flex-wrap gap-1">
            {risk.riskFactors.slice(0, 3).map((factor, index) => (
              <Badge 
                key={index}
                variant="secondary" 
                className="text-xs py-1 px-2"
              >
                {factor.factor}: {Math.round(factor.impact * 100)}%
              </Badge>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border/50">
          <div className="text-center">
            <div className="text-lg font-semibold">{player.performance.hoursPlayed}</div>
            <div className="text-xs text-muted-foreground">Hours</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{player.performance.gamesPlayed}</div>
            <div className="text-xs text-muted-foreground">Games</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{player.previousInjuries.length}</div>
            <div className="text-xs text-muted-foreground">Injuries</div>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          variant="outline" 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default PlayerCard;