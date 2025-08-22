import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TimeSeriesData } from '@/services/economicDataService';

interface InflationChartProps {
  data: TimeSeriesData[];
}

export const InflationChart = ({ data }: InflationChartProps) => {
  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            domain={[2.5, 3.8]}
          />
          <ReferenceLine 
            y={2.0} 
            stroke="hsl(var(--success))" 
            strokeDasharray="2 2" 
            strokeWidth={1}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="hsl(var(--financial-blue))" 
            fill="hsl(var(--financial-blue) / 0.2)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};