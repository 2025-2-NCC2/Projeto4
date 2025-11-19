import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import ThemeToggle from './ThemeToggle';
import { useNavigate } from 'react-router-dom'; // Importa o useNavigate

// --- Ícones SVG como Componentes ---
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
);
const AdminIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const VoluntarioIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
);
const UserIconInput = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

// --- Componente Principal ---
export default function TelaLogin() {
    const { login, register } = useData();
    const navigate = useNavigate(); // Hook para navegação
    const [step, setStep] = useState('profile_selection');
    const [profile, setProfile] = useState(null);
    const [action, setAction] = useState('login');
    const [nomeGestor, setNomeGestor] = useState('');
    const [email, setEmail] = useState('');
    const [nomeEquipe, setNomeEquipe] = useState('');
    const [senha, setSenha] = useState('');
    const [mentorNome, setMentorNome] = useState('');
    const [mentorRa, setMentorRa] = useState('');
    const [mentorTelefone, setMentorTelefone] = useState('');
    const [mentorEmail, setMentorEmail] = useState('');
    const [error, setError] = useState('');

    const labelStyle = "block text-sm font-medium text-gray-700 dark:text-gray-300";
    const inputWithIconStyle = "w-full pl-10 pr-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500";
    const inputStyle = "mt-1 w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500";

    const handleProfileSelect = (selectedProfile) => {
        setProfile(selectedProfile);
        setStep('form');
        setAction('login');
    };

    const handleBack = () => {
        setError(''); setNomeGestor(''); setEmail(''); setNomeEquipe('');
        setSenha(''); setMentorNome(''); setMentorRa(''); setMentorTelefone('');
        setMentorEmail(''); setStep('profile_selection'); setProfile(null);
    };

    const handleRaChange = (e, setter) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 8) setter(value);
    };

    const formatarTelefone = (valor) => {
        if (!valor) return "";
        valor = valor.replace(/\D/g, '').slice(0, 11);
        valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
        valor = valor.replace(/(\d{5})(\d{4})$/, '$1-$2');
        return valor;
    };

    const handleTelefoneChange = (e, setter) => {
        setter(formatarTelefone(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        let result;
        if (action === 'login') {
            const credentials = profile === 'gestor' ? { email, senha } : { nomeEquipe, senha };
            result = await login(profile, credentials);
            if (result && result.success) {
                navigate('/dashboard'); // Navega para o dashboard após o login
            }
        } else {
            const data = profile === 'gestor'
                ? { nome: nomeGestor, email, senha }
                : { nome: nomeEquipe, senha, mentorNome, mentorRa, mentorTelefone: mentorTelefone.replace(/\D/g, ''), mentorEmail };
            result = await register(profile, data);
            if (result?.success) setAction('login');
        }
        if (result && !result.success) setError(result.message);
    };

    const handleTopLeftBackClick = () => {
        // ▼▼▼ LÓGICA DE NAVEGAÇÃO CORRIGIDA ▼▼▼
        if (step === 'profile_selection') {
            navigate('/'); // Volta para a página inicial
        } else {
            handleBack(); // Volta para a seleção de perfil
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col items-center justify-center p-4 relative transition-colors duration-300">
            
            <div className="hidden md:block w-full max-w-4xl text-center mb-10">
                <div className="absolute top-6 left-6">
                    <button onClick={handleTopLeftBackClick} className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-2 rounded-full shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300" aria-label="Voltar">
                        <ArrowLeftIcon />
                    </button>
                </div>
                <div className="absolute top-6 right-6">
                    <ThemeToggle />
                </div>
                <h1 className="text-4xl font-bold text-green-600 dark:text-green-400">Dashboard - Lideranças Empáticas</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {step === 'profile_selection' ? 'Bem-vindo(a)! Por favor, selecione o seu tipo de acesso.' : 'Insira as suas credenciais para continuar.'}
                </p>
            </div>

            <div className="w-full max-w-4xl md:hidden">
                <header className="flex items-center justify-between gap-4 mb-10">
                    <button onClick={handleTopLeftBackClick} className="flex-shrink-0 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-2 rounded-full shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300" aria-label="Voltar">
                        <ArrowLeftIcon />
                    </button>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">Dashboard - Lideranças Empáticas</h1>
                    </div>
                    <div className="flex-shrink-0">
                        <ThemeToggle />
                    </div>
                </header>
                <p className="text-gray-600 dark:text-gray-400 text-center -mt-6 mb-8">
                    {step === 'profile_selection' ? 'Bem-vindo(a)! Selecione seu acesso.' : 'Insira as suas credenciais.'}
                </p>
            </div>

            <div className="w-full max-w-4xl">
                {step === 'profile_selection' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <button onClick={() => handleProfileSelect('gestor')} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="flex justify-center text-green-500 dark:text-green-400"><AdminIcon /></div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">Acesso do Gestor</h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">Visão completa do projeto, acompanhamento de metas, rankings e todos os dados.</p>
                        </button>
                        <button onClick={() => handleProfileSelect('grupo')} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="flex justify-center text-green-500 dark:text-green-400"><VoluntarioIcon /></div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">Acesso de Grupo</h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">Área para registrar doações, cadastrar novos integrantes e acompanhar o progresso.</p>
                        </button>
                    </div>
                ) : (
                    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
                            {action === 'login' ? 'Login de' : 'Cadastro de'} <span className="capitalize text-green-600 dark:text-green-400">{profile}</span>
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {profile === 'gestor' && (
                                <>
                                    {action === 'register' && (
                                        <div><label className={labelStyle}>Nome Completo</label><div className="mt-1 relative"><UserIconInput /><input type="text" value={nomeGestor} onChange={e => setNomeGestor(e.target.value)} required className={inputWithIconStyle} /></div></div>
                                    )}
                                    <div><label className={labelStyle}>Email</label><div className="mt-1 relative"><UserIconInput /><input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="gestor@email.com" className={inputWithIconStyle} /></div></div>
                                </>
                            )}
                            {profile === 'grupo' && (
                                <>
                                    <div><label className={labelStyle}>Nome da Equipe</label><div className="mt-1 relative"><UserIconInput /><input type="text" value={nomeEquipe} onChange={e => setNomeEquipe(e.target.value)} required placeholder="Ex: Equipe Esperança" className={inputWithIconStyle} /></div></div>
                                    {action === 'register' && (
                                        <>
                                            <div className="pt-2 mt-4 border-t border-gray-200 dark:border-gray-700"><p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Dados do Mentor</p></div>
                                            <div><label className={labelStyle}>Nome completo do Mentor</label><input type="text" value={mentorNome} onChange={e => setMentorNome(e.target.value)} required className={inputStyle} /></div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div><label className={labelStyle}>RA (8 dígitos)</label><input type="text" value={mentorRa} onChange={(e) => handleRaChange(e, setMentorRa)} required className={inputStyle} /></div>
                                                <div><label className={labelStyle}>Telefone</label><input type="text" value={mentorTelefone} onChange={(e) => handleTelefoneChange(e, setMentorTelefone)} maxLength="15" required className={inputStyle} /></div>
                                            </div>
                                            <div><label className={labelStyle}>Email do Mentor</label><input type="email" value={mentorEmail} onChange={e => setMentorEmail(e.target.value)} required className={inputStyle} /></div>
                                        </>
                                    )}
                                </>
                            )}
                            <div><label className={labelStyle}>Senha</label><div className="mt-1 relative"><LockIcon /><input type="password" value={senha} onChange={e => setSenha(e.target.value)} required className={inputWithIconStyle} /></div></div>
                            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm"><p>{error}</p></div>}
                            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">{action === 'login' ? 'Entrar' : 'Criar Conta'}</button>
                            <p className="text-center text-sm text-gray-500 dark:text-gray-400">{action === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?'} <button type="button" onClick={() => {setAction(action === 'login' ? 'register' : 'login'); setError('')}} className="font-semibold text-green-600 hover:underline ml-1">{action === 'login' ? 'Cadastre-se' : 'Entrar'}</button></p>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

