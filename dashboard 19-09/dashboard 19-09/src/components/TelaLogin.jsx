import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

// Ícones e sub-componentes (sem alteração na lógica interna)
const AdminIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> );
const VoluntarioIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg> );
const UserIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> );
const LockIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> );
const ArrowLeftIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> );

const SelecaoPerfil = ({ onSelect }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <button onClick={() => onSelect('gestor')} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-center text-green-500 dark:text-green-400"><AdminIcon /></div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">Acesso do Gestor</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Visão completa do projeto, acompanhamento de metas, rankings e todos os dados.</p>
        </button>
        <button onClick={() => onSelect('grupo')} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-center text-green-500 dark:text-green-400"><VoluntarioIcon /></div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">Acesso de Grupo</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Área para registar doações de alimentos, dinheiro e cadastrar novos integrantes.</p>
        </button>
    </div>
);

const FormularioLogin = ({ perfil, onLogin, onVoltar }) => {
  const { equipes } = useData();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault(); setErro('');
    if (perfil === 'gestor') {
      if (login.toLowerCase() === 'gestor' && senha === 'gestor123') { onLogin({ tipo: 'gestor' }); } else { setErro('Usuário ou senha de gestor inválidos.'); }
    } else if (perfil === 'grupo') {
      const equipeEncontrada = equipes.find(eq => eq.nome.toLowerCase() === login.toLowerCase());
      if (equipeEncontrada && senha === 'grupo123') { onLogin({ tipo: 'grupo', nomeEquipe: equipeEncontrada.nome }); } else { setErro('Nome do grupo ou senha inválidos.'); }
    }
  };
  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-1">Login de <span className="capitalize text-green-600 dark:text-green-400">{perfil}</span></h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-6">Insira as suas credenciais para continuar.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="login" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{perfil === 'gestor' ? 'Usuário' : 'Nome do Grupo'}</label>
          <div className="mt-1 relative"><UserIcon />
            <input id="login" name="login" type="text" required value={login} onChange={(e) => setLogin(e.target.value)} placeholder={perfil === 'gestor' ? 'gestor' : 'Ex: Equipe Esperança'} 
            className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
        </div>
        <div>
          <label htmlFor="senha" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
          <div className="mt-1 relative"><LockIcon />
            <input id="senha" name="senha" type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} 
            className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          {perfil === 'grupo' && <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">A senha padrão para todos os grupos é: <span className="font-semibold">grupo123</span></p>}
        </div>
        {erro && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm"><p>{erro}</p></div>}
        <div className="flex items-center gap-4">
          <button type="button" onClick={onVoltar} className="w-1/3 flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">Voltar</button>
          <button type="submit" className="w-2/3 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">Entrar</button>
        </div>
      </form>
    </div>
  );
};

export default function TelaLogin({ onLogin, onNavigateHome }) {
  const [perfilSelecionado, setPerfilSelecionado] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col items-center justify-center p-4 relative transition-colors duration-300">
      
      <div className="absolute top-4 left-4">
        <button onClick={onNavigateHome} className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-2 rounded-full shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Voltar ao site">
          <ArrowLeftIcon />
        </button>
      </div>

      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-600 dark:text-green-400">Dashboard - Lideranças Empáticas</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {perfilSelecionado ? 'Quase lá!' : 'Bem-vindo(a)! Por favor, selecione o seu tipo de acesso.'}
        </p>
      </div>
      
      {!perfilSelecionado ? (
        <SelecaoPerfil onSelect={setPerfilSelecionado} />
      ) : (
        <FormularioLogin 
          perfil={perfilSelecionado} 
          onLogin={onLogin} 
          onVoltar={() => setPerfilSelecionado(null)} 
        />
      )}
    </div>
  );
}