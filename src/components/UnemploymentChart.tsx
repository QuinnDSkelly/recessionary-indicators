import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TimeSeriesData } from '@/services/economicDataService';

interface UnemploymentChartProps {
  data: TimeSeriesData[];
}

export const UnemploymentChart = ({ data }: UnemploymentChartProps) => {
  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            domain={[3.5, 4.2]}
          />
          <ReferenceLine 
            y={4.0} 
            stroke="hsl(var(--warning))" 
            strokeDasharray="2 2" 
            strokeWidth={1}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="hsl(var(--financial-red))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--financial-red))', strokeWidth: 0, r: 3 }}
            activeDot={{ r: 4, fill: 'hsl(var(--destructive))' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};