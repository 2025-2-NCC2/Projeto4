import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';

const FileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;

export default function RegistroAlimentos({ nomeEquipePadrao }) {
    const { equipes, familias, campanhas, handleRegistroAlimento, estoque } = useData();
    
    const [tipoRegistro, setTipoRegistro] = useState('Entrada');
    const [equipeSelecionada, setEquipeSelecionada] = useState(nomeEquipePadrao || '');
    const [familiaSelecionada, setFamiliaSelecionada] = useState('');
    const [campanhaId, setCampanhaId] = useState('');
    const [notaFiscal, setNotaFiscal] = useState(null);
    const [itens, setItens] = useState([{ item: '', qtd: 1 }]);
    
    const isGestorView = !nomeEquipePadrao;
    const itensDeEstoque = useMemo(() => 
        (estoque || []).map(i => i.item).sort((a, b) => a.localeCompare(b))
    , [estoque]);

    const handleItemChange = (index, field, value) => {
        const novosItens = [...itens];
        if (field === 'qtd') {
            const numValue = parseInt(value, 10);
            novosItens[index][field] = isNaN(numValue) ? '' : numValue;
        } else {
            novosItens[index][field] = value;
        }
        setItens(novosItens);
    };

    const adicionarItem = () => setItens([...itens, { item: '', qtd: 1 }]);
    const removerItem = (index) => setItens(itens.filter((_, i) => i !== index));

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) setNotaFiscal(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dadosParaEnviar = {
            tipo: tipoRegistro,
            equipe: tipoRegistro === 'Entrada' ? equipeSelecionada : null,
            destino: tipoRegistro === 'Saida' ? familiaSelecionada : null,
            campanha_id: campanhaId || null,
            notaFiscal, itens,
        };
        await handleRegistroAlimento(dadosParaEnviar);
        
        setTipoRegistro('Entrada');
        if (isGestorView) setEquipeSelecionada('');
        setFamiliaSelecionada(''); setCampanhaId('');
        setNotaFiscal(null); setItens([{ item: '', qtd: 1 }]);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="font-bold mb-4 text-gray-800 dark:text-white">Registrar Entrada/Saída de Alimentos</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de Registro</label>
                    <div className="flex gap-4 mt-1">
                        <label className="flex items-center"><input type="radio" value="Entrada" checked={tipoRegistro === 'Entrada'} onChange={(e) => setTipoRegistro(e.target.value)} className="mr-2 focus:ring-green-500 text-green-600" /> Entrada</label>
                        <label className="flex items-center"><input type="radio" value="Saida" checked={tipoRegistro === 'Saida'} onChange={(e) => setTipoRegistro(e.target.value)} className="mr-2 focus:ring-green-500 text-green-600" /> Saída</label>
                    </div>
                </div>

                {tipoRegistro === 'Entrada' ? (
                    isGestorView && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Equipe Responsável</label>
                            <select value={equipeSelecionada} onChange={(e) => setEquipeSelecionada(e.target.value)} required className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-green-500 focus:border-green-500">
                                <option value="">Selecione</option>
                                {equipes.map(e => <option key={e.equipe_id} value={e.nome}>{e.nome}</option>)}
                            </select>
                        </div>
                    )
                ) : (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Família de Destino</label>
                        <select value={familiaSelecionada} onChange={(e) => setFamiliaSelecionada(e.target.value)} required className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-green-500 focus:border-green-500">
                            <option value="">Selecione</option>
                            {familias.map(f => <option key={f.familia_id} value={f.nome}>{f.nome}</option>)}
                        </select>
                    </div>
                )}
                
                {tipoRegistro === 'Entrada' && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Associar a Campanha (Opcional)</label>
                            <select value={campanhaId} onChange={(e) => setCampanhaId(e.target.value)} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-green-500 focus:border-green-500">
                                <option value="">Nenhuma</option>
                                {(campanhas || []).map(c => <option key={c.campanha_id} value={c.campanha_id}>{c.nome}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nota Fiscal (Opcional)</label>
                            <div className="mt-1 flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Clique para escolher o arquivo</p>
                                    </div>
                                    <input type="file" className="hidden" onChange={handleFileChange} />
                                </label>
                            </div>
                            {notaFiscal && (
                                <div className="mt-2 flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/50 p-2 rounded-md">
                                    <div className="flex items-center gap-2 truncate"><FileIcon/> <span className="truncate">{notaFiscal.name}</span></div>
                                    <button type="button" onClick={() => setNotaFiscal(null)} className="text-red-500 hover:text-red-700 flex-shrink-0"><TrashIcon/></button>
                                </div>
                            )}
                        </div>
                    </>
                )}

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                    {itens.map((item, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-end">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Item</label>
                                <select value={item.item} onChange={(e) => handleItemChange(index, 'item', e.target.value)} required className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-green-500 focus:border-green-500">
                                    <option value="">Selecione um item</option>
                                    {itensDeEstoque.map(nomeItem => <option key={nomeItem} value={nomeItem}>{nomeItem}</option>)}
                                </select>
                            </div>
                            <div className="flex items-end gap-2">
                                <div className="flex-grow">
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Qtd</label>
                                    <input type="number" value={item.qtd} min="1" onChange={(e) => handleItemChange(index, 'qtd', e.target.value)} required className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-green-500 focus:border-green-500" />
                                </div>
                                <button type="button" onClick={() => removerItem(index)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-md mb-0.5">
                                    <TrashIcon/>
                                </button>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={adicionarItem} className="text-sm font-semibold text-green-600 hover:text-green-800">+ Adicionar mais um item</button>
                </div>

                <button type="submit" className="w-full bg-green-600 text-white font-bold px-4 py-3 rounded-lg hover:bg-green-700 transition-colors">Registrar</button>
            </form>
        </div>
    );
}

