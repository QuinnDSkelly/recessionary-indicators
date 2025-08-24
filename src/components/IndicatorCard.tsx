import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface IndicatorCardProps {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down" | "neutral";
  subtitle?: string;
  children?: React.ReactNode;
  momChange?: number;
  yoyChange?: number;
  showDualMetrics?: boolean;
}

export const IndicatorCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  subtitle,
  children,
  momChange,
  yoyChange,
  showDualMetrics = false
}: IndicatorCardProps) => {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-financial-green" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-financial-red" />;
      default:
        return <Minus className="h-4 w-4 text-financial-gray" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-financial-green";
      case "down":
        return "text-financial-red";
      default:
        return "text-financial-gray";
    }
  };

  return (
    <Card className="relative overflow-hidden border-border/50 bg-gradient-to-br from-card to-accent/10 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
          {title}
        </CardTitle>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-foreground">{value}</div>
            {subtitle && (
              <div className="text-xs text-muted-foreground">{subtitle}</div>
            )}
          </div>
          <div className="flex items-center space-x-1">
            {getTrendIcon()}
            {showDualMetrics && momChange !== undefined && yoyChange !== undefined ? (
              <div className="text-sm font-medium space-y-0.5">
                <div className={getTrendColor()}>
                  MoM: {momChange > 0 ? '+' : ''}{momChange.toFixed(1)}{title.includes('PMI') ? '' : '%'}
                </div>
                <div className={getTrendColor()}>
                  YoY: {yoyChange > 0 ? '+' : ''}{yoyChange.toFixed(1)}{title.includes('PMI') ? '' : '%'}
                </div>
              </div>
            ) : (
              <span className={`text-sm font-medium ${getTrendColor()}`}>
                {change > 0 ? '+' : ''}{change.toFixed(2)}%
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      {children && (
        <CardContent className="pt-0">
          {children}
        </CardContent>
      )}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full" />
    </Card>
  );
};