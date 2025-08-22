import { IndicatorCard } from "@/components/IndicatorCard";
import { UnemploymentChart } from "@/components/UnemploymentChart";
import { InflationChart } from "@/components/InflationChart";
import { TrendingUp, BarChart3, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LaggingIndicators = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link to="/">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Leading Indicators</span>
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-3 py-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BarChart3 className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-financial-blue bg-clip-text text-transparent">
              Lagging Recessionary Indicators
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Monitor economic indicators that confirm and reflect economic conditions after they've occurred
          </p>
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()} • Data as of June 2024
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <IndicatorCard
            title="Unemployment Rate"
            value="4.0%"
            change={0.3}
            trend="up"
            subtitle="Non-Farm Payrolls (Seasonally Adjusted)"
          >
            <UnemploymentChart />
          </IndicatorCard>

          <IndicatorCard
            title="Inflation Rate (CPI)"
            value="3.0%"
            change={-0.4}
            trend="down"
            subtitle="Year-over-Year Consumer Price Index"
          >
            <InflationChart />
          </IndicatorCard>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-primary/10 to-financial-blue/10 border border-primary/20 rounded-lg p-6 mt-8">
          <div className="flex items-start space-x-3">
            <TrendingUp className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Lagging Indicator Analysis</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Unemployment has risen modestly to 4.0%, which typically confirms economic weakness after it has begun. 
                Inflation continues to moderate from previous highs but remains above the Federal Reserve's 2% target. 
                These lagging indicators help confirm the economic trends identified by leading indicators.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Note */}
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground text-center">
            💡 <strong>Note:</strong> Lagging indicators confirm trends that leading indicators have already predicted. 
            Compare with <Link to="/" className="text-primary hover:underline">Leading Indicators</Link> for comprehensive analysis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LaggingIndicators;