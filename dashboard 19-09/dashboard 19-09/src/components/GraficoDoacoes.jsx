import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-700 p-2 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg">
        <p className="font-bold text-gray-800 dark:text-white">{label}</p>
        <p className="text-sm text-green-600 dark:text-green-400">{`Valor: ${payload[0].value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}</p>
      </div>
    );
  }
  return null;
};

export default function GraficoDoacoes({ dados }) {
  const { theme } = useTheme();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4">
      <h2 className="font-bold mb-2 text-gray-800 dark:text-white">Evolução das doações em dinheiro</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={dados} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? "#4A5568" : "#E2E8F0"} />
          <XAxis dataKey="mes" stroke={theme === 'dark' ? "#A0AEC0" : "#4A5568"} />
          <YAxis stroke={theme === 'dark' ? "#A0AEC0" : "#4A5568"} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="valor" stroke="#16a34a" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}