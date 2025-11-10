import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import BotaoExportar from './BotaoExportar';
import ModalEdicaoAluno from './ModalEdicaoAluno';
import ModalEdicaoEquipe from './ModalEdicaoEquipe';

// --- Ícones SVG ---
const EditIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
);
const TrashIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);

// --- Componente Principal ---
const formatarTelefone = (num) => {
  if (!num) return 'N/A';
  const cleaned = ('' + num).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return cleaned;
};

export default function ListaIntegrantes({ equipeEspecifica = null }) {
  const { equipes, alunos, excluirAluno, excluirEquipe } = useData();
  
  const [modalAlunoAberto, setModalAlunoAberto] = useState(false);
  const [alunoEmEdicao, setAlunoEmEdicao] = useState(null);

  const [modalEquipeAberto, setModalEquipeAberto] = useState(false);
  const [equipeEmEdicao, setEquipeEmEdicao] = useState(null);

  const handleAbrirModalAluno = (aluno) => {
    setAlunoEmEdicao(aluno);
    setModalAlunoAberto(true);
  };

  const handleFecharModalAluno = () => {
    setModalAlunoAberto(false);
    setAlunoEmEdicao(null);
  };

  const handleAbrirModalEquipe = (equipe) => {
    setEquipeEmEdicao(equipe);
    setModalEquipeAberto(true);
  };

  const handleFecharModalEquipe = () => {
    setModalEquipeAberto(false);
    setEquipeEmEdicao(null);
  };
  
  const dadosParaExportar = alunos.map(aluno => ({
    equipe: aluno.equipe,
    nome_do_aluno: aluno.nome,
    ra: aluno.ra,
    email: aluno.email,
    telefone: formatarTelefone(aluno.telefone)
  }));
  
  const equipesParaExibir = equipeEspecifica ? equipes.filter(e => e.nome === equipeEspecifica) : equipes;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-800 dark:text-white">Integrantes por Equipe</h2>
        <BotaoExportar dados={dadosParaExportar} nomeFicheiro="lista_integrantes" />
      </div>

      <div className="space-y-6">
        {equipesParaExibir.map(equipe => {
          const integrantesDaEquipe = alunos.filter(a => a.equipe === equipe.nome);
          return (
            <div key={equipe.equipe_id} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              {/* Cabeçalho da Equipe */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center w-full">
                  <div>
                    <h3 className="font-semibold text-lg text-green-700 dark:text-green-400">{equipe.nome}</h3>
                    
                    {/* ▼▼▼ CÓDIGO CORRIGIDO ABAIXO ▼▼▼ */}
                    {/* As propriedades foram alteradas para minúsculas (ex: equipe.mentornome) 
                        para corresponder à resposta do driver 'pg' do PostgreSQL. */}
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 space-y-1">
                      <p><span className="font-bold">Mentor(a):</span> {equipe.mentornome}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        <p><span className="font-bold">RA:</span> {equipe.mentorra}</p>
                        <p><span className="font-bold">Telefone:</span> {formatarTelefone(equipe.mentortelefone)}</p>
                        <p><span className="font-bold">Email:</span> {equipe.mentoremail}</p>
                      </div>
                    </div>
                    {/* ▲▲▲ CÓDIGO CORRIGIDO ACIMA ▲▲▲ */}

                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleAbrirModalEquipe(equipe)} className="p-2 rounded-full text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors" title="Editar Equipe"><EditIcon /></button>
                    <button onClick={() => excluirEquipe(equipe.equipe_id)} className="p-2 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-gray-700 transition-colors" title="Excluir Equipe"><TrashIcon /></button>
                  </div>
                </div>
              </div>

              {/* Cabeçalho da Lista de Integrantes (visível apenas em desktop) */}
              <div className="hidden md:grid grid-cols-10 gap-4 px-4 py-2 text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
                <div className="col-span-3">Nome</div>
                <div className="col-span-2">RA</div>
                <div className="col-span-3">Contato</div>
                <div className="col-span-2 text-center">Ações</div>
              </div>

              {/* Lista de Integrantes */}
              <div>
                {integrantesDaEquipe.length === 0 ? (
                  <p className="px-4 py-4 text-sm text-center text-gray-500 dark:text-gray-400">
                    Nenhum integrante cadastrado nesta equipe.
                  </p>
                ) : (
                  integrantesDaEquipe.map((aluno, i) => (
                    <div key={aluno.aluno_id || i} className="border-t dark:border-gray-700 px-4 py-3 md:grid md:grid-cols-10 md:gap-4 md:items-center">
                      
                      {/* Layout para Mobile */}
                      <div className="md:hidden">
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-bold text-gray-800 dark:text-gray-200">{aluno.nome}</p>
                          <div className="flex-shrink-0">
                            <button onClick={() => handleAbrirModalAluno(aluno)} className="text-blue-500 hover:text-blue-700 font-semibold text-sm mr-3">Editar</button>
                            <button onClick={() => excluirAluno(aluno.aluno_id)} className="text-red-500 hover:text-red-700 font-semibold text-sm">Excluir</button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                           <p><span className="font-semibold text-gray-500 dark:text-gray-500">RA:</span> {aluno.ra}</p>
                           <p><span className="font-semibold text-gray-500 dark:text-gray-500 break-all">Email:</span> {aluno.email}</p>
                           <p><span className="font-semibold text-gray-500 dark:text-gray-500">Tel:</span> {formatarTelefone(aluno.telefone)}</p>
                        </div>
                      </div>

                      {/* Layout para Desktop */}
                      <div className="hidden md:contents">
                        <div className="col-span-3 font-medium text-gray-800 dark:text-gray-200">{aluno.nome}</div>
                        <div className="col-span-2 text-gray-600 dark:text-gray-400">{aluno.ra}</div>
                        <div className="col-span-3 text-gray-600 dark:text-gray-400 break-all">
                          <div>{aluno.email}</div>
                          <div>{formatarTelefone(aluno.telefone)}</div>
                        </div>
                        <div className="col-span-2 text-center">
                          <button onClick={() => handleAbrirModalAluno(aluno)} className="text-blue-500 hover:text-blue-700 font-semibold mr-3">Editar</button>
                          <button onClick={() => excluirAluno(aluno.aluno_id)} className="text-red-500 hover:text-red-700 font-semibold">Excluir</button>
                        </div>
                      </div>

                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {modalAlunoAberto && <ModalEdicaoAluno alunoParaEditar={alunoEmEdicao} onClose={handleFecharModalAluno} />}
      {modalEquipeAberto && <ModalEdicaoEquipe equipeParaEditar={equipeEmEdicao} onClose={handleFecharModalEquipe} />}
    </div>
  );
}