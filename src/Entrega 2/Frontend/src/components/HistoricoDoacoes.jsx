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

// Função para formatar o valor monetário
const formatarValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor || 0);
};

export default function HistoricoDoacoes() {
    const { historicoFinanceiro } = useData();

    const dadosParaExportar = (historicoFinanceiro || []).map(doacao => ({
        Data: formatarData(doacao.data),
        Valor: formatarValor(doacao.valor),
        Equipe: doacao.equipe,
        Doador: doacao.doador || 'Anônimo',
        Modo: doacao.modo,
        Campanha: doacao.campanha_nome || 'N/A',
    }));

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
                <h2 className="font-bold text-gray-800 dark:text-white">Histórico de Doações (Dinheiro)</h2>
                <BotaoExportar dados={dadosParaExportar} nomeFicheiro="historico_doacoes_dinheiro" />
            </div>

            <div className="space-y-4">
                {/* Cabeçalho da Tabela (visível apenas em desktop) */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold border-b dark:border-gray-700">
                    <div className="col-span-2">Data</div>
                    <div className="col-span-3">Equipe</div>
                    <div className="col-span-2">Doador</div>
                    <div className="col-span-2">Modo</div>
                    <div className="col-span-3 text-right">Valor</div>
                </div>

                {/* Lista de Doações */}
                {(historicoFinanceiro && historicoFinanceiro.length > 0) ? (
                    historicoFinanceiro.map((doacao) => (
                        <div key={doacao.doacao_id} className="border-b dark:border-gray-700 last:border-b-0">
                            <div className="md:grid md:grid-cols-12 md:gap-4 md:items-center p-4 md:p-0 md:px-4 md:py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
                                
                                {/* Layout para Mobile (Cartão) */}
                                <div className="md:hidden text-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="font-bold text-gray-800 dark:text-gray-200">{doacao.equipe}</p>
                                        <p className="font-bold text-lg text-right text-green-600 dark:text-green-400">{formatarValor(doacao.valor)}</p>
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400 space-y-1">
                                       <p><span className="font-semibold text-gray-500 dark:text-gray-500">Data:</span> {formatarData(doacao.data)}</p>
                                       <p><span className="font-semibold text-gray-500 dark:text-gray-500">Doador:</span> {doacao.doador || 'Anônimo'}</p>
                                       <p><span className="font-semibold text-gray-500 dark:text-gray-500">Modo:</span> {doacao.modo}</p>
                                       {doacao.campanha_nome && <p><span className="font-semibold text-gray-500 dark:text-gray-500">Campanha:</span> {doacao.campanha_nome}</p>}
                                    </div>
                                </div>

                                {/* Layout para Desktop (Linha da Tabela) */}
                                <div className="hidden md:contents">
                                    <div className="col-span-2 text-gray-600 dark:text-gray-400">{formatarData(doacao.data)}</div>
                                    <div className="col-span-3 font-medium text-gray-800 dark:text-gray-200">{doacao.equipe}</div>
                                    <div className="col-span-2 text-gray-600 dark:text-gray-400">{doacao.doador || 'Anônimo'}</div>
                                    <div className="col-span-2 text-gray-600 dark:text-gray-400">{doacao.modo}</div>
                                    <div className="col-span-3 text-right font-semibold text-green-600 dark:text-green-400">{formatarValor(doacao.valor)}</div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                        Nenhuma doação em dinheiro registrada ainda.
                    </div>
                )}
            </div>
        </div>
    );
}

