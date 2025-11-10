import React from 'react';
import { useData } from '../context/DataContext';
import BotaoExportar from './BotaoExportar';

export default function ListaFamilias() {
    const { familias } = useData();

    // Ordena as famílias alfabeticamente pelo nome
    const familiasOrdenadas = [...(familias || [])].sort((a, b) => a.nome.localeCompare(b.nome));

    const dadosParaExportar = familiasOrdenadas.map(familia => ({
        Nome_da_Familia: familia.nome,
        Regiao: familia.regiao,
    }));

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
                <h2 className="font-bold text-gray-800 dark:text-white">Famílias Cadastradas</h2>
                <BotaoExportar dados={dadosParaExportar} nomeFicheiro="lista_familias" />
            </div>

            <div className="space-y-4">
                {/* Cabeçalho da Tabela (visível apenas em desktop) */}
                <div className="hidden md:grid grid-cols-2 gap-4 px-4 py-2 text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold border-b dark:border-gray-700">
                    <div className="col-span-1">Nome da Família</div>
                    <div className="col-span-1">Região</div>
                </div>

                {/* Lista de Famílias */}
                {familiasOrdenadas.length > 0 ? (
                    familiasOrdenadas.map((familia) => (
                        <div key={familia.familia_id} className="border-b dark:border-gray-700 last:border-b-0">
                            <div className="md:grid md:grid-cols-2 md:gap-4 md:items-center p-4 md:p-0 md:px-4 md:py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
                                
                                {/* Layout para Mobile (Cartão) */}
                                <div className="md:hidden text-sm">
                                    <div className="flex justify-between items-start">
                                        <p className="font-bold text-gray-800 dark:text-gray-200">{familia.nome}</p>
                                        <p className="font-semibold text-right text-gray-600 dark:text-gray-400">{familia.regiao}</p>
                                    </div>
                                </div>

                                {/* Layout para Desktop (Linha da Tabela) */}
                                <div className="hidden md:contents">
                                    <div className="col-span-1 font-medium text-gray-800 dark:text-gray-200">{familia.nome}</div>
                                    <div className="col-span-1 text-gray-600 dark:text-gray-400">{familia.regiao}</div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                        Nenhuma família cadastrada ainda.
                    </div>
                )}
            </div>
        </div>
    );
}
