import React, { useState } from 'react';
import { useData } from '../context/DataContext';

export default function CadastroCampanha() {
  const { adicionarCampanha } = useData();
  const [nome, setNome] = useState('');
  const [dataTermino, setDataTermino] = useState('');
  const [metaDinheiro, setMetaDinheiro] = useState(0);
  const [metaItens, setMetaItens] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !dataTermino) {
      alert("Por favor, preencha o nome e a data de término.");
      return;
    }
    
    // CORREÇÃO: Assegura que os valores numéricos são enviados corretamente.
    const campanha = { 
      nome, 
      dataTermino, 
      metaDinheiro: parseFloat(metaDinheiro) || 0, 
      metaItens: parseInt(metaItens, 10) || 0 
    };

    adicionarCampanha(campanha);
    setNome(''); 
    setDataTermino(''); 
    setMetaDinheiro(0); 
    setMetaItens(0);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="font-bold mb-4 text-gray-800 dark:text-white">Criar Nova Campanha</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="campanha-nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome da Campanha</label>
          <input type="text" id="campanha-nome" value={nome} onChange={(e) => setNome(e.target.value)} required className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
        </div>
        <div>
          <label htmlFor="campanha-data" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Data de Término</label>
          <input type="date" id="campanha-data" value={dataTermino} onChange={(e) => setDataTermino(e.target.value)} required className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="campanha-meta-dinheiro" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Meta (R$)</label>
            <input type="number" id="campanha-meta-dinheiro" value={metaDinheiro} onChange={(e) => setMetaDinheiro(e.target.value)} min="0" required className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label htmlFor="campanha-meta-itens" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Meta (Itens)</label>
            <input type="number" id="campanha-meta-itens" value={metaItens} onChange={(e) => setMetaItens(e.target.value)} min="0" required className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
        </div>
        <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700">
          Criar Campanha
        </button>
      </form>
    </div>
  );
}
