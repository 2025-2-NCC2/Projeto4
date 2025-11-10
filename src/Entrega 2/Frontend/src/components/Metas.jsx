import React from 'react';

// Função para formatar o valor monetário
const formatarValor = (valor, unidade) => {
    if (unidade === 'R$') {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor || 0);
    }
    return (valor || 0).toLocaleString('pt-BR');
};

export default function Metas({ titulo, valorAtual, meta, unidade }) {
    const percentagem = meta > 0 ? (valorAtual / meta) * 100 : 0;
    const percentagemFormatada = percentagem.toFixed(1).replace('.', ',') + '%';

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col h-full">
            <h3 className="font-bold text-gray-800 dark:text-white mb-4">{titulo}</h3>
            
            {/* ▼▼▼ CORREÇÃO APLICADA AQUI ▼▼▼ */}
            {/* Layout responsivo para os valores */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mb-2">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 whitespace-nowrap">
                    {formatarValor(valorAtual, unidade)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    Meta: {formatarValor(meta, unidade)}
                </p>
            </div>

            {/* Barra de Progresso */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 my-2">
                <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: `${percentagem > 100 ? 100 : percentagem}%` }}
                ></div>
            </div>

            {/* Percentagem */}
            <div className="text-right text-sm font-semibold text-gray-500 dark:text-gray-400">
                {percentagemFormatada}
            </div>
        </div>
    );
}
