import React from 'react';
import { useData } from '../context/DataContext';
import BotaoExportar from './BotaoExportar';

export default function HistoricoSaidas() {
  const { historicoSaidas } = useData();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-800 dark:text-white">Histórico de Saída de Alimentos</h2>
        <BotaoExportar dados={historicoSaidas} nomeFicheiro="historico_saidas" />
      </div>
      <div className="overflow-x-auto max-h-96">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">Data</th>
              <th scope="col" className="px-6 py-3">Item</th>
              <th scope="col" className="px-6 py-3">Qtd</th>
              <th scope="col" className="px-6 py-3">Destino</th>
            </tr>
          </thead>
          <tbody>
            {historicoSaidas.length === 0 ? (
              <tr className="bg-white dark:bg-gray-800"><td colSpan="4" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">Nenhuma saída registrada ainda.</td></tr>
            ) : (
              historicoSaidas.map((saida, i) => (
                <tr key={i} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 py-4">{new Date(saida.data).toLocaleDateString('pt-BR')}</td>
                  <td className="px-6 py-4">{saida.item}</td>
                  <td className="px-6 py-4">{saida.qtd}</td>
                  <td className="px-6 py-4">{saida.destino}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}