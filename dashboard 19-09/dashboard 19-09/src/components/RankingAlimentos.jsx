import React from 'react';

export default function RankingAlimentos({ equipes = [] }) {
  const equipesOrdenadas = [...equipes].sort((a, b) => (b.itens || 0) - (a.itens || 0));

  return (
    // CORREÇÃO: Adicionadas classes para que o cartão ocupe a altura total.
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-full h-full flex flex-col">
      <h2 className="font-bold mb-4 text-gray-800 dark:text-white">Ranking de Equipes (Alimentos)</h2>
      <div className="space-y-3 flex-grow">
        {equipesOrdenadas.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">Nenhuma equipe para exibir.</p>
        ) : (
          equipesOrdenadas.map((equipe, i) => (
            <div
              key={`${equipe.equipe_id}-${i}`}
              className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-700 py-2 last:border-b-0"
            >
              <span className="text-gray-700 dark:text-gray-300">{i + 1}. {equipe.nome}</span>
              <span className="font-bold text-green-600 dark:text-green-400">
                {equipe.itens || 0} itens
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

