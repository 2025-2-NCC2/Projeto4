import React, { useMemo } from 'react';
import { useData } from '../context/DataContext';

// Função para formatar valores monetários
const formatarValor = (valor) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor || 0);

// Componente para a barra de progresso
const ProgressBar = ({ valor, meta }) => {
    const percentagem = meta > 0 ? (valor / meta) * 100 : 0;
    return (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${percentagem > 100 ? 100 : percentagem}%` }}></div>
        </div>
    );
};

export default function ProgressoCampanha({ campanha }) {
    const { historicoDoacoes } = useData();

    // Calcula os dias restantes
    const diasRestantes = useMemo(() => {
        if (!campanha?.data_termino) return 0;
        const hoje = new Date();
        const dataFim = new Date(campanha.data_termino);
        const diffTime = dataFim - hoje;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    }, [campanha]);

    // Calcula o progresso financeiro e de itens da campanha
    const progresso = useMemo(() => {
        const doacoesDaCampanha = (historicoDoacoes || []).filter(d => d.campanha_id === campanha.campanha_id);
        const totalDinheiro = doacoesDaCampanha.reduce((acc, d) => acc + parseFloat(d.valor || 0), 0);
        const totalItens = doacoesDaCampanha.reduce((acc, d) => acc + parseInt(d.quantidade || 0), 0);
        return { totalDinheiro, totalItens };
    }, [historicoDoacoes, campanha]);

    if (!campanha) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">Nenhuma campanha ativa no momento.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                {/* --- LADO ESQUERDO: DIAS RESTANTES --- */}
                {/* ▼▼▼ CORREÇÃO APLICADA AQUI ▼▼▼ */}
                <div className="flex flex-col items-center justify-center text-center md:w-1/4">
                    <p className="font-bold text-xl text-gray-800 dark:text-gray-200">{campanha.nome}</p>
                    <p className="text-sm font-semibold text-green-600 dark:text-green-400">Campanha Ativa</p>
                    <p className="text-6xl font-bold text-gray-800 dark:text-gray-100 my-2">{diasRestantes}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 -mt-1">dias restantes</p>
                </div>

                {/* --- LADO DIREITO: BARRAS DE PROGRESSO --- */}
                <div className="w-full md:w-3/4 space-y-4">
                    {/* Progresso Financeiro */}
                    <div>
                        <div className="flex justify-between items-end mb-1 text-sm">
                            <span className="font-semibold text-gray-700 dark:text-gray-300">Progresso (R$)</span>
                            <span className="text-gray-500 dark:text-gray-400">{formatarValor(progresso.totalDinheiro)} / {formatarValor(campanha.meta_dinheiro)}</span>
                        </div>
                        <ProgressBar valor={progresso.totalDinheiro} meta={campanha.meta_dinheiro} />
                    </div>
                    {/* Progresso de Itens */}
                    <div>
                        <div className="flex justify-between items-end mb-1 text-sm">
                            <span className="font-semibold text-gray-700 dark:text-gray-300">Progresso (Itens)</span>
                            <span className="text-gray-500 dark:text-gray-400">{progresso.totalItens.toLocaleString('pt-BR')} / {parseInt(campanha.meta_itens).toLocaleString('pt-BR')}</span>
                        </div>
                        <ProgressBar valor={progresso.totalItens} meta={campanha.meta_itens} />
                    </div>
                </div>

            </div>
        </div>
    );
}
