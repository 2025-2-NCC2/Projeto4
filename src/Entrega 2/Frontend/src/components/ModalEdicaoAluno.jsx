import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';

export default function ModalEdicaoAluno({ alunoParaEditar, onClose }) {
  const { atualizarAluno } = useData();
  
  const [nome, setNome] = useState('');
  const [ra, setRa] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  // Preenche o formulário quando o modal abre
  useEffect(() => {
    if (alunoParaEditar) {
      setNome(alunoParaEditar.nome);
      setRa(alunoParaEditar.ra);
      setEmail(alunoParaEditar.email);
      // Formata o telefone ao carregar os dados
      setTelefone(formatarTelefone(alunoParaEditar.telefone || ''));
    }
  }, [alunoParaEditar]);

  // Função para formatar o telefone
  const formatarTelefone = (valor) => {
    if (!valor) return "";
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
    return valor;
  };

  // Handler para o campo de telefone
  const handleTelefoneChange = (e) => {
    const valorFormatado = formatarTelefone(e.target.value);
    setTelefone(valorFormatado);
  };

  // Handler para o campo de RA
  const handleRaChange = (e) => {
    const valor = e.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito
    if (valor.length <= 8) {
      setRa(valor);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validações
    if (ra.length !== 8) {
      alert('O RA deve ter exatamente 8 dígitos.');
      return;
    }
    if (!email.toLowerCase().endsWith('.com') && !email.toLowerCase().endsWith('.br')) {
      alert('O email deve terminar com .com ou .br');
      return;
    }
    
    const dadosAtualizados = { 
      nome, 
      ra, 
      email, 
      telefone: telefone.replace(/\D/g, '') // Envia apenas os números
    };

    atualizarAluno(alunoParaEditar.aluno_id, dadosAtualizados);
    onClose(); // Fecha o modal após salvar
  };

  // Impede que o modal feche ao clicar dentro dele
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose} // Fecha o modal ao clicar no fundo
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md"
        onClick={handleModalContentClick}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Editar Integrante</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="edit-aluno-nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome completo</label>
            <input type="text" id="edit-aluno-nome" value={nome} onChange={(e) => setNome(e.target.value)} required className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="edit-aluno-ra" className="block text-sm font-medium text-gray-700 dark:text-gray-300">RA (8 dígitos)</label>
              <input type="text" id="edit-aluno-ra" value={ra} onChange={handleRaChange} required className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700" />
            </div>
            <div>
              <label htmlFor="edit-aluno-telefone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefone</label>
              <input type="text" id="edit-aluno-telefone" value={telefone} onChange={handleTelefoneChange} maxLength="15" required className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700" />
            </div>
          </div>
          <div>
            <label htmlFor="edit-aluno-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input type="email" id="edit-aluno-email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700" />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 font-semibold">
              Cancelar
            </button>
            <button type="submit" className="px-5 py-2.5 rounded-lg text-white bg-green-600 hover:bg-green-700 font-semibold">
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

