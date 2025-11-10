import React, { useState } from 'react';
import { useData } from '../context/DataContext';

export default function CadastroAviso() {
  const { adicionarAviso } = useData();
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mensagem.trim()) return;
    adicionarAviso(mensagem);
    setMensagem('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="font-bold mb-4 text-gray-800 dark:text-white">Publicar Novo Aviso</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="aviso" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mensagem</label>
          <textarea
            id="aviso"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            rows="4"
            className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Escreva o aviso aqui..."
          ></textarea>
        </div>
        <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700">
          Publicar Aviso
        </button>
      </form>
    </div>
  );
}