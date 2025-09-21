import React, { useMemo } from 'react';
import { useData } from '../context/DataContext';
import ThemeToggle from './ThemeToggle';
import MuralAvisos from './MuralAvisos';
import AtividadesRecentes from './AtividadesRecentes';
import RankingEquipes from './RankingEquipes';
import RankingAlimentos from './RankingAlimentos';
import ListaIntegrantes from './ListaIntegrantes';
import FormularioAcoes from './FormularioAcoes';
import ProgressoCampanha from './ProgressoCampanha';

export default function DashboardGrupo({ onLogout, onNavigateHome, nomeEquipe }) {
  const { equipes, historicoDoacoes, campanhas } = useData();

  const equipesCalculadas = useMemo(() => {
    return (equipes || []).map(equipe => {
      const doacoesDaEquipe = (historicoDoacoes || []).filter(d => d.equipe === equipe.nome);
      const valorTotal = doacoesDaEquipe.reduce((acc, d) => acc + parseFloat(d.valor || 0), 0);
      const itensTotal = doacoesDaEquipe.reduce((acc, d) => acc + parseInt(d.quantidade || 0), 0);
      return { ...equipe, valor: valorTotal, itens: itensTotal };
    });
  }, [historicoDoacoes, equipes]);

  const equipesOrdenadasValor = [...equipesCalculadas].sort((a, b) => b.valor - a.valor);
  const equipesOrdenadasItens = [...equipesCalculadas].sort((a, b) => b.itens - a.itens);

  const campanhaAtiva = useMemo(() => {
    return campanhas.find(c => new Date(c.data_termino) >= new Date());
  }, [campanhas]);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 transition-colors duration-300">
        <header className="flex justify-between items-center mb-6">
            <div>
                <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">Painel do Grupo</h1>
                <p className="text-gray-600 dark:text-gray-400">Bem-vindo(a), <span className="font-semibold">{nomeEquipe}</span>!</p>
            </div>
            <div className="flex items-center gap-4">
                <button onClick={onNavigateHome} className="text-sm text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">Voltar ao Site</button>
                <ThemeToggle />
                <button onClick={onLogout} className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600">Sair</button>
            </div>
        </header>

        <main className="space-y-6">
            {/* Secção Superior: Acompanhamento */}
            <div>
                <h2 className="text-xl font-bold mb-4 dark:text-white">Acompanhamento</h2>
                {/* CORREÇÃO: Adicionada a classe 'items-stretch' para forçar a mesma altura nos cartões */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
                    
                    {campanhaAtiva && (
                      <div className="lg:col-span-4">
                        <ProgressoCampanha campanha={campanhaAtiva} />
                      </div>
                    )}

                    <div className="md:col-span-2 lg:col-span-1 flex"><MuralAvisos /></div>
                    <div className="md:col-span-2 lg:col-span-1 flex"><AtividadesRecentes /></div>
                    <div className="md:col-span-1 lg:col-span-1 flex"><RankingEquipes equipes={equipesOrdenadasValor} /></div>
                    <div className="md:col-span-1 lg:col-span-1 flex"><RankingAlimentos equipes={equipesOrdenadasItens} /></div>
                </div>
            </div>

            {/* Secção Inferior: Ações e Integrantes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold mb-4 dark:text-white">Registrar Ações do Grupo</h2>
                    <FormularioAcoes equipeFixa={nomeEquipe} />
                </div>
                <ListaIntegrantes equipeEspecifica={nomeEquipe} />
            </div>
        </main>
    </div>
  );
}

