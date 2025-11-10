import React, { useState } from 'react';
import { useData } from '../context/DataContext';

// --- Ícones ---
const FileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;
const UploadIcon = () => <svg className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>;

// --- Componente Principal ---
export default function DoacoesDinheiro({ nomeEquipePadrao }) {
    const MODOS_PAGAMENTO = ['PIX', 'Transferência', 'Dinheiro', 'Cartão de Crédito', 'Cartão de Débito'];
    const { equipes, campanhas, adicionarDoacao } = useData();
    
    const [valor, setValor] = useState('');
    const [data, setData] = useState(new Date().toISOString().split('T')[0]);
    const [equipe, setEquipe] = useState(nomeEquipePadrao || '');
    const [doador, setDoador] = useState('');
    const [modo, setModo] = useState('PIX');
    const [campanhaId, setCampanhaId] = useState('');
    const [comprovante, setComprovante] = useState(null);

    const isGestorView = !nomeEquipePadrao;

    const handleValorChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = (value / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        if (value === '0,00') value = '';
        setValor(value);
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setComprovante(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const valorNumerico = parseFloat(valor.replace(/\./g, '').replace(',', '.'));
        
        const dados = {
            valor: valorNumerico, data, equipe,
            doador: doador || 'Anônimo', modo,
            campanha_id: campanhaId || null, comprovante,
        };
        await adicionarDoacao(dados);

        setValor(''); 
        setData(new Date().toISOString().split('T')[0]);
        if (isGestorView) setEquipe('');
        setDoador(''); 
        setModo('PIX'); 
        setCampanhaId(''); 
        setComprovante(null);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="font-bold mb-4 text-gray-800 dark:text-white">Registrar Doação (Dinheiro)</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Valor (R$)</label>
                        <input type="text" value={valor} onChange={handleValorChange} required placeholder="0,00"
                            className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Data</label>
                        <input type="date" value={data} onChange={(e) => setData(e.target.value)} required
                            className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-green-500 focus:border-green-500" />
                    </div>
                </div>

                {isGestorView && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Equipe Responsável</label>
                        <select value={equipe} onChange={(e) => setEquipe(e.target.value)} required
                            className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-green-500 focus:border-green-500">
                            <option value="">Selecione uma equipe</option>
                            {equipes.map(e => <option key={e.equipe_id} value={e.nome}>{e.nome}</option>)}
                        </select>
                    </div>
                )}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Doador (Opcional)</label>
                    <input type="text" value={doador} onChange={(e) => setDoador(e.target.value)} placeholder="Anônimo"
                        className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-green-500 focus:border-green-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Modo de Pagamento</label>
                    <select value={modo} onChange={(e) => setModo(e.target.value)} required
                        className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-green-500 focus:border-green-500">
                        {MODOS_PAGAMENTO.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Associar a Campanha (Opcional)</label>
                    <select value={campanhaId} onChange={(e) => setCampanhaId(e.target.value)}
                        className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-green-500 focus:border-green-500">
                        <option value="">Nenhuma</option>
                        {campanhas.map(c => <option key={c.campanha_id} value={c.campanha_id}>{c.nome}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Comprovante (Opcional)</label>
                    <div className="mt-1">
                        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center">
                                <UploadIcon />
                                <p className="text-xs text-gray-500 dark:text-gray-400">Clique para escolher o arquivo</p>
                            </div>
                            <input type="file" className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>
                    {comprovante && (
                        <div className="mt-2 flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/50 p-2 rounded-md">
                            <div className="flex items-center gap-2 truncate"><FileIcon /> <span className="truncate">{comprovante.name}</span></div>
                            <button type="button" onClick={() => setComprovante(null)} className="text-red-500 hover:text-red-700 flex-shrink-0"><TrashIcon /></button>
                        </div>
                    )}
                </div>

                <button type="submit" className="w-full bg-green-600 text-white font-bold px-4 py-3 rounded-lg hover:bg-green-700 transition-colors">
                    Registrar Doação
                </button>
            </form>
        </div>
    );
}

