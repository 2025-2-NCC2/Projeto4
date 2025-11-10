import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useData } from '../context/DataContext';

export default function GraficoRegioes() {
    const { familias } = useData();

    // Agrupa e conta o número de famílias por região
    const data = useMemo(() => {
        if (!familias || familias.length === 0) {
            return [];
        }

        const contagemPorRegiao = familias.reduce((acc, familia) => {
            const regiao = familia.regiao || 'Não definida';
            acc[regiao] = (acc[regiao] || 0) + 1;
            return acc;
        }, {});

        return Object.keys(contagemPorRegiao).map(regiao => ({
            name: regiao,
            Famílias: contagemPorRegiao[regiao],
        }));
    }, [familias]);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col h-full">
            <h3 className="font-bold text-gray-800 dark:text-white mb-4">Famílias Atendidas por Região</h3>
            
            {data.length > 0 ? (
                <div className="w-full flex-grow">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={data}
                            margin={{
                                top: 5,
                                right: 20,
                                left: -10, // Ajuste para aproximar o eixo Y
                                bottom: 50, // Aumenta o espaço inferior para os rótulos angulados
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                            <XAxis 
                                dataKey="name" 
                                angle={-45}       // Angula os rótulos
                                textAnchor="end"  // Alinha o final do texto ao ponto
                                interval={0}      // Garante que todos os rótulos apareçam
                                tick={{ fill: 'rgb(107 114 128)', fontSize: 12 }}
                                className="dark:fill-gray-400"
                            />
                            <YAxis 
                                allowDecimals={false}
                                tick={{ fill: 'rgb(107 114 128)', fontSize: 12 }}
                                className="dark:fill-gray-400"
                            />
                            <Tooltip
                                cursor={{ fill: 'rgba(110, 231, 183, 0.1)' }}
                                contentStyle={{
                                    backgroundColor: 'rgba(30, 41, 59, 0.9)',
                                    borderColor: '#4A5568',
                                    borderRadius: '0.5rem',
                                }}
                                labelStyle={{ color: '#E2E8F0' }}
                            />
                            <Bar dataKey="Famílias" fill="#10B981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">Não há dados de famílias para exibir.</p>
                </div>
            )}
        </div>
    );
}
