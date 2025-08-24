import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts';
import { TimeSeriesData } from '@/services/economicDataService';

interface UnemploymentChartProps {
  data: TimeSeriesData[];
}

export const UnemploymentChart = ({ data }: UnemploymentChartProps) => {
  // Calculate 3-month moving average for trend
  const trendData = data.map((item, index) => {
    const windowSize = Math.min(3, index + 1);
    const window = data.slice(Math.max(0, index - windowSize + 1), index + 1);
    const avgValue = window.reduce((sum, d) => sum + d.value, 0) / window.length;
    return { ...item, trend: avgValue };
  });

  // Dynamic domain calculation
  const values = data.map(d => d.value).filter(v => !isNaN(v));
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue;
  const padding = Math.max(range * 0.1, 0.2);

  // Natural unemployment rate reference (around 4-5%)
  const naturalRate = 4.5;

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
            domain={[Math.max(0, minValue - padding), maxValue + padding]}
            tickFormatter={(value) => `${value.toFixed(1)}%`}
          />
          <Tooltip 
            formatter={(value: number, name: string) => [
              `${value.toFixed(2)}%`,
              name === 'value' ? 'Unemployment Rate' : '3-Month Average'
            ]}
            labelFormatter={(label) => `${label}`}
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              fontSize: '12px'
            }}
          />
          {/* Natural unemployment rate reference */}
          <ReferenceLine 
            y={naturalRate} 
            stroke="hsl(var(--muted-foreground))" 
            strokeDasharray="5 5" 
            strokeWidth={1}
            label={{ value: "Natural Rate", position: "insideTopRight", fontSize: 10 }}
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
            strokeWidth={3}
            strokeDasharray="4 4"
            dot={false}
            activeDot={{ 
              r: 5, 
              fill: 'hsl(var(--primary))',
              strokeWidth: 2,
              stroke: 'hsl(var(--background))'
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};