import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown, BarChart3, AlertTriangle } from "lucide-react";

const FedCountdown = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center space-y-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-financial-blue bg-clip-text text-transparent">
          Recession Indicators Dashboard
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Monitor key economic indicators to track potential recession signals. 
          Get real-time data from the Federal Reserve Economic Data (FRED) database.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link to="/leading">
            <Button size="lg" className="w-full sm:w-auto">
              <TrendingUp className="mr-2 h-5 w-5" />
              View Leading Indicators
            </Button>
          </Link>
          <Link to="/lagging">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <TrendingDown className="mr-2 h-5 w-5" />
              View Lagging Indicators
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-muted/30 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Track Key Economic Indicators</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Leading Indicators */}
            <div className="bg-card rounded-xl p-6 border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-financial-green/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-financial-green" />
                </div>
                <h3 className="font-semibold">Leading Indicators</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Yield Curve Analysis</li>
                <li>• Treasury Spreads</li>
                <li>• Housing Starts</li>
                <li>• PMI Index</li>
                <li>• Money Supply</li>
              </ul>
            </div>

            {/* Lagging Indicators */}
            <div className="bg-card rounded-xl p-6 border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-financial-red/10 rounded-lg">
                  <TrendingDown className="h-6 w-6 text-financial-red" />
                </div>
                <h3 className="font-semibold">Lagging Indicators</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Unemployment Rate</li>
                <li>• Inflation Metrics</li>
                <li>• Consumer Price Index</li>
                <li>• Employment Data</li>
              </ul>
            </div>

            {/* Real-time Data */}
            <div className="bg-card rounded-xl p-6 border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-financial-blue/10 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-financial-blue" />
                </div>
                <h3 className="font-semibold">Real-time Data</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• FRED API Integration</li>
                <li>• Live Market Data</li>
                <li>• Historical Trends</li>
                <li>• Interactive Charts</li>
              </ul>
            </div>

            {/* Early Warning */}
            <div className="bg-card rounded-xl p-6 border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-warning" />
                </div>
                <h3 className="font-semibold">Early Warning</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Recession Signals</li>
                <li>• Economic Trends</li>
                <li>• Market Analysis</li>
                <li>• Risk Assessment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-bold">Understanding Economic Indicators</h2>
          <p className="text-muted-foreground leading-relaxed">
            Economic indicators are statistical metrics that help economists, investors, and policymakers 
            assess the health of an economy. Leading indicators predict future economic activity, while 
            lagging indicators confirm trends that have already occurred.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            This dashboard provides real-time access to key indicators sourced from the Federal Reserve 
            Economic Data (FRED) to help you stay informed about potential economic shifts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FedCountdown;


