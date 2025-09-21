import React from 'react';

export default function Metas({ titulo, valorAtual, meta, unidade }) {
  const valorNumerico = Number(valorAtual) || 0;
  const metaNumerica = Number(meta) || 0;
  const progresso = metaNumerica > 0 ? (valorNumerico / metaNumerica) * 100 : 0;
  
  const valorFormatado = unidade === 'R$' 
    ? valorNumerico.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 
    : valorNumerico.toLocaleString('pt-BR');
    
  const metaFormatada = unidade === 'R$' 
    ? metaNumerica.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 
    : metaNumerica.toLocaleString('pt-BR');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="font-bold text-gray-800 dark:text-white">{titulo}</h2>
      <div className="flex justify-between items-end mt-2">
        <span className="text-3xl font-bold text-green-600 dark:text-green-400">{valorFormatado}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">Meta: {metaFormatada}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-4">
        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progresso > 100 ? 100 : progresso}%` }}></div>
      </div>
      <p className="text-right text-sm font-semibold mt-1 text-gray-600 dark:text-gray-300">{progresso.toFixed(1)}%</p>
    </div>
  );
}
