import React from 'react';
import { useData } from '../context/DataContext';

const ProgressBar = ({ value, max }) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${percentage > 100 ? 100 : percentage}%` }}></div>
    </div>
  );
};

export default function ListaCampanhas() {
  const { campanhas, historicoDoacoes } = useData();

  const formatarData = (dataString) => {
    if (!dataString) return 'Data Inválida';
    const data = new Date(dataString);
    if (isNaN(data.getTime())) return 'Data Inválida';
    return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="font-bold mb-4 text-gray-800 dark:text-white">Campanhas Ativas e Passadas</h2>
      <div className="space-y-6 overflow-y-auto max-h-[600px]">
        {campanhas.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">Nenhuma campanha criada ainda.</p>
        ) : (
          campanhas.map((campanha, i) => {
            const isAtiva = new Date(campanha.data_termino) >= new Date();
            
            // CORREÇÃO: Filtra as doações pelo ID da campanha para um cálculo preciso.
            const doacoesDaCampanha = (historicoDoacoes || []).filter(d => d.campanha_id === campanha.campanha_id);
            const totalDinheiroArrecadado = doacoesDaCampanha.reduce((acc, d) => acc + parseFloat(d.valor || 0), 0);
            const totalItensArrecadados = doacoesDaCampanha.reduce((acc, d) => acc + parseInt(d.quantidade || 0), 0);

            const metaDinheiro = parseFloat(campanha.meta_dinheiro) || 0;
            const metaItens = parseInt(campanha.meta_itens, 10) || 0;

            return (
              <div key={campanha.campanha_id || i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{campanha.nome}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Termina em: {formatarData(campanha.data_termino)}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${isAtiva ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                    {isAtiva ? 'Ativa' : 'Encerrada'}
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Progresso (R$)</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {totalDinheiroArrecadado.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} / {metaDinheiro.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                      </span>
                    </div>
                    <ProgressBar value={totalDinheiroArrecadado} max={metaDinheiro} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Progresso (Itens)</span>
                      <span className="text-gray-500 dark:text-gray-400">{totalItensArrecadados} / {metaItens}</span>
                    </div>
                    <ProgressBar value={totalItensArrecadados} max={metaItens} />
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  );
}

