import React, { useMemo } from 'react';
import { useData } from '../context/DataContext';

// Componente reutilizável para a barra de progresso
const ProgressBar = ({ valor, meta }) => {
    const percentagem = meta > 0 ? (valor / meta) * 100 : 0;
    return (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
                className="bg-green-600 h-2.5 rounded-full" 
                style={{ width: `${percentagem > 100 ? 100 : percentagem}%` }}
            ></div>
        </div>
    );
};

// Componente para um cartão de campanha individual (agora sem o fundo branco principal)
const CampaignCardContent = ({ campanha }) => {
    const { historicoDoacoes } = useData();

    // Calcula o progresso da campanha
    const progresso = useMemo(() => {
        const doacoesDaCampanha = (historicoDoacoes || []).filter(d => d.campanha_id === campanha.campanha_id);
        const totalDinheiro = doacoesDaCampanha.reduce((acc, d) => acc + parseFloat(d.valor || 0), 0);
        const totalItens = doacoesDaCampanha.reduce((acc, d) => acc + parseInt(d.quantidade || 0), 0);
        return { totalDinheiro, totalItens };
    }, [historicoDoacoes, campanha.campanha_id]);

    const isAtiva = new Date(campanha.data_termino) >= new Date();
    const dataTerminoFormatada = new Date(campanha.data_termino).toLocaleDateString('pt-BR');
    const formatarValor = (valor) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor || 0);

    return (
        <>
            {/* Cabeçalho do Cartão */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                <div>
                    <h4 className="font-bold text-lg text-gray-800 dark:text-white">{campanha.nome}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Termina em: {dataTerminoFormatada}</p>
                </div>
                <span className={`mt-2 sm:mt-0 px-3 py-1 text-xs font-semibold rounded-full self-start sm:self-center ${isAtiva ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                    {isAtiva ? 'Ativa' : 'Encerrada'}
                </span>
            </div>

            {/* Barras de Progresso */}
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between items-end mb-1 text-xs sm:text-sm">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Progresso (R$)</span>
                        <span className="text-gray-500 dark:text-gray-400">{formatarValor(progresso.totalDinheiro)} / {formatarValor(campanha.meta_dinheiro)}</span>
                    </div>
                    <ProgressBar valor={progresso.totalDinheiro} meta={campanha.meta_dinheiro} />
                </div>
                <div>
                    <div className="flex justify-between items-end mb-1 text-xs sm:text-sm">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Progresso (Itens)</span>
                        <span className="text-gray-500 dark:text-gray-400">{progresso.totalItens.toLocaleString('pt-BR')} / {parseInt(campanha.meta_itens).toLocaleString('pt-BR')}</span>
                    </div>
                    <ProgressBar valor={progresso.totalItens} meta={campanha.meta_itens} />
                </div>
            </div>
        </>
    );
};

export default function ListaCampanhas() {
    const { campanhas } = useData();

    const campanhasAtivas = (campanhas || []).filter(c => new Date(c.data_termino) >= new Date());
    const campanhasPassadas = (campanhas || []).filter(c => new Date(c.data_termino) < new Date());

    return (
        // ▼▼▼ CORREÇÃO APLICADA AQUI ▼▼▼
        // O container principal agora tem o fundo branco e o título foi movido para dentro dele.
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="font-bold text-gray-800 dark:text-white mb-4 text-xl">Campanhas Ativas e Passadas</h2>
            
            <div className="space-y-6">
                {campanhasAtivas.length > 0 && campanhasAtivas.map(campanha => (
                    <div key={campanha.campanha_id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        <CampaignCardContent campanha={campanha} />
                    </div>
                ))}

                {campanhasPassadas.length > 0 && (
                    <div>
                        <h3 className="font-semibold text-gray-600 dark:text-gray-400 mt-8 mb-4 border-t pt-4 dark:border-gray-700">Campanhas Encerradas</h3>
                        <div className="space-y-4">
                            {campanhasPassadas.map(campanha => (
                                <div key={campanha.campanha_id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                    <CampaignCardContent campanha={campanha} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {(!campanhas || campanhas.length === 0) && (
                     <div className="text-center py-10">
                        <p className="text-gray-500 dark:text-gray-400">Nenhuma campanha cadastrada ainda.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

