import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CalculatorResults } from '@/types/calculator';

interface CostChartProps {
  results: CalculatorResults;
  years: number;
}

export function CostChart({ results, years }: CostChartProps) {
  const chartData = Array.from({ length: years + 1 }, (_, i) => ({
    year: i,
    standard: results.standard.initialCost + (results.standard.yearlyCost * i),
    immersion: results.immersion.initialCost + (results.immersion.yearlyCost * i)
  }));

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="year" 
            stroke="#fff"
            tickFormatter={(value) => `Year ${value}`}
          />
          <YAxis 
            stroke="#fff"
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k €`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
            labelStyle={{ color: '#fff' }}
            formatter={(value: number) => [`${value.toFixed(2)} €`, undefined]}
            labelFormatter={(label) => `Year ${label}`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="standard" 
            name="Standard Cooling" 
            stroke="#ef4444" 
            strokeWidth={2}
            dot={{ fill: '#ef4444' }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="immersion" 
            name="Immersion Cooling" 
            stroke="#22c55e" 
            strokeWidth={2}
            dot={{ fill: '#22c55e' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}