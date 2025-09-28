import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
}

const StatsCard = ({ title, value, icon, trend, variant = "default", className }: StatsCardProps) => {
  const variantStyles = {
    default: "border-border/50",
    success: "border-success/30 bg-gradient-to-br from-success/5 to-transparent",
    warning: "border-warning/30 bg-gradient-to-br from-warning/5 to-transparent", 
    danger: "border-destructive/30 bg-gradient-to-br from-destructive/5 to-transparent"
  };

  return (
    <Card className={cn(
      "p-6 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 hover:shadow-elegant hover:scale-105",
      variantStyles[variant],
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-bold">{value}</h3>
            {trend && (
              <span className={cn(
                "text-xs px-2 py-1 rounded-full font-medium",
                trend.value > 0 
                  ? "text-success bg-success/10" 
                  : "text-destructive bg-destructive/10"
              )}>
                {trend.value > 0 ? "+" : ""}{trend.value}% {trend.label}
              </span>
            )}
          </div>
        </div>
        <div className={cn(
          "p-3 rounded-lg",
          variant === "success" && "text-success bg-success/10",
          variant === "warning" && "text-warning bg-warning/10",
          variant === "danger" && "text-destructive bg-destructive/10", 
          variant === "default" && "text-primary bg-primary/10"
        )}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;