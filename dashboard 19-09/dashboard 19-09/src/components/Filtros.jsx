import React from 'react';
import { useData } from '../context/DataContext';

export default function Filtros({ filtroMes, setFiltroMes, filtroEquipe, setFiltroEquipe }) {
  const { equipes } = useData();
  const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center gap-4">
      <span className="font-semibold text-gray-700 dark:text-gray-300">Filtros:</span>
      <select value={filtroMes} onChange={e => setFiltroMes(e.target.value)} className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
        <option value="Todos">Todos os Meses</option>
        {meses.map((mes, index) => <option key={index} value={index}>{mes}</option>)}
      </select>
      <select value={filtroEquipe} onChange={e => setFiltroEquipe(e.target.value)} className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
        <option value="Todas">Todas as Equipes</option> {/* Corrigido */}
        {equipes.map(e => <option key={e.nome} value={e.nome}>{e.nome}</option>)}
      </select>
      <button onClick={() => { setFiltroMes("Todos"); setFiltroEquipe("Todas"); }} className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700">Limpar Filtros</button>
    </div>
  );
}