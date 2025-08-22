import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { TimeSeriesData } from '@/services/economicDataService';

interface HousingChartProps {
  data: TimeSeriesData[];
}

export const HousingChart = ({ data }: HousingChartProps) => {
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
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="hsl(var(--financial-red))" 
            fill="hsl(var(--financial-red) / 0.2)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};