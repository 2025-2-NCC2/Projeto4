import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

// --- Ícones para o Menu Hambúrguer ---
const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// Esta linha lê a sua variável VITE_API_URL do Netlify
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// --- Função de Formatação ---
const formatarValorMonetario = (valor) => {
    const numero = Number(valor) || 0;
    return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const IntegranteLink = ({ nome, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex h-full items-center justify-center gap-2 text-center text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
  >
    <span className="text-sm font-medium">{nome}</span>
  </a>
);

export default function LandingPage() {
  const [impacto, setImpacto] = useState({ totalFamilias: 0, totalItens: 0, totalDinheiro: 0 });
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const fetchImpacto = async () => {
        try {
            // Chama a API correta do Render
            const response = await fetch(`${API_URL}/public/impact`);
            
            if (response.ok) {
                const data = await response.json();
                
                // Lê as propriedades com maiúsculas,
                // exatamente como a sua API está a enviar
                setImpacto({
                    totalFamilias: data.totalFamilias || 0,
                    totalItens: data.totalItens || 0,
                    totalDinheiro: data.totalDinheiro || 0
                });
            }
        } catch (error) {
            console.error("Erro ao buscar dados de impacto:", error);
        }
    };
    fetchImpacto();
  }, []); // O array vazio garante que isso rode apenas uma vez

  const integrantes = [
    { nome: 'Breno Sales Colaneri', link: 'http://www.linkedin.com/in/breno-sales-colaneri-231b59322' },
    { nome: 'Guilherme Leão Rodrigues', link: 'https://www.linkedin.com/in/guilherme-le%C3%A3o-277053347/' },
    { nome: 'Izabelli Ribeiro Dos Santos', link: 'https://www.linkedin.com/in/izabelliribeiro/' },
    { nome: 'Rafael Chagas Silva', link: 'https://www.linkedin.com/in/rafael-chagas-0648a6349/' },
  ];

  const linksNavegacao = [
      { href: '#inicio', nome: 'Início' },
      { href: '#impacto', nome: 'Nosso Impacto' },
      { href: '#ajudar', nome: 'Como Ajudar' },
      { href: '#sobre', nome: 'Sobre Nós' },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">EmpáTech</div>
          
          <div className="hidden lg:flex items-center space-x-8">
            {linksNavegacao.map(link => (
                <a key={link.href} href={link.href} className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">{link.nome}</a>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-700 transition-colors hidden sm:block"
            >
              Acessar Dashboard
            </Link>
            <ThemeToggle />
            
            <div className="lg:hidden">
                <button onClick={() => setMenuAberto(!menuAberto)} className="p-2 rounded-md text-gray-600 dark:text-gray-300">
                    {menuAberto ? <CloseIcon /> : <MenuIcon />}
                </button>
            </div>
          </div>
        </nav>

        {menuAberto && (
            <div className="lg:hidden bg-white dark:bg-gray-800 pb-4 px-6 absolute w-full shadow-lg animate-fade-in-down">
                <nav className="flex flex-col gap-4">
                    {linksNavegacao.map(link => (
                        <a key={link.href} href={link.href} onClick={() => setMenuAberto(false)} className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 py-2">{link.nome}</a>
                    ))}
                    <Link
                        to="/login"
                        onClick={() => setMenuAberto(false)}
                        className="sm:hidden w-full text-center bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-700 transition-colors mt-2"
                        >
                        Acessar Dashboard
                    </Link>
                </nav>
            </div>
        )}
      </header>

      <main>
        <section id="inicio" className="hero-bg text-white">
          <div className="container mx-auto px-6 py-32 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Conectando Solidariedade e Tecnologia</h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
              Uma plataforma para gerir, organizar e maximizar o impacto do projeto Lideranças Empáticas.
            </p>
            <div className="mt-8">
              <a href="https://liderancasempaticas.com/" target="_blank" rel="noopener noreferrer"
                className="bg-white text-green-600 font-bold py-3 px-6 md:px-8 rounded-full text-base md:text-lg hover:bg-gray-200 transition-colors whitespace-nowrap">
                Conheça o Lideranças Empáticas
              </a>
            </div>
          </div>
        </section>

        <section id="impacto" className="py-20 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Nosso Impacto em Tempo Real</h2>
            <div className="mt-4 w-24 h-1 bg-green-500 mx-auto"></div>
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow">
                <p className="text-4xl lg:text-5xl font-bold text-green-600 dark:text-green-400">{impacto.totalFamilias.toLocaleString('pt-BR')}</p>
                <p className="mt-2 text-gray-600 dark:text-gray-300 font-semibold">Famílias Atendidas</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow">
                <p className="text-4xl lg:text-5xl font-bold text-green-600 dark:text-green-400">{impacto.totalItens.toLocaleString('pt-BR')}</p>
                <p className="mt-2 text-gray-600 dark:text-gray-300 font-semibold">Itens Arrecadados</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow">
                <p className="text-4xl lg:text-5xl font-bold text-green-600 dark:text-green-400 whitespace-nowrap">{formatarValorMonetario(impacto.totalDinheiro)}</p>
                <p className="mt-2 text-gray-600 dark:text-gray-300 font-semibold">Reais Doados</p>
              </div>
            </div>
          </div>
        </section>

        {/* O resto do seu arquivo ... */}
        
        <section id="ajudar" className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Como Você Pode Ajudar</h2>
            <div className="mt-4 w-24 h-1 bg-green-500 mx-auto"></div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-2xl">
                <div className="text-4xl mb-4">🥫</div>
                <h3 className="text-xl font-bold dark:text-white">Doar Alimentos</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">A sua doação de itens não perecíveis é a base para montarmos as cestas básicas que alimentam famílias.</p>
              </div>
              <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-2xl">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold dark:text-white">Doar Dinheiro</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">Recursos financeiros ajudam-nos a comprar itens em falta, cobrir custos de logística e emergências.</p>
              </div>
              <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-2xl">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold dark:text-white">Ser Voluntário</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">Junte-se a uma das nossas equipas e ajude-nos na angariação, organização e distribuição das doações.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="sobre" className="py-20 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">O Nosso Propósito</h2>
            <p className="text-2xl font-semibold text-green-600 dark:text-green-400 mt-2">EmpáTech</p>
            <div className="mt-4 w-24 h-1 bg-green-500 mx-auto"></div>
            <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              O grupo EmpáTech nasceu da união entre empatia e tecnologia. O nosso propósito é desenvolver soluções tecnológicas que sirvam como pontes para a solidariedade, conectando quem deseja ajudar com quem mais precisa.
            </p>
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                Integrantes do Projeto
              </h3>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {integrantes.map(integrante => (
                  <IntegranteLink key={integrante.nome} nome={integrante.nome} link={integrante.link} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 dark:bg-black text-white">
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="text-2xl font-bold">EmpáTech</p>
          <p className="mt-2 text-gray-400">Um projeto académico de Lideranças Empáticas.</p>
          <div className="mt-4"><p>&copy; 2025 EmpáTech. Todos os direitos reservados.</p></div>
        </div>
      </footer>
    </div>
  );
}