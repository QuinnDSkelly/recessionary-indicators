import { IndicatorCard } from "@/components/IndicatorCard";
import { YieldCurveChart } from "@/components/YieldCurveChart";
import { HousingChart } from "@/components/HousingChart";
import { PMIChart } from "@/components/PMIChart";
import { MoneySupplyChart } from "@/components/MoneySupplyChart";
import { TrendingDown, AlertTriangle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-3 py-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <AlertTriangle className="h-8 w-8 text-warning" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-financial-blue bg-clip-text text-transparent">
              Leading Recessionary Indicators
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Monitor key economic indicators that historically precede economic downturns
          </p>
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()} • Data as of June 2024
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <IndicatorCard
            title="Treasury Yield Curve"
            value="Inverted"
            change={-0.3}
            trend="down"
            subtitle="10Y-2Y Spread: -30 bps"
          >
            <YieldCurveChart />
          </IndicatorCard>

          <IndicatorCard
            title="New Housing Starts"
            value="1,253K"
            change={-12.1}
            trend="down"
            subtitle="Annual Rate (SAAR)"
          >
            <HousingChart />
          </IndicatorCard>

          <IndicatorCard
            title="Purchasing Manager's Index"
            value="46.8"
            change={-3.9}
            trend="down"
            subtitle="Manufacturing PMI (Below 50 = Contraction)"
          >
            <PMIChart />
          </IndicatorCard>

          <IndicatorCard
            title="Money Supply (M2)"
            value="1.4%"
            change={-1.4}
            trend="down"
            subtitle="Year-over-Year Growth"
          >
            <MoneySupplyChart />
          </IndicatorCard>
        </div>

        {/* Warning Banner */}
        <div className="bg-gradient-to-r from-warning/10 to-financial-red/10 border border-warning/20 rounded-lg p-6 mt-8">
          <div className="flex items-start space-x-3">
            <TrendingDown className="h-6 w-6 text-warning mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Economic Risk Assessment</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Multiple indicators are showing concerning trends: The yield curve remains inverted, 
                housing starts continue declining, PMI has dropped below 50 indicating manufacturing contraction, 
                and money supply growth has significantly slowed. These patterns historically precede economic recessions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
