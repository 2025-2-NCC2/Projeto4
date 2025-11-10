import React, { useState } from 'react';
import DoacoesDinheiro from './DoacoesDinheiro';
import RegistroAlimentos from './RegistroAlimentos';
import CadastroAluno from './CadastroAluno';

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

export default function FormularioAcoes({ equipeFixa }) {
    const [abaAtiva, setAbaAtiva] = useState('dinheiro');
    const [menuAberto, setMenuAberto] = useState(false);

    const abas = [
        { id: 'dinheiro', nome: 'Dinheiro', icon: '💰' },
        { id: 'alimentos', nome: 'Alimentos', icon: '🥫' },
        { id: 'integrante', nome: 'Integrante', icon: '👤' },
    ];

    const handleSelecionarAba = (id) => {
        setAbaAtiva(id);
        setMenuAberto(false);
    };
    
    const abaAtivaNome = abas.find(aba => aba.id === abaAtiva)?.nome;

    return (
        <div>
            {/* ▼▼▼ CORREÇÃO APLICADA AQUI ▼▼▼ */}
            {/* O menu de telemóvel foi isolado num container com posicionamento relativo */}
            <div className="sm:hidden relative mb-4">
                <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Ação: {abaAtivaNome}</span>
                    <button
                        onClick={() => setMenuAberto(!menuAberto)}
                        className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                        aria-label="Abrir menu de ações"
                    >
                        {menuAberto ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>

                {menuAberto && (
                    <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 rounded-b-lg shadow-xl z-20 border dark:border-gray-700">
                        <nav className="flex flex-col p-2">
                            {abas.map((aba) => (
                                <button
                                    key={aba.id}
                                    onClick={() => handleSelecionarAba(aba.id)}
                                    className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-md transition-colors duration-200 ${
                                        abaAtiva === aba.id
                                            ? 'font-bold bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    <span className="text-lg">{aba.icon}</span>
                                    <span>{aba.nome}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                )}
            </div>

            {/* --- NAVEGAÇÃO HORIZONTAL PARA DESKTOP --- */}
            <div className="hidden sm:block border-b border-gray-200 dark:border-gray-700 mb-4">
                <nav className="flex justify-center gap-6 sm:gap-8" aria-label="Tabs">
                    {abas.map((aba) => (
                        <button
                            key={aba.id}
                            onClick={() => setAbaAtiva(aba.id)}
                            className={`flex items-center gap-2 py-3 px-2 text-sm font-semibold transition-colors duration-200 border-b-2 ${
                                abaAtiva === aba.id
                                    ? 'border-green-600 text-green-600 dark:text-green-400'
                                    : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
                            }`}
                        >
                            <span className="text-lg">{aba.icon}</span>
                            <span>{aba.nome}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Conteúdo da aba selecionada */}
            <div className="mt-4">
                {abaAtiva === 'dinheiro' && <DoacoesDinheiro nomeEquipePadrao={equipeFixa} />}
                {abaAtiva === 'alimentos' && <RegistroAlimentos nomeEquipePadrao={equipeFixa} />}
                {abaAtiva === 'integrante' && <CadastroAluno nomeEquipePadrao={equipeFixa} />}
            </div>
        </div>
    );
}

