import React from 'react';
import { useData } from '../context/DataContext';

export default function HistoricoDoacoes() {
  // CORREÇÃO: Usa 'historicoFinanceiro' que contém apenas doações em dinheiro.
  const { historicoFinanceiro } = useData();

  // Garante que o valor a ser formatado é sempre um número.
  const formatarValor = (valor) => {
    const numero = parseFloat(valor);
    if (isNaN(numero)) {
      return (0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="font-bold mb-4 text-gray-800 dark:text-white">Histórico de Doações (Dinheiro)</h2>
      <div className="overflow-x-auto max-h-96">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3">Data</th>
              <th scope="col" className="px-6 py-3">Equipe</th>
              <th scope="col" className="px-6 py-3">Doador</th>
              <th scope="col" className="px-6 py-3">Modo</th>
              <th scope="col" className="px-6 py-3 text-right">Valor</th>
            </tr>
          </thead>
          <tbody>
            {historicoFinanceiro.length > 0 ? (
              historicoFinanceiro.map((doacao, index) => (
                <tr key={doacao.doacao_id || index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">{new Date(doacao.data).toLocaleDateString('pt-BR')}</td>
                  <td className="px-6 py-4">{doacao.equipe || 'N/A'}</td>
                  <td className="px-6 py-4">{doacao.doador || 'Anônimo'}</td>
                  <td className="px-6 py-4">{doacao.modo || 'N/A'}</td>
                  <td className="px-6 py-4 text-right font-medium text-green-600 dark:text-green-400">
                    {/* A função 'formatarValor' previne o erro de 'toLocaleString' */}
                    {formatarValor(doacao.valor)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">Nenhuma doação em dinheiro registrada.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
