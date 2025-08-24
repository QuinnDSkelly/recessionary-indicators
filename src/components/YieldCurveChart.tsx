import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';
import { YieldCurveData } from '@/services/economicDataService';

interface YieldCurveChartProps {
  data: YieldCurveData[];
}

export const YieldCurveChart = ({ data }: YieldCurveChartProps) => {
  // Calculate dynamic domain for better trend visibility
  const yields = data.map(d => d.yield).filter(y => !isNaN(y));
  const minYield = Math.min(...yields);
  const maxYield = Math.max(...yields);
  const range = maxYield - minYield;
  const padding = Math.max(range * 0.1, 0.1);
  
  // Check for inverted yield curve (recession indicator)
  const isInverted = data.length >= 2 && 
    data.find(d => d.maturity === '2Y')?.yield > data.find(d => d.maturity === '10Y')?.yield;

  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 15, left: 15, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
          <XAxis 
            dataKey="maturity" 
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
            domain={[minYield - padding, maxYield + padding]}
            tickFormatter={(value) => `${value.toFixed(2)}%`}
          />
          <Tooltip 
            formatter={(value: number) => [`${value.toFixed(3)}%`, 'Yield']}
            labelFormatter={(label) => `${label} Treasury`}
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              fontSize: '12px'
            }}
          />
          {/* Reference line for normal curve baseline */}
          <ReferenceLine 
            y={yields.length > 0 ? Math.min(...yields) : 0} 
            stroke="hsl(var(--muted-foreground))" 
            strokeDasharray="5 5" 
            strokeOpacity={0.3}
          />
          <Line 
            type="monotone" 
            dataKey="yield" 
            stroke={isInverted ? "hsl(var(--destructive))" : "hsl(var(--financial-blue))"} 
            strokeWidth={3}
            dot={{ 
              fill: isInverted ? "hsl(var(--destructive))" : "hsl(var(--financial-blue))", 
              strokeWidth: 0, 
              r: 4 
            }}
            activeDot={{ 
              r: 6, 
              fill: isInverted ? "hsl(var(--destructive))" : "hsl(var(--primary))",
              strokeWidth: 2,
              stroke: 'hsl(var(--background))'
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};