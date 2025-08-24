import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts';
import { TimeSeriesData } from '@/services/economicDataService';

interface PMIChartProps {
  data: TimeSeriesData[];
}

export const PMIChart = ({ data }: PMIChartProps) => {
  // Calculate moving average for trend
  const trendData = data.map((item, index) => {
    const windowSize = Math.min(3, index + 1);
    const window = data.slice(Math.max(0, index - windowSize + 1), index + 1);
    const avgValue = window.reduce((sum, d) => sum + d.value, 0) / window.length;
    return { ...item, trend: avgValue };
  });

  // PMI index values should be around 45-55 range with 50 as expansion/contraction threshold
  const values = data.map(d => d.value).filter(v => !isNaN(v));
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  
  // Use appropriate PMI range (typically 40-60) but adjust based on actual data
  const domainMin = Math.min(40, minValue - 2);
  const domainMax = Math.max(60, maxValue + 2);

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
            domain={[domainMin, domainMax]}
            tickFormatter={(value) => `${value.toFixed(0)}`}
          />
          <Tooltip 
            formatter={(value: number, name: string) => [
              `${value.toFixed(1)}`,
              name === 'value' ? 'ISM Manufacturing PMI' : 'Trend'
            ]}
            labelFormatter={(label) => `${label}`}
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              fontSize: '12px'
            }}
          />
          {/* 50 line indicates expansion/contraction threshold for PMI */}
          <ReferenceLine 
            y={50} 
            stroke="hsl(var(--warning))" 
            strokeDasharray="4 4" 
            strokeWidth={2}
          />
          <Bar 
            dataKey="value" 
            fill="hsl(var(--financial-blue))"
            opacity={0.7}
            radius={[3, 3, 0, 0]}
          />
          <Line
            type="monotone"
            dataKey="trend"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 5, stroke: 'hsl(var(--background))', strokeWidth: 2 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};