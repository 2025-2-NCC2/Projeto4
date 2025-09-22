import React, { useState } from 'react';
import { useData } from '../context/DataContext';

export default function CadastroEquipe() {
  const [nomeEquipe, setNomeEquipe] = useState('');
  const [mentorNome, setMentorNome] = useState('');
  const [mentorRa, setMentorRa] = useState('');
  const [mentorEmail, setMentorEmail] = useState('');
  const [mentorTelefone, setMentorTelefone] = useState('');
  const { cadastrarEquipe } = useData();

  const handleTelefoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    setMentorTelefone(value);
  };
  
  const handleRaChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 8) setMentorRa(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mentorRa.length !== 8) { alert('O RA do mentor deve ter exatamente 8 dígitos.'); return; }
    if (!mentorEmail.toLowerCase().endsWith('.com') && !mentorEmail.toLowerCase().endsWith('.br')) { alert('O email do mentor deve terminar com .com ou .br'); return; }
    
    // CORREÇÃO: As chaves do objeto agora correspondem ao que o backend espera.
    const mentorInfo = {
        mentorNome: mentorNome,
        mentorRa: mentorRa,
        mentorEmail: mentorEmail,
        mentorTelefone: mentorTelefone.replace(/\D/g, '')
    };
    
    // Passa o nome da equipe e o objeto de informações do mentor
    cadastrarEquipe(nomeEquipe, mentorInfo);
    
    // Limpa o formulário após o envio
    setNomeEquipe('');
    setMentorNome('');
    setMentorRa('');
    setMentorEmail('');
    setMentorTelefone('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="font-bold mb-4 text-gray-800 dark:text-white">Cadastrar Nova Equipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="equipe-nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome da Equipe</label>
            <input
              id="equipe-nome" type="text" placeholder="Ex: Equipe Esperança"
              value={nomeEquipe} onChange={(e) => setNomeEquipe(e.target.value)} required
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
        </div>
        <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200">Dados do Mentor</h3>
            <div>
                <label htmlFor="mentor-nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome completo do Mentor</label>
                <input
                  id="mentor-nome" type="text" placeholder="Nome do mentor responsável"
                  value={mentorNome} onChange={(e) => setMentorNome(e.target.value)} required
                  className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="mentor-ra" className="block text-sm font-medium text-gray-700 dark:text-gray-300">RA (8 dígitos)</label>
                    <input id="mentor-ra" type="text" value={mentorRa} onChange={handleRaChange} required
                      className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div>
                    <label htmlFor="mentor-telefone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefone</label>
                    <input id="mentor-telefone" type="text" value={mentorTelefone} onChange={handleTelefoneChange} required
                      className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
            </div>
             <div>
                <label htmlFor="mentor-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email do Mentor</label>
                <input id="mentor-email" type="email" value={mentorEmail} onChange={(e) => setMentorEmail(e.target.value)} required
                  className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
        </div>
        <button type="submit" className="w-full bg-green-600 text-white font-bold px-4 py-3 rounded-lg hover:bg-green-700">
          Cadastrar Equipe
        </button>
      </form>
    </div>
  );
}

