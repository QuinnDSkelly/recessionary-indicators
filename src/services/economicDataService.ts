// Service to fetch real-time economic data
// Note: In production, you would use API keys and proper CORS handling

export interface EconomicIndicator {
  value: number;
  change: number;
  date: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface YieldCurveData {
  maturity: string;
  yield: number;
}

export interface TimeSeriesData {
  month: string;
  value: number;
}

// Mock data service that simulates real API calls
// In production, replace with actual API calls to FRED, BLS, etc.
class EconomicDataService {
  // Simulate API delay
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getYieldCurveData(): Promise<YieldCurveData[]> {
    await this.delay(500);
    // Latest yield curve data as of December 2024
    return [
      { maturity: '3M', yield: 4.2 },
      { maturity: '6M', yield: 4.1 },
      { maturity: '1Y', yield: 4.0 },
      { maturity: '2Y', yield: 4.0 },
      { maturity: '5Y', yield: 4.2 },
      { maturity: '10Y', yield: 4.5 },
      { maturity: '30Y', yield: 4.7 }
    ];
  }

  async getTreasurySpread(): Promise<EconomicIndicator> {
    await this.delay(300);
    // 10Y-2Y spread is now positive (no longer inverted)
    return {
      value: 0.5, // 50 basis points
      change: 0.8, // Increased from previous period
      date: '2024-12-31',
      trend: 'up'
    };
  }

  async getHousingStarts(): Promise<{
    indicator: EconomicIndicator;
    timeSeriesData: TimeSeriesData[];
  }> {
    await this.delay(400);
    return {
      indicator: {
        value: 1.35, // Million units (SAAR)
        change: 5.8, // Positive growth
        date: '2024-11-30',
        trend: 'up'
      },
      timeSeriesData: [
        { month: 'Jul', value: 1280 },
        { month: 'Aug', value: 1295 },
        { month: 'Sep', value: 1311 },
        { month: 'Oct', value: 1329 },
        { month: 'Nov', value: 1350 },
        { month: 'Dec', value: 1365 }
      ]
    };
  }

  async getPMI(): Promise<{
    indicator: EconomicIndicator;
    timeSeriesData: TimeSeriesData[];
  }> {
    await this.delay(350);
    return {
      indicator: {
        value: 49.3, // Still below 50 (contraction)
        change: 0.9, // Slight improvement
        date: '2024-12-31',
        trend: 'up'
      },
      timeSeriesData: [
        { month: 'Jul', value: 46.8 },
        { month: 'Aug', value: 47.2 },
        { month: 'Sep', value: 47.9 },
        { month: 'Oct', value: 48.1 },
        { month: 'Nov', value: 48.4 },
        { month: 'Dec', value: 49.3 }
      ]
    };
  }

  async getMoneySupply(): Promise<{
    indicator: EconomicIndicator;
    timeSeriesData: TimeSeriesData[];
  }> {
    await this.delay(380);
    return {
      indicator: {
        value: 3.9, // Year-over-year growth rate
        change: 0.1, // Slight increase
        date: '2025-01-31',
        trend: 'up'
      },
      timeSeriesData: [
        { month: 'Jul', value: 2.8 },
        { month: 'Aug', value: 3.1 },
        { month: 'Sep', value: 3.4 },
        { month: 'Oct', value: 3.6 },
        { month: 'Nov', value: 3.8 },
        { month: 'Dec', value: 3.9 }
      ]
    };
  }

  async getUnemploymentRate(): Promise<{
    indicator: EconomicIndicator;
    timeSeriesData: TimeSeriesData[];
  }> {
    await this.delay(420);
    return {
      indicator: {
        value: 4.1, // December 2024 unemployment rate
        change: 0.0, // No change from previous month
        date: '2024-12-31',
        trend: 'neutral'
      },
      timeSeriesData: [
        { month: 'Jul', value: 4.3 },
        { month: 'Aug', value: 4.2 },
        { month: 'Sep', value: 4.1 },
        { month: 'Oct', value: 4.1 },
        { month: 'Nov', value: 4.1 },
        { month: 'Dec', value: 4.1 }
      ]
    };
  }

  async getInflationRate(): Promise<{
    indicator: EconomicIndicator;
    timeSeriesData: TimeSeriesData[];
  }> {
    await this.delay(450);
    return {
      indicator: {
        value: 2.9, // December 2024 CPI year-over-year
        change: -0.1, // Slight decline
        date: '2024-12-31',
        trend: 'down'
      },
      timeSeriesData: [
        { month: 'Jul', value: 2.9 },
        { month: 'Aug', value: 2.5 },
        { month: 'Sep', value: 2.4 },
        { month: 'Oct', value: 2.6 },
        { month: 'Nov', value: 2.7 },
        { month: 'Dec', value: 2.9 }
      ]
    };
  }

  // Method to get all leading indicators at once
  async getAllLeadingIndicators() {
    const [yieldCurve, treasurySpread, housingStarts, pmi, moneySupply] = await Promise.all([
      this.getYieldCurveData(),
      this.getTreasurySpread(),
      this.getHousingStarts(),
      this.getPMI(),
      this.getMoneySupply()
    ]);

    return {
      yieldCurve,
      treasurySpread,
      housingStarts,
      pmi,
      moneySupply
    };
  }

  // Method to get all lagging indicators at once
  async getAllLaggingIndicators() {
    const [unemployment, inflation] = await Promise.all([
      this.getUnemploymentRate(),
      this.getInflationRate()
    ]);

    return {
      unemployment,
      inflation
    };
  }

  // Method to check for data updates (would connect to real API in production)
  getLastUpdateTime(): string {
    return new Date().toLocaleString();
  }
}

export const economicDataService = new EconomicDataService();