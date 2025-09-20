import React from 'react';
import { useData } from '../context/DataContext';

const ProgressBar = ({ value, max }) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
      <div 
        className="bg-green-500 h-2.5 rounded-full" 
        style={{ width: `${percentage > 100 ? 100 : percentage}%` }}
      ></div>
    </div>
  );
};

export default function ProgressoCampanha({ campanha }) {
  const { historicoDoacoes } = useData();

  // Se o objeto da campanha não for válido, não renderiza nada para evitar erros.
  if (!campanha) {
    return null;
  }

  // Calcula os dias restantes de forma segura
  const hoje = new Date();
  const dataTermino = new Date(campanha.data_termino);
  const diffTime = Math.max(0, dataTermino - hoje);
  const diasRestantes = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Calcula o progresso da campanha usando o ID para precisão
  const doacoesDaCampanha = (historicoDoacoes || []).filter(d => d.campanha_id === campanha.campanha_id);
  const totalDinheiroArrecadado = doacoesDaCampanha.reduce((acc, d) => acc + parseFloat(d.valor || 0), 0);
  const totalItensArrecadados = doacoesDaCampanha.reduce((acc, d) => acc + parseInt(d.quantidade || 0), 0);
  
  // CORREÇÃO: Usa os nomes corretos (snake_case) e valores padrão para evitar erros.
  const metaDinheiro = parseFloat(campanha.meta_dinheiro) || 0;
  const metaItens = parseInt(campanha.meta_itens, 10) || 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">{campanha.nome}</h2>
          <p className="text-sm text-green-600 dark:text-green-400 font-semibold">Campanha Ativa</p>
        </div>
        <div className="mt-2 md:mt-0 text-right">
          <p className="font-bold text-3xl text-gray-800 dark:text-white">{diasRestantes}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">dias restantes</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Progresso Dinheiro */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700 dark:text-gray-300">Progresso (R$)</span>
            <span className="text-gray-500 dark:text-gray-400">
              {totalDinheiroArrecadado.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} / {metaDinheiro.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
            </span>
          </div>
          <ProgressBar value={totalDinheiroArrecadado} max={metaDinheiro} />
        </div>

        {/* Progresso Itens */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700 dark:text-gray-300">Progresso (Itens)</span>
            <span className="text-gray-500 dark:text-gray-400">{totalItensArrecadados} / {metaItens}</span>
          </div>
          <ProgressBar value={totalItensArrecadados} max={metaItens} />
        </div>
      </div>
    </div>
  );
}
