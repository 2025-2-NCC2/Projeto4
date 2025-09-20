import React, { useState } from 'react';
import DoacoesDinheiro from './DoacoesDinheiro';
import RegistroAlimentos from './RegistroAlimentos';
import CadastroAluno from './CadastroAluno';

const Aba = ({ nome, icone, ativa, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
      ativa
        ? 'border-green-500 text-green-600 dark:border-green-400 dark:text-green-400'
        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
    }`}
  >
    {icone}
    {nome}
  </button>
);

export default function FormularioAcoes({ equipeFixa }) {
  const [aba, setAba] = useState('dinheiro');

  return (
    <div className="w-full">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex justify-center space-x-4" aria-label="Tabs">
          <Aba nome="Dinheiro" icone="💰" ativa={aba === 'dinheiro'} onClick={() => setAba('dinheiro')} />
          <Aba nome="Alimentos" icone="🥫" ativa={aba === 'alimentos'} onClick={() => setAba('alimentos')} />
          <Aba nome="Integrante" icone="👤" ativa={aba === 'integrante'} onClick={() => setAba('integrante')} />
        </nav>
      </div>

      <div className="pt-6">
        {aba === 'dinheiro' && <DoacoesDinheiro equipeFixa={equipeFixa} />}
        {aba === 'alimentos' && <RegistroAlimentos equipeFixa={equipeFixa} />}
        {aba === 'integrante' && <CadastroAluno equipeFixa={equipeFixa} />}
      </div>
    </div>
  );
}
