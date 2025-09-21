import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';

export default function GraficoRegioes() {
  const { familias } = useData();
  const { theme } = useTheme();

  const dadosAgrupados = familias.reduce((acc, familia) => {
    const regiao = familia.regiao;
    if (!acc[regiao]) {
      acc[regiao] = 0;
    }
    acc[regiao]++;
    return acc;
  }, {});

  const dadosGrafico = Object.keys(dadosAgrupados).map(key => ({
    name: key.replace("Zona ", ""),
    value: dadosAgrupados[key]
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="font-bold mb-4 text-gray-800 dark:text-white">Famílias Atendidas por Região</h2>
      <ResponsiveContainer width="100%" height={300}>
        {dadosGrafico.length > 0 ? (
          <BarChart data={dadosGrafico}>
             <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? "#4A5568" : "#E2E8F0"} />
             <XAxis dataKey="name" stroke={theme === 'dark' ? "#A0AEC0" : "#4A5568"} />
             <YAxis stroke={theme === 'dark' ? "#A0AEC0" : "#4A5568"} />
             <Tooltip cursor={{fill: theme === 'dark' ? 'rgba(113, 128, 150, 0.3)' : 'rgba(237, 242, 247, 0.7)'}} contentStyle={{ backgroundColor: theme === 'dark' ? '#374151' : '#ffffff', borderColor: theme === 'dark' ? '#4b5563' : '#e5e7eb'}}/>
             <Bar dataKey="value" fill="#00C49F" radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            Nenhuma família cadastada para exibir.
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
}