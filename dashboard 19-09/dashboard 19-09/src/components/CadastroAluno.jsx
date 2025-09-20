import React, { useState } from 'react';
import { useData } from '../context/DataContext';

export default function CadastroAluno({ equipeFixa = null }) {
  const { equipes, cadastrarAluno } = useData();
  const [nome, setNome] = useState('');
  const [ra, setRa] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [equipe, setEquipe] = useState(equipeFixa || '');

  const handleTelefoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    setTelefone(value);
  };
  
  const handleRaChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 8) setRa(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ra.length !== 8) { alert('O RA deve ter exatamente 8 dígitos.'); return; }
    if (!email.toLowerCase().endsWith('.com') && !email.toLowerCase().endsWith('.br')) { alert('O email deve terminar com .com ou .br'); return; }
    if (!equipe) { alert('Por favor, selecione uma equipe.'); return; }
    
    cadastrarAluno({ nome, ra, email, telefone: telefone.replace(/\D/g, ''), equipe });
    setNome(''); setRa(''); setEmail(''); setTelefone(''); 
    if (!equipeFixa) setEquipe('');
  };

  return (
    // CORREÇÃO: Adicionado o estilo de "cartão" para consistência visual.
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="font-bold mb-4 text-gray-800 dark:text-white">Cadastrar Integrante</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="aluno-nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome completo</label>
          <input type="text" id="aluno-nome" value={nome} onChange={(e) => setNome(e.target.value)} required className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="aluno-ra" className="block text-sm font-medium text-gray-700 dark:text-gray-300">RA (8 dígitos)</label>
            <input type="text" id="aluno-ra" value={ra} onChange={handleRaChange} required className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label htmlFor="aluno-telefone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefone</label>
            <input type="text" id="aluno-telefone" value={telefone} onChange={handleTelefoneChange} required className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
        </div>
        <div>
          <label htmlFor="aluno-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input type="email" id="aluno-email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" />
        </div>
        {!equipeFixa && (
          <div>
            <label htmlFor="aluno-equipe" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Equipe</label>
            <select id="aluno-equipe" value={equipe} onChange={(e) => setEquipe(e.target.value)} required className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="">Selecione a equipe</option>
              {equipes.map(e => <option key={e.nome} value={e.nome}>{e.nome}</option>)}
            </select>
          </div>
        )}
        <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">Cadastrar</button>
      </form>
    </div>
  );
}
