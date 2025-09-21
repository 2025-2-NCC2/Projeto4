import React from 'react';
import { useData } from '../context/DataContext';
import BotaoExportar from './BotaoExportar';

export default function EstoqueAlimentos({ limiteEstoqueBaixo }) {
  const { estoque } = useData();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-800 dark:text-white">Estoque de Alimentos</h2>
        <BotaoExportar dados={estoque} nomeFicheiro="estoque_alimentos" />
      </div>
      <div className="overflow-x-auto max-h-80">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">Item</th>
              <th scope="col" className="px-6 py-3">Categoria</th>
              <th scope="col" className="px-6 py-3 text-right">Qtd</th>
            </tr>
          </thead>
          <tbody>
            {estoque.length === 0 ? (
              <tr className="bg-white dark:bg-gray-800"><td colSpan="3" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">O estoque está vazio.</td></tr>
            ) : (
              estoque.map((alimento, i) => (
                <tr key={i} className={`border-b dark:border-gray-700 ${alimento.qtd <= limiteEstoqueBaixo ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'bg-white dark:bg-gray-800'}`}>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{alimento.item}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{alimento.categoria}</td>
                  <td className="px-6 py-4 font-bold text-right">{alimento.qtd}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

