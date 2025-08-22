import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { YieldCurveData } from '@/services/economicDataService';

interface YieldCurveChartProps {
  data: YieldCurveData[];
}

export const YieldCurveChart = ({ data }: YieldCurveChartProps) => {
  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="maturity" 
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            domain={['dataMin - 0.2', 'dataMax + 0.2']}
          />
          <Line 
            type="monotone" 
            dataKey="yield" 
            stroke="hsl(var(--financial-blue))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--financial-blue))', strokeWidth: 0, r: 3 }}
            activeDot={{ r: 4, fill: 'hsl(var(--primary))' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};