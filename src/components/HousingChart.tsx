import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const housingData = [
  { month: 'Jan', starts: 1425 },
  { month: 'Feb', starts: 1398 },
  { month: 'Mar', starts: 1342 },
  { month: 'Apr', starts: 1360 },
  { month: 'May', starts: 1277 },
  { month: 'Jun', starts: 1253 }
];

export const HousingChart = () => {
  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={housingData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
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
            dataKey="starts" 
            stroke="hsl(var(--financial-red))" 
            fill="hsl(var(--financial-red) / 0.2)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};