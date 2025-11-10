import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function GraficoDoacoes({ dados }) {
    // Função para formatar o valor no eixo Y e no Tooltip
    const formatarValor = (valor) => {
        if (valor >= 1000) {
            return `R$${(valor / 1000).toLocaleString('pt-BR')}k`;
        }
        return `R$${valor.toLocaleString('pt-BR')}`;
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col h-full">
            <h3 className="font-bold text-gray-800 dark:text-white mb-4">Evolução das doações em dinheiro</h3>
            
            {dados && dados.length > 0 ? (
                <div className="w-full flex-grow">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            data={dados}
                            margin={{
                                top: 5,
                                right: 20,
                                left: -10,
                                bottom: 50, // Aumenta o espaço para os rótulos angulados
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                            <XAxis 
                                dataKey="mes"
                                angle={-45}      // Angula os rótulos
                                textAnchor="end" // Alinha o final do texto ao ponto
                                interval={0}     // Garante que todos os meses apareçam
                                tick={{ fill: 'rgb(107 114 128)', fontSize: 12 }}
                                className="dark:fill-gray-400"
                            />
                            <YAxis
                                tickFormatter={formatarValor}
                                tick={{ fill: 'rgb(107 114 128)', fontSize: 12 }}
                                className="dark:fill-gray-400"
                            />
                            <Tooltip
                                formatter={(value) => [formatarValor(value), 'Valor']}
                                contentStyle={{
                                    backgroundColor: 'rgba(30, 41, 59, 0.9)',
                                    borderColor: '#4A5568',
                                    borderRadius: '0.5rem',
                                }}
                                labelStyle={{ color: '#E2E8F0' }}
                            />
                            <Line type="monotone" dataKey="valor" stroke="#10B981" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">Não há dados de doações para exibir.</p>
                </div>
            )}
        </div>
    );
}
