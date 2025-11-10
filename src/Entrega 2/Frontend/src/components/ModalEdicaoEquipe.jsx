import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';

// Função para formatar o número de telefone
const formatarTelefone = (valor) => {
    if (!valor) return "";
    valor = String(valor).replace(/\D/g, '').slice(0, 11);
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d{5})(\d{4})$/, '$1-$2');
    return valor;
};

export default function ModalEdicaoEquipe({ equipeParaEditar, onClose }) {
    const { atualizarEquipe } = useData();

    const [nome, setNome] = useState('');
    const [mentorNome, setMentorNome] = useState('');
    const [mentorRa, setMentorRa] = useState('');
    const [mentorEmail, setMentorEmail] = useState('');
    const [mentorTelefone, setMentorTelefone] = useState('');

    useEffect(() => {
        if (equipeParaEditar) {
            {/* Lendo as propriedades em minúsculas (ex: mentornome) 
                que vêm do backend (PostgreSQL). */}
            setNome(equipeParaEditar.nome || '');
            setMentorNome(equipeParaEditar.mentornome || '');
            setMentorRa(equipeParaEditar.mentorra || '');
            setMentorEmail(equipeParaEditar.mentoremail || '');
            // Formata o telefone ao carregar os dados
            setMentorTelefone(formatarTelefone(equipeParaEditar.mentortelefone));
        }
    }, [equipeParaEditar]);

    const handleTelefoneChange = (e) => {
        // Formata o telefone enquanto o usuário digita
        setMentorTelefone(formatarTelefone(e.target.value));
    };

    const handleRaChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 8) setMentorRa(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validações antes de submeter
        if (String(mentorRa).length !== 8) {
            alert('O RA do mentor deve ter exatamente 8 dígitos.');
            return;
        }
        if (!mentorEmail.toLowerCase().includes('@')) {
            alert('Por favor, insira um email válido para o mentor.');
            return;
        }

        const dadosAtualizados = {
            nome,
            mentorNome,
            mentorRa,
            mentorEmail,
            mentorTelefone: mentorTelefone.replace(/\D/g, ''), // Envia apenas os números para o backend
        };
        atualizarEquipe(equipeParaEditar.equipe_id, dadosAtualizados);
        onClose();
    };

    if (!equipeParaEditar) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Editar Equipe</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome da Equipe</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                            className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                        <h3 className="font-semibold text-gray-700 dark:text-gray-200">Dados do Mentor</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome completo do Mentor</label>
                            <input
                                type="text"
                                value={mentorNome}
                                onChange={(e) => setMentorNome(e.target.value)}
                                required
                                className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">RA (8 dígitos)</label>
                                <input
                                    type="text"
                                    value={mentorRa}
                                    onChange={handleRaChange}
                                    required
                                    className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefone</label>
                                <input
                                    type="text"
                                    value={mentorTelefone}
                                    onChange={handleTelefoneChange}
                                    maxLength="15"
                                    required
                                    className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                        </div>
                        <div>
                            {/* ▼▼▼ ERRO DE DIGITAÇÃO CORRIGIDO AQUI ▼▼▼ */}
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email do Mentor</label>
                            <input
                                type="email"
                                value={mentorEmail}
                                onChange={(e) => setMentorEmail(e.target.value)}
                                required
                                className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500">
                            Cancelar
                        </button>
                        <button type="submit" className="bg-green-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-green-700">
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}