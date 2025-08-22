import { IndicatorCard } from "@/components/IndicatorCard";
import { YieldCurveChart } from "@/components/YieldCurveChart";
import { HousingChart } from "@/components/HousingChart";
import { PMIChart } from "@/components/PMIChart";
import { MoneySupplyChart } from "@/components/MoneySupplyChart";
import { DataSkeleton } from "@/components/LoadingSkeleton";
import { TrendingDown, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLeadingIndicators } from "@/hooks/useEconomicData";

const Index = () => {
  const { data, loading, error, lastUpdate, refreshData } = useLeadingIndicators();

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center space-y-3 py-8">
            <h1 className="text-4xl font-bold">Leading Recessionary Indicators</h1>
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
            Leading Recessionary Indicators
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Monitor key economic indicators that historically precede economic downturns
          </p>
          <div className="text-sm text-muted-foreground">
            Last updated: {lastUpdate}
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <IndicatorCard
            title="Treasury Yield Curve"
            value={data.treasurySpread.value > 0 ? "Normal" : "Inverted"}
            change={data.treasurySpread.change}
            trend={data.treasurySpread.trend}
            subtitle={`10Y-2Y Spread: ${data.treasurySpread.value > 0 ? '+' : ''}${(data.treasurySpread.value * 100).toFixed(0)} bps`}
          >
            <YieldCurveChart data={data.yieldCurve} />
          </IndicatorCard>

          <IndicatorCard
            title="New Housing Starts"
            value={`${data.housingStarts.indicator.value.toFixed(2)}M`}
            change={data.housingStarts.indicator.change}
            trend={data.housingStarts.indicator.trend}
            subtitle="Annual Rate (SAAR)"
          >
            <HousingChart data={data.housingStarts.timeSeriesData} />
          </IndicatorCard>

          <IndicatorCard
            title="Purchasing Manager's Index"
            value={data.pmi.indicator.value.toString()}
            change={data.pmi.indicator.change}
            trend={data.pmi.indicator.trend}
            subtitle="Manufacturing PMI (Below 50 = Contraction)"
          >
            <PMIChart data={data.pmi.timeSeriesData} />
          </IndicatorCard>

          <IndicatorCard
            title="Money Supply (M2)"
            value={`${data.moneySupply.indicator.value.toFixed(1)}%`}
            change={data.moneySupply.indicator.change}
            trend={data.moneySupply.indicator.trend}
            subtitle="Year-over-Year Growth"
          >
            <MoneySupplyChart data={data.moneySupply.timeSeriesData} />
          </IndicatorCard>
        </div>

        {/* Economic Assessment */}
        <div className="bg-gradient-to-r from-success/10 to-financial-blue/10 border border-success/20 rounded-lg p-6 mt-8">
          <div className="flex items-start space-x-3">
            <TrendingDown className="h-6 w-6 text-success mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Current Economic Assessment</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Recent data shows mixed signals: The yield curve has normalized (no longer inverted), 
                housing starts are showing modest growth, and PMI has improved but remains below 50. 
                Money supply growth has resumed, indicating monetary policy effects. 
                While some recession risks have diminished, continued monitoring is warranted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;