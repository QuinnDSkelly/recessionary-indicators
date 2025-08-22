import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TimeSeriesData } from '@/services/economicDataService';

interface PMIChartProps {
  data: TimeSeriesData[];
}

export const PMIChart = ({ data }: PMIChartProps) => {
  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            domain={[40, 55]}
          />
          <ReferenceLine 
            y={50} 
            stroke="hsl(var(--warning))" 
            strokeDasharray="2 2" 
            strokeWidth={1}
          />
          <Bar 
            dataKey="value" 
            fill="hsl(var(--financial-blue))" 
            opacity={0.8}
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};