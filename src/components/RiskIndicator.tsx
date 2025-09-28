import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskIndicatorProps {
  riskLevel: number;
  className?: string;
}

const RiskIndicator = ({ riskLevel, className }: RiskIndicatorProps) => {
  const getRiskLevel = (risk: number) => {
    if (risk >= 0.7) return "high";
    if (risk >= 0.4) return "medium";
    return "low";
  };

  const level = getRiskLevel(riskLevel);
  
  const config = {
    high: {
      icon: AlertTriangle,
      label: "High Risk",
      variant: "destructive" as const,
      color: "text-destructive"
    },
    medium: {
      icon: AlertCircle, 
      label: "Medium Risk",
      variant: "secondary" as const,
      color: "text-warning"
    },
    low: {
      icon: CheckCircle,
      label: "Low Risk", 
      variant: "secondary" as const,
      color: "text-success"
    }
  };

  const { icon: Icon, label, variant, color } = config[level];

  return (
    <Badge variant={variant} className={cn("flex items-center space-x-1", className)}>
      <Icon className={cn("h-3 w-3", color)} />
      <span>{label}</span>
    </Badge>
  );
};

export default RiskIndicator;