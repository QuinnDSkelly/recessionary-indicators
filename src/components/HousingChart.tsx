import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { TimeSeriesData } from '@/services/economicDataService';

interface HousingChartProps {
  data: TimeSeriesData[];
}

export const HousingChart = ({ data }: HousingChartProps) => {
  // Calculate trend line data
  const trendData = data.map((item, index) => {
    const values = data.slice(0, index + 1).map(d => d.value);
    const avgValue = values.reduce((sum, val) => sum + val, 0) / values.length;
    return { ...item, trend: avgValue };
  });

  // Calculate dynamic domain for better trend visibility
  const values = data.map(d => d.value).filter(v => !isNaN(v));
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue;
  const padding = range * 0.05;

  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={trendData} margin={{ top: 10, right: 15, left: 15, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
            domain={[minValue - padding, maxValue + padding]}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip 
            formatter={(value: number, name: string) => [
              name === 'value' ? `${value.toLocaleString()} units` : `${value.toLocaleString()} units`,
              name === 'value' ? 'Housing Starts' : 'Trend'
            ]}
            labelFormatter={(label) => `${label}`}
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              fontSize: '12px'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="hsl(var(--financial-red))" 
            fill="hsl(var(--financial-red) / 0.3)" 
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="trend"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            activeDot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};