import { supabase } from '@/integrations/supabase/client';

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

class EconomicDataService {
  private lastUpdateTime: string = '';

  private async fetchFromFred(indicator: string): Promise<any> {
    try {
      const { data, error } = await supabase.functions.invoke('fetch-economic-data', {
        body: { indicator }
      });

      if (error) {
        console.error(`Error fetching ${indicator}:`, error);
        throw new Error(`Failed to fetch ${indicator}: ${error.message}`);
      }

      if (!data.success) {
        throw new Error(data.error || `Failed to fetch ${indicator}`);
      }

      return data.data;
    } catch (error) {
      console.error(`Error fetching ${indicator}:`, error);
      // Return mock data as fallback
      return this.getMockData(indicator);
    }
  }

  private getMockData(indicator: string): any {
    // Fallback mock data in case FRED API fails
    const mockTimeSeriesData = [
      { month: 'Jul', value: 1.2 },
      { month: 'Aug', value: 1.5 },
      { month: 'Sep', value: 1.8 },
      { month: 'Oct', value: 2.1 },
      { month: 'Nov', value: 2.3 },
      { month: 'Dec', value: 2.5 },
    ];

    switch (indicator) {
      case 'treasury-spread':
        return [{ date: new Date().toISOString(), value: 0.5 }];
      case 'housing-starts':
      case 'pmi':
      case 'money-supply':
      case 'unemployment':
      case 'inflation':
        return mockTimeSeriesData;
      default:
        return mockTimeSeriesData;
    }
  }

  async getYieldCurveData(): Promise<YieldCurveData[]> {
    try {
      const yieldIndicators = ['yield-3m', 'yield-6m', 'yield-1y', 'yield-2y', 'yield-5y', 'yield-10y', 'yield-30y'];
      const yieldPromises = yieldIndicators.map(indicator => this.fetchFromFred(indicator));
      const yieldResults = await Promise.all(yieldPromises);

      const maturities = ['3M', '6M', '1Y', '2Y', '5Y', '10Y', '30Y'];
      
      return maturities.map((maturity, index) => ({
        maturity,
        yield: yieldResults[index]?.[0]?.value || (4.0 + (index * 0.1)) // Fallback values
      }));
    } catch (error) {
      console.error('Error fetching yield curve data:', error);
      // Return mock data as fallback
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
  }

  async getTreasurySpread(): Promise<EconomicIndicator> {
    try {
      const data = await this.fetchFromFred('treasury-spread');
      const latest = data[data.length - 1];
      const previous = data[data.length - 2];
      
      return {
        value: latest?.value || 0.5,
        change: previous ? (latest.value - previous.value) : 0.8,
        date: latest?.date || new Date().toISOString().split('T')[0],
        trend: previous ? (latest.value > previous.value ? 'up' : latest.value < previous.value ? 'down' : 'neutral') : 'up'
      };
    } catch (error) {
      console.error('Error fetching treasury spread:', error);
      return {
        value: 0.5,
        change: 0.8,
        date: '2024-12-31',
        trend: 'up'
      };
    }
  }

  async getHousingStarts(): Promise<{
    indicator: EconomicIndicator;
    timeSeriesData: TimeSeriesData[];
  }> {
    try {
      const data = await this.fetchFromFred('housing-starts');
      const latest = data[data.length - 1];
      const previous = data[data.length - 2];

      return {
        indicator: {
          value: latest?.value || 1.35,
          change: previous ? (latest.value - previous.value) : 5.8,
          date: latest?.date || '2024-11-30',
          trend: previous ? (latest.value > previous.value ? 'up' : latest.value < previous.value ? 'down' : 'neutral') : 'up'
        },
        timeSeriesData: data.map((item: any) => ({
          month: item.month,
          value: item.value
        }))
      };
    } catch (error) {
      console.error('Error fetching housing starts:', error);
      return {
        indicator: {
          value: 1.35,
          change: 5.8,
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
  }

  async getPMI(): Promise<{
    indicator: EconomicIndicator;
    timeSeriesData: TimeSeriesData[];
  }> {
    try {
      const data = await this.fetchFromFred('pmi');
      const latest = data[data.length - 1];
      const previous = data[data.length - 2];

      return {
        indicator: {
          value: latest?.value || 49.3,
          change: previous ? (latest.value - previous.value) : 0.9,
          date: latest?.date || '2024-12-31',
          trend: previous ? (latest.value > previous.value ? 'up' : latest.value < previous.value ? 'down' : 'neutral') : 'up'
        },
        timeSeriesData: data.map((item: any) => ({
          month: item.month,
          value: item.value
        }))
      };
    } catch (error) {
      console.error('Error fetching PMI:', error);
      return {
        indicator: {
          value: 49.3,
          change: 0.9,
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
  }

  async getMoneySupply(): Promise<{
    indicator: EconomicIndicator;
    timeSeriesData: TimeSeriesData[];
  }> {
    try {
      const data = await this.fetchFromFred('money-supply');
      const latest = data[data.length - 1];
      const previous = data[data.length - 2];
      
      // Calculate YoY percentage change for M2 money supply
      let yoyChange = 0;
      if (data.length >= 12) {
        const yearAgo = data[data.length - 12];
        yoyChange = ((latest.value - yearAgo.value) / yearAgo.value) * 100;
      } else if (previous) {
        // Fallback to month-over-month percentage if we don't have 12 months
        yoyChange = ((latest.value - previous.value) / previous.value) * 100;
      }

      return {
        indicator: {
          value: latest?.value || 3.9,
          change: yoyChange,
          date: latest?.date || '2025-01-31',
          trend: yoyChange > 0 ? 'up' : yoyChange < 0 ? 'down' : 'neutral'
        },
        timeSeriesData: data.map((item: any) => ({
          month: item.month,
          value: item.value
        }))
      };
    } catch (error) {
      console.error('Error fetching money supply:', error);
      return {
        indicator: {
          value: 3.9,
          change: 0.1,
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
  }

  async getUnemploymentRate(): Promise<{
    indicator: EconomicIndicator;
    timeSeriesData: TimeSeriesData[];
  }> {
    try {
      const data = await this.fetchFromFred('unemployment');
      const latest = data[data.length - 1];
      const previous = data[data.length - 2];

      return {
        indicator: {
          value: latest?.value || 4.1,
          change: previous ? (latest.value - previous.value) : 0.0,
          date: latest?.date || '2024-12-31',
          trend: previous ? (latest.value > previous.value ? 'up' : latest.value < previous.value ? 'down' : 'neutral') : 'neutral'
        },
        timeSeriesData: data.map((item: any) => ({
          month: item.month,
          value: item.value
        }))
      };
    } catch (error) {
      console.error('Error fetching unemployment rate:', error);
      return {
        indicator: {
          value: 4.1,
          change: 0.0,
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
  }

  async getInflationRate(): Promise<{
    indicator: EconomicIndicator;
    timeSeriesData: TimeSeriesData[];
  }> {
    try {
      const data = await this.fetchFromFred('inflation');
      const latest = data[data.length - 1];
      const previous = data[data.length - 2];

      return {
        indicator: {
          value: latest?.value || 2.9,
          change: previous ? (latest.value - previous.value) : -0.1,
          date: latest?.date || '2024-12-31',
          trend: previous ? (latest.value > previous.value ? 'up' : latest.value < previous.value ? 'down' : 'neutral') : 'down'
        },
        timeSeriesData: data.map((item: any) => ({
          month: item.month,
          value: item.value
        }))
      };
    } catch (error) {
      console.error('Error fetching inflation rate:', error);
      return {
        indicator: {
          value: 2.9,
          change: -0.1,
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

  // Method to check for data updates
  getLastUpdateTime(): string {
    return this.lastUpdateTime || new Date().toLocaleString();
  }
}

export const economicDataService = new EconomicDataService();