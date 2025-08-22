import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';

const inflationData = [
  { month: 'Jan', cpi: 3.4 },
  { month: 'Feb', cpi: 3.2 },
  { month: 'Mar', cpi: 3.5 },
  { month: 'Apr', cpi: 3.4 },
  { month: 'May', cpi: 3.3 },
  { month: 'Jun', cpi: 3.0 }
];

export const InflationChart = () => {
  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={inflationData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
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
            dataKey="cpi" 
            stroke="hsl(var(--financial-blue))" 
            fill="hsl(var(--financial-blue) / 0.2)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};