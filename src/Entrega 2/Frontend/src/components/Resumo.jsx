import React from 'react';

export default function Resumo({ totalDinheiro, totalAlimentos, familias }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
        <h3 className="font-bold text-gray-500 dark:text-gray-400">Dinheiro Arrecadado</h3>
        <p className="text-4xl font-extrabold text-green-600 dark:text-green-400 mt-2">{totalDinheiro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
        <h3 className="font-bold text-gray-500 dark:text-gray-400">Total de Itens em Estoque</h3>
        <p className="text-4xl font-extrabold text-green-600 dark:text-green-400 mt-2">{totalAlimentos}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
        <h3 className="font-bold text-gray-500 dark:text-gray-400">Famílias Atendidas</h3>
        <p className="text-4xl font-extrabold text-green-600 dark:text-green-400 mt-2">{familias}</p>
      </div>
    </div>
  );
}