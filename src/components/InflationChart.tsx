import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts';
import { TimeSeriesData } from '@/services/economicDataService';

interface InflationChartProps {
  data: TimeSeriesData[];
}

export const InflationChart = ({ data }: InflationChartProps) => {
  // Calculate year-over-year change for more meaningful inflation visualization
  const inflationData = data.map((item, index) => {
    // For inflation, we want to show the rate itself and its trend
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
  const padding = Math.max(range * 0.1, 0.3);

  // Fed target rate (2%)
  const fedTarget = 2.0;

  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={inflationData} margin={{ top: 10, right: 15, left: 15, bottom: 10 }}>
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
              name === 'value' ? 'Inflation Rate (YoY)' : '3-Month Average'
            ]}
            labelFormatter={(label) => `${label}`}
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              fontSize: '12px'
            }}
          />
          {/* Fed 2% target line */}
          <ReferenceLine 
            y={fedTarget} 
            stroke="hsl(var(--success))" 
            strokeDasharray="5 5" 
            strokeWidth={2}
            label={{ value: "Fed Target (2%)", position: "insideTopRight", fontSize: 10 }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="hsl(var(--financial-blue))" 
            fill="hsl(var(--financial-blue) / 0.3)" 
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="trend" 
            stroke="hsl(var(--warning))" 
            strokeWidth={3}
            strokeDasharray="4 4"
            dot={false}
            activeDot={{ 
              r: 5, 
              fill: 'hsl(var(--warning))',
              strokeWidth: 2,
              stroke: 'hsl(var(--background))'
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};