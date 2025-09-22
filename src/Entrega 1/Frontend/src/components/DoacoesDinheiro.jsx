import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';

export default function DoacoesDinheiro({ equipeFixa = null }) {
  const { equipes, adicionarDoacao, campanhas } = useData();
  const [valor, setValor] = useState('');
  const [data, setData] = useState(new Date().toISOString().split('T')[0]);
  const [doador, setDoador] = useState('');
  const [modo, setModo] = useState('PIX');
  const [equipe, setEquipe] = useState(equipeFixa || '');
  const [campanhaId, setCampanhaId] = useState(''); // Estado para o ID da campanha

  // Filtra apenas as campanhas que ainda não terminaram
  const campanhasAtivas = useMemo(() => {
    return campanhas.filter(c => new Date(c.data_termino) >= new Date());
  }, [campanhas]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!valor || !equipe) {
      alert("Valor e Equipe são obrigatórios.");
      return;
    }
    const doacao = {
      valor: parseFloat(valor),
      data,
      doador,
      modo,
      equipe,
      campanha_id: campanhaId || null // Envia o ID da campanha selecionada
    };
    adicionarDoacao(doacao);
    
    // Limpa o formulário
    setValor(''); 
    setDoador('');
    setCampanhaId('');
    if (!equipeFixa) setEquipe('');
  };

  return (
    // CORREÇÃO: Adicionado o estilo de "cartão" para consistência visual.
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="font-bold mb-4 text-gray-800 dark:text-white">Registrar Doação em Dinheiro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="doacao-data" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Data</label>
            <input type="date" id="doacao-data" value={data} onChange={e => setData(e.target.value)} required className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700" />
          </div>
          <div>
            <label htmlFor="doacao-valor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Valor (R$)</label>
            <input type="number" step="0.01" id="doacao-valor" value={valor} onChange={e => setValor(e.target.value)} required className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700" />
          </div>
        </div>
        <div>
          <label htmlFor="doacao-doador" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Doador (Opcional)</label>
          <input type="text" id="doacao-doador" value={doador} onChange={e => setDoador(e.target.value)} className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700" />
        </div>
        {!equipeFixa && (
          <div>
            <label htmlFor="doacao-equipe" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Equipe</label>
            <select id="doacao-equipe" value={equipe} onChange={e => setEquipe(e.target.value)} required className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700">
              <option value="">Selecione</option>
              {equipes.map(e => <option key={e.nome} value={e.nome}>{e.nome}</option>)}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="doacao-modo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Modo</label>
          <select id="doacao-modo" value={modo} onChange={e => setModo(e.target.value)} className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700">
            <option>PIX</option><option>Dinheiro</option><option>Transferência</option><option>Outro</option>
          </select>
        </div>
        
        {campanhasAtivas.length > 0 && (
          <div>
            <label htmlFor="doacao-campanha" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Associar à Campanha (Opcional)</label>
            <select id="doacao-campanha" value={campanhaId} onChange={e => setCampanhaId(e.target.value)} className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700">
              <option value="">Nenhuma</option>
              {campanhasAtivas.map(c => (
                <option key={c.campanha_id} value={c.campanha_id}>{c.nome}</option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700">Adicionar Doação</button>
      </form>
    </div>
  );
}

