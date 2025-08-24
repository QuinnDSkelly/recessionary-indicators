import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { TimeSeriesData } from '@/services/economicDataService';

interface MoneySupplyChartProps {
  data: TimeSeriesData[];
}

export const MoneySupplyChart = ({ data }: MoneySupplyChartProps) => {
  // Calculate percentage change from previous period
  const changeData = data.map((item, index) => {
    if (index === 0) return { ...item, change: 0 };
    const prevValue = data[index - 1].value;
    const change = ((item.value - prevValue) / prevValue) * 100;
    return { ...item, change };
  });

  // Calculate dynamic domain for better trend visibility
  const values = data.map(d => d.value).filter(v => !isNaN(v));
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue;
  const padding = range * 0.02;

  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={changeData} margin={{ top: 10, right: 15, left: 15, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
            domain={[minValue - padding, maxValue + padding]}
            tickFormatter={(value) => `$${(value / 1000).toFixed(1)}T`}
          />
          <Tooltip 
            formatter={(value: number, name: string) => [
              name === 'value' 
                ? `$${(value / 1000).toFixed(2)} Trillion` 
                : `${value > 0 ? '+' : ''}${value.toFixed(2)}%`,
              name === 'value' ? 'M2 Money Supply' : 'Change from Previous'
            ]}
            labelFormatter={(label) => `${label}`}
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              fontSize: '12px'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="hsl(var(--financial-green))" 
            fill="hsl(var(--financial-green) / 0.2)" 
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="hsl(var(--financial-green))" 
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--financial-green))', strokeWidth: 0, r: 4 }}
            activeDot={{ 
              r: 6, 
              fill: 'hsl(var(--success))',
              strokeWidth: 2,
              stroke: 'hsl(var(--background))'
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};