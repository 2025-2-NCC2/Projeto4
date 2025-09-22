import React from 'react';

export default function NavegacaoAbas({ abaAtiva, setAbaAtiva }) {
  const abas = [
    { id: 'visaoGeral', nome: 'Visão Geral' },
    { id: 'estoque', nome: 'Estoque e Saídas' },
    { id: 'financeiro', nome: 'Financeiro' },
    { id: 'equipes', nome: 'Equipes e Voluntários' }, // Corrigido
    { id: 'familias', nome: 'Famílias' },
    { id: 'campanhas', nome: 'Campanhas' },
    { id: 'comunicacao', nome: 'Comunicação' },
  ];

  return (
    <nav className="border-b border-gray-200 dark:border-gray-700 mt-6">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        {abas.map(aba => (
          <li key={aba.id} className="mr-2">
            <button
              onClick={() => setAbaAtiva(aba.id)}
              className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group ${
                abaAtiva === aba.id
                  ? 'text-green-600 border-green-600 dark:text-green-400 dark:border-green-400'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              }`}
            >
              {aba.nome}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}