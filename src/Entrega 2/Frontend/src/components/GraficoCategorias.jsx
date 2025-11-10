import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useData } from '../context/DataContext';

// Cores para as categorias do gráfico
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919', '#19B2FF'];

export default function GraficoCategorias() {
    const { estoque } = useData();

    // Agrupa e soma os itens do estoque por categoria
    const data = useMemo(() => {
        if (!estoque || estoque.length === 0) {
            return [];
        }
        
        const MapeamentoCategorias = estoque.reduce((acc, item) => {
            const categoria = item.categoria || 'Sem Categoria';
            const quantidade = parseInt(item.qtd, 10) || 0;
            
            if (!acc[categoria]) {
                acc[categoria] = 0;
            }
            acc[categoria] += quantidade;
            
            return acc;
        }, {});

        return Object.keys(MapeamentoCategorias).map(categoria => ({
            name: categoria,
            value: MapeamentoCategorias[categoria],
        })).filter(entry => entry.value > 0); // Mostra apenas categorias com estoque

    }, [estoque]);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col h-full">
            <h3 className="font-bold text-gray-800 dark:text-white mb-4">Distribuição do Estoque por Categoria</h3>
            
            {data.length > 0 ? (
                <div className="w-full flex-grow">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Tooltip
                                formatter={(value) => `${value.toLocaleString('pt-BR')} itens`}
                                contentStyle={{
                                    backgroundColor: 'rgba(30, 41, 59, 0.9)',
                                    borderColor: '#4A5568',
                                    borderRadius: '0.5rem',
                                }}
                                labelStyle={{ color: '#E2E8F0' }}
                            />
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius="80%"
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    
                    {/* Legenda Responsiva Customizada */}
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 text-sm">
                        {data.map((entry, index) => (
                            <div key={`legend-${index}`} className="flex items-center">
                                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                                <span className="text-gray-600 dark:text-gray-400">{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">Não há dados de estoque para exibir.</p>
                </div>
            )}
        </div>
    );
}
