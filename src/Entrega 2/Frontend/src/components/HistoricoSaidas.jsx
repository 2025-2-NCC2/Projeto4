import React from 'react';
import { useData } from '../context/DataContext';
import BotaoExportar from './BotaoExportar';

// Função para formatar a data
const formatarData = (dataString) => {
    if (!dataString) return 'N/A';
    const data = new Date(dataString);
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(data);
};

export default function HistoricoSaidas() {
    const { historicoSaidas } = useData();

    const dadosParaExportar = (historicoSaidas || []).map(saida => ({
        Data: formatarData(saida.data),
        Item: saida.item,
        Destino: saida.destino,
        Quantidade: saida.qtd,
    }));

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
                <h2 className="font-bold text-gray-800 dark:text-white">Histórico de Saída de Alimentos</h2>
                <BotaoExportar dados={dadosParaExportar} nomeFicheiro="historico_saidas" />
            </div>

            <div className="space-y-4">
                {/* Cabeçalho da Tabela (visível apenas em desktop) */}
                <div className="hidden md:grid grid-cols-10 gap-4 px-4 py-2 text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold border-b dark:border-gray-700">
                    <div className="col-span-2">Data</div>
                    <div className="col-span-4">Item</div>
                    <div className="col-span-3">Destino</div>
                    <div className="col-span-1 text-right">Qtd</div>
                </div>

                {/* Lista de Saídas */}
                {(historicoSaidas && historicoSaidas.length > 0) ? (
                    historicoSaidas.map((saida, index) => (
                        <div key={index} className="border-b dark:border-gray-700 last:border-b-0">
                            <div className="md:grid md:grid-cols-10 md:gap-4 md:items-center p-4 md:p-0 md:px-4 md:py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
                                
                                {/* Layout para Mobile (Cartão) */}
                                <div className="md:hidden text-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="font-bold text-gray-800 dark:text-gray-200">{saida.item}</p>
                                        <p className="font-bold text-lg text-right text-gray-800 dark:text-gray-200">{saida.qtd}</p>
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400 space-y-1">
                                       <p><span className="font-semibold text-gray-500 dark:text-gray-500">Data:</span> {formatarData(saida.data)}</p>
                                       {/* ▼▼▼ LINHA ADICIONADA AQUI ▼▼▼ */}
                                       <p><span className="font-semibold text-gray-500 dark:text-gray-500">Destino:</span> {saida.destino}</p>
                                    </div>
                                </div>

                                {/* Layout para Desktop (Linha da Tabela) */}
                                <div className="hidden md:contents">
                                    <div className="col-span-2 text-gray-600 dark:text-gray-400">{formatarData(saida.data)}</div>
                                    <div className="col-span-4 font-medium text-gray-800 dark:text-gray-200">{saida.item}</div>
                                    <div className="col-span-3 text-gray-600 dark:text-gray-400">{saida.destino}</div>
                                    <div className="col-span-1 text-right font-semibold text-gray-800 dark:text-gray-200">{saida.qtd}</div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                        Nenhuma saída registrada ainda.
                    </div>
                )}
            </div>
        </div>
    );
}

