import React from 'react';
import { useData } from '../context/DataContext';
import BotaoExportar from './BotaoExportar';

const formatarTelefone = (num) => {
  if (!num) return '';
  const cleaned = ('' + num).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return num;
};

export default function ListaIntegrantes({ equipeEspecifica = null }) {
  const { equipes, alunos } = useData();
  
  const dadosParaExportar = alunos.map(aluno => ({
    equipe: aluno.equipe,
    nome_do_aluno: aluno.nome,
    ra: aluno.ra,
    email: aluno.email,
    telefone: formatarTelefone(aluno.telefone)
  }));
  
  const equipesParaExibir = equipeEspecifica ? equipes.filter(e => e.nome === equipeEspecifica) : equipes;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-800 dark:text-white">Integrantes por Equipe</h2>
        <BotaoExportar dados={dadosParaExportar} nomeFicheiro="lista_integrantes" />
      </div>

      {/* CORREÇÃO 1: Removido 'max-h-[400px]' e 'overflow-y-auto' para tirar a barra de rolagem. */}
      {/* CORREÇÃO 2: Estrutura alterada para uma única tabela para garantir o alinhamento. */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase">
            {/* Define larguras relativas para as colunas para ajudar no alinhamento */}
            <tr>
              <th className="py-2 pr-4 w-1/3">Nome</th>
              <th className="py-2 pr-4 w-1/3">RA</th>
              <th className="py-2 w-1/3">Contato</th>
            </tr>
          </thead>
          <tbody>
            {equipesParaExibir.map(equipe => {
              const integrantesDaEquipe = alunos.filter(a => a.equipe === equipe.nome);
              return (
                // Usa React.Fragment para agrupar as linhas de cada equipe
                <React.Fragment key={equipe.nome}>
                  {/* Linha de Cabeçalho da Equipe */}
                  <tr className="bg-gray-100 dark:bg-gray-700/50">
                    <td colSpan="3" className="pt-4 pb-2 px-2">
                      <h3 className="font-semibold text-lg text-green-700 dark:text-green-400">{equipe.nome}</h3>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <p><b>Mentor(a):</b> {equipe.mentorNome} (RA: {equipe.mentorRa})</p>
                        <p><b>Contato:</b> {equipe.mentorEmail} | {formatarTelefone(equipe.mentorTelefone)}</p>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Linhas dos Integrantes */}
                  {integrantesDaEquipe.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="py-2 px-2 text-sm text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
                        Nenhum aluno cadastrado nesta equipe.
                      </td>
                    </tr>
                  ) : (
                    integrantesDaEquipe.map((aluno, i) => (
                      <tr key={aluno.aluno_id || i} className="border-b dark:border-gray-700">
                        <td className="py-2 pr-4 pl-2 font-medium text-gray-800 dark:text-gray-200">{aluno.nome}</td>
                        <td className="py-2 pr-4 text-gray-600 dark:text-gray-400">{aluno.ra}</td>
                        <td className="py-2 text-gray-600 dark:text-gray-400">
                          <div>{aluno.email}</div>
                          <div>{formatarTelefone(aluno.telefone)}</div>
                        </td>
                      </tr>
                    ))
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
