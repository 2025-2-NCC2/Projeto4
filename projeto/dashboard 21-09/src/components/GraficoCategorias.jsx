import React, { useMemo, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A239EA', '#E67E22'];

export default function GraficoCategorias() {
  const { estoque } = useData();
  const { theme } = useTheme();

  useEffect(() => {
    console.log('[GraficoCategorias] estoque recebido:', estoque);
  }, [estoque]);

  const dadosGrafico = useMemo(() => {
    const agrupado = (estoque || []).reduce((acc, item) => {
      const categoria = item.categoria || 'Sem categoria';
      const qtd = Number(item.quantidade ?? item.qtd ?? 0);
      if (!acc[categoria]) acc[categoria] = 0;
      acc[categoria] += qtd;
      return acc;
    }, {});
    return Object.entries(agrupado)
      .map(([name, value]) => ({ name, value }))
      .filter(d => d.value > 0);
  }, [estoque]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="font-bold mb-4 text-gray-800 dark:text-white">Distribuição do Estoque por Categoria</h2>
      <ResponsiveContainer width="100%" height={300}>
        {dadosGrafico.length > 0 ? (
          <PieChart>
            <Pie
              data={dadosGrafico}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={90}
              dataKey="value"
              nameKey="name"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {dadosGrafico.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                borderColor: theme === 'dark' ? '#4b5563' : '#e5e7eb'
              }}
            />
            <Legend wrapperStyle={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}/>
          </PieChart>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            Não há dados de estoque para exibir.
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
}
