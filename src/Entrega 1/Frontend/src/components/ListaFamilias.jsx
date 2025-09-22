import React from 'react';
import { useData } from '../context/DataContext';
import BotaoExportar from './BotaoExportar';

export default function ListaFamilias() {
  const { familias } = useData();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-800 dark:text-white">Famílias Cadastradas</h2>
        <BotaoExportar dados={familias} nomeFicheiro="lista_familias" />
      </div>
      <div className="overflow-x-auto max-h-96">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700">
            <tr><th scope="col" className="px-6 py-3">Nome da Família</th><th scope="col" className="px-6 py-3">Região</th></tr>
          </thead>
          <tbody>
            {familias.length === 0 ? (
              <tr className="bg-white dark:bg-gray-800"><td colSpan="2" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">Nenhuma família cadastrada ainda.</td></tr>
            ) : (
              familias.map((familia, i) => (
                <tr key={i} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{familia.nome}</td>
                  <td className="px-6 py-4">{familia.regiao}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}