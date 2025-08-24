import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FredResponse {
  observations?: Array<{
    date: string;
    value: string;
  }>;
  realtime_start?: string;
  realtime_end?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { indicator } = await req.json();
    const fredApiKey = Deno.env.get('FRED_API_KEY');
    
    console.log(`Environment check - FRED_API_KEY exists: ${!!fredApiKey}`);
    
    if (!fredApiKey) {
      console.error('FRED_API_KEY environment variable not found');
      throw new Error('FRED API key not configured');
    }

    console.log(`Fetching data for indicator: ${indicator}`);

    // FRED API series IDs for different indicators
    const seriesMap: Record<string, string> = {
      'treasury-spread': 'T10Y2Y', // 10-Year Treasury Constant Maturity Minus 2-Year Treasury Constant Maturity
      'housing-starts': 'HOUST', // Housing Starts: Total: New Privately Owned Housing Units Started
      'pmi': 'NAPM', // ISM Manufacturing PMI
      'money-supply': 'M2SL', // M2 Money Supply
      'unemployment': 'UNRATE', // Unemployment Rate
      'inflation': 'CPIAUCSL', // Consumer Price Index for All Urban Consumers: All Items
      'yield-3m': 'DGS3MO', // 3-Month Treasury Constant Maturity Rate
      'yield-6m': 'DGS6MO', // 6-Month Treasury Constant Maturity Rate
      'yield-1y': 'DGS1', // 1-Year Treasury Constant Maturity Rate
      'yield-2y': 'DGS2', // 2-Year Treasury Constant Maturity Rate
      'yield-5y': 'DGS5', // 5-Year Treasury Constant Maturity Rate
      'yield-10y': 'DGS10', // 10-Year Treasury Constant Maturity Rate
      'yield-30y': 'DGS30', // 30-Year Treasury Constant Maturity Rate
    };

    const seriesId = seriesMap[indicator];
    if (!seriesId) {
      throw new Error(`Unknown indicator: ${indicator}`);
    }

    // Fetch data from FRED API
    const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${fredApiKey}&file_type=json&limit=12&sort_order=desc`;
    
    console.log(`Fetching from FRED: ${url.replace(fredApiKey, '[API_KEY]')}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`FRED API error: ${response.status} ${response.statusText}`);
    }

    const data: FredResponse = await response.json();
    
    if (!data.observations) {
      throw new Error('No observations returned from FRED API');
    }

    console.log(`Successfully fetched ${data.observations.length} observations for ${indicator}`);

    // Transform FRED data to our format
    const transformedData = data.observations
      .filter(obs => obs.value !== '.')
      .map(obs => ({
        date: obs.date,
        value: parseFloat(obs.value),
        month: new Date(obs.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
      }))
      .reverse(); // FRED returns desc, we want asc for time series

    return new Response(JSON.stringify({ 
      success: true, 
      data: transformedData,
      lastUpdate: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in fetch-economic-data function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});