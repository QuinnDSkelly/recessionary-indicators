import { useState, useEffect, useCallback } from 'react';
import { economicDataService, EconomicIndicator, YieldCurveData, TimeSeriesData } from '@/services/economicDataService';

export interface LeadingIndicatorsData {
  yieldCurve: YieldCurveData[];
  treasurySpread: EconomicIndicator;
  housingStarts: {
    indicator: EconomicIndicator;
    timeSeriesData: TimeSeriesData[];
  };
  pmi: {
    indicator: EconomicIndicator;
    timeSeriesData: TimeSeriesData[];
  };
  moneySupply: {
    indicator: EconomicIndicator;
    timeSeriesData: TimeSeriesData[];
  };
}

export interface LaggingIndicatorsData {
  unemployment: {
    indicator: EconomicIndicator;
    timeSeriesData: TimeSeriesData[];
  };
  inflation: {
    indicator: EconomicIndicator;
    timeSeriesData: TimeSeriesData[];
  };
}

export const useLeadingIndicators = () => {
  const [data, setData] = useState<LeadingIndicatorsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const indicatorsData = await economicDataService.getAllLeadingIndicators();
      setData(indicatorsData);
      setLastUpdate(economicDataService.getLastUpdateTime());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refreshData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, lastUpdate, refreshData };
};

export const useLaggingIndicators = () => {
  const [data, setData] = useState<LaggingIndicatorsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const indicatorsData = await economicDataService.getAllLaggingIndicators();
      setData(indicatorsData);
      setLastUpdate(economicDataService.getLastUpdateTime());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refreshData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, lastUpdate, refreshData };
};