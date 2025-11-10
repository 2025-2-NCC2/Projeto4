import React, { useState } from 'react';
import { useData } from '../context/DataContext';

export default function CadastroAluno({ nomeEquipePadrao }) {
    const { equipes, cadastrarAluno } = useData();
    
    const [nome, setNome] = useState('');
    const [ra, setRa] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    // Define o estado inicial da equipe com o nome da equipe logada, se existir
    const [equipe, setEquipe] = useState(nomeEquipePadrao || '');

    // Determina se a visão é de gestor (permite selecionar equipe) ou de grupo (equipe fixa)
    const isGestorView = !nomeEquipePadrao;

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
        if (ra.length !== 8) {
            alert('O RA do integrante deve ter exatamente 8 dígitos.');
            return;
        }
        
        const dadosAluno = {
            nome,
            ra,
            email,
            telefone: telefone.replace(/\D/g, ''),
            equipe
        };

        cadastrarAluno(dadosAluno);

        // Limpa o formulário
        setNome('');
        setRa('');
        setEmail('');
        setTelefone('');
        if (isGestorView) setEquipe(''); // Só limpa a equipe na visão do gestor
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            {/* ▼▼▼ TÍTULO ALTERADO CONFORME SOLICITADO ▼▼▼ */}
            <h2 className="font-bold mb-4 text-gray-800 dark:text-white">Cadastrar Integrante</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome completo</label>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required
                        className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-green-500 focus:border-green-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">RA (8 dígitos)</label>
                        <input type="text" value={ra} onChange={handleRaChange} required
                            className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefone</label>
                        <input type="text" value={telefone} onChange={handleTelefoneChange} maxLength="15" required
                            className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-green-500 focus:border-green-500" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                        className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-green-500 focus:border-green-500" />
                </div>

                {/* O campo de seleção de equipe só aparece para o gestor */}
                {isGestorView && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Equipe</label>
                        <select value={equipe} onChange={(e) => setEquipe(e.target.value)} required
                            className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-green-500 focus:border-green-500">
                            <option value="">Selecione a equipe</option>
                            {equipes.map(e => <option key={e.equipe_id} value={e.nome}>{e.nome}</option>)}
                        </select>
                    </div>
                )}
                
                <button type="submit" className="w-full bg-green-600 text-white font-bold px-4 py-3 rounded-lg hover:bg-green-700">
                    Cadastrar
                </button>
            </form>
        </div>
    );
}

