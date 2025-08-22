import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const yieldData = [
  { maturity: '3M', yield: 5.1 },
  { maturity: '6M', yield: 4.9 },
  { maturity: '1Y', yield: 4.7 },
  { maturity: '2Y', yield: 4.4 },
  { maturity: '5Y', yield: 4.1 },
  { maturity: '10Y', yield: 4.2 },
  { maturity: '30Y', yield: 4.4 }
];

export const YieldCurveChart = () => {
  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={yieldData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
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