import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { REGIOES_SP } from '../config/constants';

export default function CadastroFamilia() {
  const { cadastrarFamilia } = useData();
  const [nome, setNome] = useState('');
  const [regiao, setRegiao] = useState(REGIOES_SP[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome.trim()) return;
    cadastrarFamilia({ nome, regiao });
    setNome('');
    setRegiao(REGIOES_SP[0]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="font-bold mb-4 text-gray-800 dark:text-white">Cadastrar Nova Família</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="familia-nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome da Família (Ex: Família Silva)</label>
          <input type="text" id="familia-nome" value={nome} onChange={(e) => setNome(e.target.value)} required className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
        </div>
        <div>
          <label htmlFor="familia-regiao" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Região (SP)</label>
          <select id="familia-regiao" value={regiao} onChange={(e) => setRegiao(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            {REGIOES_SP.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700">
          Cadastrar Família
        </button>
      </form>
    </div>
  );
}