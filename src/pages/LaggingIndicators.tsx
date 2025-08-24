import { IndicatorCard } from "@/components/IndicatorCard";
import { UnemploymentChart } from "@/components/UnemploymentChart";
import { InflationChart } from "@/components/InflationChart";
import { DataSkeleton } from "@/components/LoadingSkeleton";
import { TrendingUp, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLaggingIndicators } from "@/hooks/useEconomicData";

const LaggingIndicators = () => {
  const { data, loading, error, lastUpdate, refreshData } = useLaggingIndicators();

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center space-y-3 py-8">
            <h1 className="text-4xl font-bold">Lagging Recessionary Indicators</h1>
            <p className="text-lg text-muted-foreground">Loading latest economic data...</p>
          </div>
          <DataSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center space-y-3 py-8">
            <h1 className="text-4xl font-bold text-destructive">Error Loading Data</h1>
            <p className="text-lg text-muted-foreground">{error}</p>
            <Button onClick={refreshData} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Navigation */}
        <div className="flex items-center justify-end">
          <Button onClick={refreshData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>

        {/* Header */}
        <div className="text-center space-y-3 py-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-financial-blue bg-clip-text text-transparent mb-4">
            Lagging Recessionary Indicators
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Monitor economic indicators that confirm and reflect economic conditions after they've occurred
          </p>
          <div className="text-sm text-muted-foreground">
            Last updated: {lastUpdate}
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <IndicatorCard
            title="Unemployment Rate"
            value={`${data.unemployment.indicator.value.toFixed(1)}%`}
            change={data.unemployment.indicator.change}
            trend={data.unemployment.indicator.trend}
            subtitle="Non-Farm Payrolls (Seasonally Adjusted)"
          >
            <UnemploymentChart data={data.unemployment.timeSeriesData} />
          </IndicatorCard>

          <IndicatorCard
            title="Inflation Rate (CPI)"
            value={`${data.inflation.indicator.value.toFixed(1)}%`}
            change={data.inflation.indicator.change}
            trend={data.inflation.indicator.trend}
            subtitle="Consumer Price Index for All Urban Consumers"
          >
            <InflationChart data={data.inflation.timeSeriesData} />
          </IndicatorCard>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-primary/10 to-financial-blue/10 border border-primary/20 rounded-lg p-6 mt-8">
          <div className="flex items-start space-x-3">
            <TrendingUp className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Lagging Indicator Analysis</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Unemployment remains stable at {data.unemployment.indicator.value.toFixed(1)}%, reflecting a still-resilient labor market. 
                Inflation has moderated to {data.inflation.indicator.value.toFixed(1)}%, approaching the Federal Reserve's 2% target but still elevated. 
                These lagging indicators suggest the economy is showing mixed signals, with employment strength offsetting inflationary pressures.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Note */}
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Note:</strong> Lagging indicators confirm trends that leading indicators have already predicted. 
            Compare with <Link to="/leading" className="text-primary hover:underline">Leading Indicators</Link> for comprehensive analysis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LaggingIndicators;