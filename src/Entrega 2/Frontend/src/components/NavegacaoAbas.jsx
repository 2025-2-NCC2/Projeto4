import React, { useState } from 'react';

// --- Ícones ---
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// --- Componente Principal ---
export default function NavegacaoAbas({ abaAtiva, setAbaAtiva }) {
  const [menuAberto, setMenuAberto] = useState(false);

  const abas = [
    { id: 'visaoGeral', nome: 'Visão Geral' },
    { id: 'estoque', nome: 'Estoque e Saídas' },
    { id: 'financeiro', nome: 'Financeiro' },
    { id: 'equipes', nome: 'Equipes e Voluntários' },
    { id: 'familias', nome: 'Famílias' },
    { id: 'campanhas', nome: 'Campanhas' },
    { id: 'comunicacao', nome: 'Comunicação' },
  ];

  const handleSelecionarAba = (id) => {
    setAbaAtiva(id);
    setMenuAberto(false); // Fecha o menu ao selecionar uma nova aba
  };

  const abaAtivaNome = abas.find(aba => aba.id === abaAtiva)?.nome;

  return (
    <div className="relative">
      {/* --- CABEÇALHO PARA MOBILE (MENU HAMBÚRGUER) --- */}
      <div className="md:hidden flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
        <span className="font-semibold text-lg text-gray-700 dark:text-gray-300">{abaAtivaNome}</span>
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Abrir menu"
        >
          {menuAberto ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* --- MENU DROPDOWN PARA MOBILE --- */}
      {menuAberto && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-800 rounded-b-lg shadow-xl z-20 overflow-hidden animate-fade-in-down">
          <nav className="flex flex-col p-2">
            {abas.map((aba) => (
              <button
                key={aba.id}
                onClick={() => handleSelecionarAba(aba.id)}
                className={`w-full text-left px-4 py-3 rounded-md text-base transition-colors duration-200 ${
                  abaAtiva === aba.id
                    ? 'font-bold bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {aba.nome}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* --- NAVEGAÇÃO HORIZONTAL PARA DESKTOP --- */}
      <nav className="hidden md:flex flex-wrap gap-x-8 gap-y-2 border-b border-gray-300 dark:border-gray-700 mb-4">
        {abas.map((aba) => (
          <button
            key={aba.id}
            onClick={() => setAbaAtiva(aba.id)}
            className={`py-3 px-1 text-sm font-semibold transition-colors duration-200 border-b-2 ${
              abaAtiva === aba.id
                ? 'border-green-600 text-green-600 dark:text-green-400'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            {/* ▼▼▼ ALTERAÇÃO FEITA AQUI ▼▼▼ */}
            {aba.nome}
          </button>
        ))}
      </nav>
    </div>
  );
}

