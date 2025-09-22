import React from 'react';
import { useData } from '../context/DataContext';

export default function MuralAvisos() {
  const { avisos } = useData();

  const formatarData = (dataString) => {
    if (!dataString) return 'Data inválida';
    const data = new Date(dataString);
    if (isNaN(data.getTime())) {
      return 'Data inválida';
    }
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    // CORREÇÃO: Adicionadas classes para que o cartão ocupe a altura total.
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-full h-full flex flex-col">
      <h2 className="font-bold mb-4 text-gray-800 dark:text-white">Mural de Avisos</h2>
      <div className="space-y-4 overflow-y-auto flex-grow">
        {avisos.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">Nenhum aviso publicado.</p>
        ) : (
          avisos.map((aviso, i) => (
            <div key={aviso.aviso_id || i} className="border-b border-gray-100 dark:border-gray-700 pb-3 last:border-b-0">
              <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{aviso.mensagem}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {formatarData(aviso.data_publicacao)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

