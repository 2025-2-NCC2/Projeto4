import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { ALIMENTOS_PREDEFINIDOS, NOMES_ITENS } from '../config/constants';

const LinhaItem = ({ linha, onUpdate, onRemove }) => {
  const categoria = ALIMENTOS_PREDEFINIDOS[linha.item]?.categoria || '';
  return (
    <div className="grid grid-cols-12 gap-2 items-center">
      <div className="col-span-6"><select value={linha.item} onChange={(e) => onUpdate(linha.id, 'item', e.target.value)} className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700">{NOMES_ITENS.map(nome => <option key={nome} value={nome}>{nome}</option>)}</select></div>
      <div className="col-span-3"><input type="text" value={categoria} readOnly className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-600 text-gray-500" /></div>
      <div className="col-span-2"><input type="number" value={linha.qtd} onChange={(e) => onUpdate(linha.id, 'qtd', e.target.value)} min="1" required className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700" /></div>
      <div className="col-span-1"><button type="button" onClick={() => onRemove(linha.id)} className="text-red-500 hover:text-red-700 p-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button></div>
    </div>
  );
};

export default function RegistroAlimentos({ equipeFixa = null }) {
  const { equipes, familias, handleRegistroAlimento, campanhas } = useData();
  const [tipo, setTipo] = useState('entrada');
  const [equipe, setEquipe] = useState(equipeFixa || '');
  const [destino, setDestino] = useState('');
  const [notaFiscal, setNotaFiscal] = useState(null);
  const [campanhaId, setCampanhaId] = useState('');

  const [linhasDeItens, setLinhasDeItens] = useState([{ id: Date.now(), item: NOMES_ITENS[0], qtd: 1 }]);

  const campanhasAtivas = useMemo(() => {
    return campanhas.filter(c => new Date(c.data_termino) >= new Date());
  }, [campanhas]);

  const adicionarLinha = () => setLinhasDeItens([...linhasDeItens, { id: Date.now(), item: NOMES_ITENS[0], qtd: 1 }]);
  const removerLinha = (id) => { if (linhasDeItens.length > 1) setLinhasDeItens(linhasDeItens.filter(linha => linha.id !== id)); };
  const atualizarLinha = (id, campo, valor) => setLinhasDeItens(linhasDeItens.map(linha => linha.id === id ? { ...linha, [campo]: valor } : linha));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tipo === 'entrada') {
      if (!equipe) {
        alert('Por favor, selecione a equipe responsável.');
        return;
      }
      linhasDeItens.forEach(linha => {
        const dados = { tipo: 'entrada', item: linha.item, qtd: parseInt(linha.qtd), equipe, notaFiscal, campanha_id: campanhaId || null };
        handleRegistroAlimento(dados);
      });
    } else {
      if (!destino) { alert('Família de destino é obrigatória.'); return; }
      linhasDeItens.forEach(linha => {
        const dados = { tipo: 'saida', item: linha.item, qtd: parseInt(linha.qtd), destino };
        handleRegistroAlimento(dados);
      });
    }
    setLinhasDeItens([{ id: Date.now(), item: NOMES_ITENS[0], qtd: 1 }]);
    setDestino(''); setNotaFiscal(null); setCampanhaId('');
    if (!equipeFixa) setEquipe('');
    if (document.getElementById('nota-fiscal-input')) document.getElementById('nota-fiscal-input').value = '';
  };

  return (
    // CORREÇÃO: Adicionado o estilo de "cartão" para consistência visual.
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="font-bold mb-4 text-gray-800 dark:text-white">Registrar Entrada/Saída de Alimentos</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset><legend className="text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de Registo</legend><div className="mt-2 flex items-center gap-6"><div className="flex items-center"><input id="entrada" name="tipo" type="radio" value="entrada" checked={tipo === 'entrada'} onChange={() => setTipo('entrada')} className="h-4 w-4 text-green-600" /><label htmlFor="entrada" className="ml-2 block text-sm">Entrada</label></div><div className="flex items-center"><input id="saida" name="tipo" type="radio" value="saida" checked={tipo === 'saida'} onChange={() => setTipo('saida')} className="h-4 w-4 text-red-600" /><label htmlFor="saida" className="ml-2 block text-sm">Saída</label></div></div></fieldset>
        
        {tipo === 'entrada' && (
          <div className="space-y-4 p-4 border rounded-lg">
            {!equipeFixa && (
              <div><label htmlFor="alimento-equipe" className="block text-sm font-medium">Equipe Responsável</label><select id="alimento-equipe" value={equipe} onChange={(e) => setEquipe(e.target.value)} required className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700"><option value="">Selecione</option>{equipes.map(e => <option key={e.nome} value={e.nome}>{e.nome}</option>)}</select></div>
            )}
            
            {campanhasAtivas.length > 0 && (
              <div>
                <label htmlFor="alimento-campanha" className="block text-sm font-medium">Associar à Campanha (Opcional)</label>
                <select id="alimento-campanha" value={campanhaId} onChange={e => setCampanhaId(e.target.value)} className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700">
                  <option value="">Nenhuma</option>
                  {campanhasAtivas.map(c => (
                    <option key={c.campanha_id} value={c.campanha_id}>{c.nome}</option>
                  ))}
                </select>
              </div>
            )}
            
            <div>
              <label htmlFor="nota-fiscal-input" className="block text-sm font-medium">Nota Fiscal (Opcional)</label>
              <input type="file" id="nota-fiscal-input" onChange={(e) => setNotaFiscal(e.target.files[0])} className="mt-1 w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-green-50 dark:file:bg-green-900/40 file:text-green-700 dark:file:text-green-300 hover:file:bg-green-100" />
            </div>
          </div>
        )}

        {tipo === 'saida' && (<div className="p-4 border rounded-lg"><label htmlFor="alimento-destino" className="block text-sm font-medium">Família de Destino</label><select id="alimento-destino" value={destino} onChange={(e) => setDestino(e.target.value)} required className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700"><option value="">Selecione o destino</option>{familias.map(f => <option key={f.nome} value={f.nome}>{f.nome} ({f.regiao})</option>)}</select></div>)}

        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
            <div className="col-span-6">Item</div>
            <div className="col-span-3">Categoria</div>
            <div className="col-span-2">Qtd</div>
          </div>
          {linhasDeItens.map(linha => (
            <LinhaItem key={linha.id} linha={linha} onUpdate={atualizarLinha} onRemove={removerLinha} />
          ))}
        </div>
        
        <button
          type="button"
          onClick={adicionarLinha}
          className="w-full text-sm text-green-600 dark:text-green-400 font-semibold border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg py-2 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          + Adicionar mais um item
        </button>

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}

