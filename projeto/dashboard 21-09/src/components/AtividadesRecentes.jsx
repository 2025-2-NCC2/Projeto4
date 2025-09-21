import React from 'react';
import { useData } from '../context/DataContext';

export default function AtividadesRecentes() {
  const { atividades } = useData();
  return (
    // CORREÇÃO: Adicionadas classes para que o cartão ocupe a altura total.
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-full h-full flex flex-col">
      <h2 className="font-bold mb-4 text-gray-800 dark:text-white">Atividades Recentes</h2>
      <div className="space-y-4 overflow-y-auto flex-grow">
        {atividades.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">Nenhuma atividade registrada ainda.</p>
        ) : (
          atividades.map((atividade, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`mt-1 w-3 h-3 rounded-full ${atividade.tipo === 'entrada' ? 'bg-green-500' : atividade.tipo === 'saida' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{atividade.descricao}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{atividade.data}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
