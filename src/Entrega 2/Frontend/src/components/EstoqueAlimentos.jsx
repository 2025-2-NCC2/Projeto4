import React from 'react';
import { useData } from '../context/DataContext';
import BotaoExportar from './BotaoExportar';

export default function EstoqueAlimentos({ limiteEstoqueBaixo }) {
    const { estoque } = useData();

    // Ordena o estoque alfabeticamente pelo nome do item
    const estoqueOrdenado = [...(estoque || [])].sort((a, b) => a.item.localeCompare(b.item));

    const dadosParaExportar = estoqueOrdenado.map(item => ({
        Item: item.item,
        Categoria: item.categoria,
        Quantidade: item.qtd,
    }));

    return (
        // ▼▼▼ CORREÇÃO APLICADA AQUI: A classe 'h-full' foi removida ▼▼▼
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
                <h2 className="font-bold text-gray-800 dark:text-white">Estoque de Alimentos</h2>
                <BotaoExportar dados={dadosParaExportar} nomeFicheiro="estoque_alimentos" />
            </div>

            <div className="space-y-4">
                {/* Cabeçalho da Tabela (visível apenas em desktop) */}
                <div className="hidden md:grid grid-cols-6 gap-4 px-4 py-2 text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold border-b dark:border-gray-700">
                    <div className="col-span-3">Item</div>
                    <div className="col-span-2">Categoria</div>
                    <div className="col-span-1 text-right">Qtd</div>
                </div>

                {/* Lista de Itens */}
                {estoqueOrdenado.length > 0 ? (
                    estoqueOrdenado.map((item, index) => (
                        <div key={index} className="border-b dark:border-gray-700 pb-4 md:pb-0 md:border-none">
                            <div className="md:grid md:grid-cols-6 md:gap-4 md:items-center p-4 md:p-0 md:px-4 md:py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
                                
                                {/* Layout para Mobile (Cartão) */}
                                <div className="md:hidden">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold text-gray-800 dark:text-gray-200">{item.item}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.categoria}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {item.qtd <= limiteEstoqueBaixo && (
                                                <span className="w-3 h-3 bg-red-500 rounded-full" title="Estoque baixo"></span>
                                            )}
                                            <p className="font-bold text-lg text-right text-gray-800 dark:text-gray-200">
                                                {item.qtd}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Layout para Desktop (Linha da Tabela) */}
                                <div className="hidden md:contents">
                                    <div className="col-span-3 font-medium text-gray-800 dark:text-gray-200">{item.item}</div>
                                    <div className="col-span-2 text-gray-600 dark:text-gray-400">{item.categoria}</div>
                                    <div className="col-span-1 text-right font-semibold text-gray-800 dark:text-gray-200 flex justify-end items-center gap-2">
                                        {item.qtd <= limiteEstoqueBaixo && (
                                            <span className="w-2.5 h-2.5 bg-red-500 rounded-full" title="Estoque baixo"></span>
                                        )}
                                        {item.qtd}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                        Nenhum item em estoque.
                    </div>
                )}
            </div>
        </div>
    );
}

