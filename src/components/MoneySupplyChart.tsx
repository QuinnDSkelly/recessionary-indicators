import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const moneySupplyData = [
  { month: 'Jan', m2: 2.8 },
  { month: 'Feb', m2: 2.6 },
  { month: 'Mar', m2: 2.2 },
  { month: 'Apr', m2: 1.9 },
  { month: 'May', m2: 1.7 },
  { month: 'Jun', m2: 1.4 }
];

export const MoneySupplyChart = () => {
  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={moneySupplyData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
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
          <Line 
            type="monotone" 
            dataKey="m2" 
            stroke="hsl(var(--financial-green))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--financial-green))', strokeWidth: 0, r: 3 }}
            activeDot={{ r: 4, fill: 'hsl(var(--success))' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};