import React from 'react';
import { useData } from '../context/DataContext';
import ThemeToggle from './ThemeToggle';

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

export default function LandingPage({ onAccessDashboard }) {
  const { familias, estoque, historicoDoacoes } = useData();

  // ✅ Garantir que os valores sejam números
  const totalFamilias = familias.length;
  const totalItens = estoque.reduce((acc, item) => acc + Number(item.qtd || 0), 0);
  const totalDinheiro = historicoDoacoes.reduce((acc, doacao) => acc + Number(doacao.valor || 0), 0);

  const integrantes = [
    { nome: 'Breno Sales Colaneri', link: 'http://www.linkedin.com/in/breno-sales-colaneri-231b59322' },
    { nome: 'Guilherme Leão Rodrigues', link: 'https://www.linkedin.com/in/guilherme-le%C3%A3o-277053347/' },
    { nome: 'Izabelli Ribeiro Dos Santos', link: 'https://www.linkedin.com/in/izabelliribeiro/' },
    { nome: 'Rafael Chagas Silva', link: 'https://www.linkedin.com/in/rafael-chagas-0648a6349/' },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">EmpáTech</div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">Início</a>
            <a href="#impacto" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">Nosso Impacto</a>
            <a href="#ajudar" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">Como Ajudar</a>
            <a href="#sobre" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">Sobre Nós</a>
          </div>
          <div className="flex items-center gap-4">
             <button
              onClick={onAccessDashboard}
              className="bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-700 transition-colors"
            >
              Acessar Dashboard
            </button>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero-bg text-white">
          <div className="container mx-auto px-6 py-32 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Conectando Solidariedade e Tecnologia</h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
              Uma plataforma para gerir, organizar e maximizar o impacto do projeto Lideranças Empáticas, que tem como objetivo elevar o aprendizado dos estudantes do 1° semestre dos cursos de ciências econômicas, ciências contábeis e administração da FECAP.
            </p>
            <div className="mt-8">
              <a href="https://liderancasempaticas.com/" target="_blank" rel="noopener noreferrer"
                className="bg-white text-green-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-colors">
                Conheça o Lideranças Empáticas
              </a>
            </div>
          </div>
        </section>

        <section id="impacto" className="py-20 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Nosso Impacto em Tempo Real</h2>
            <div className="mt-4 w-24 h-1 bg-green-500 mx-auto"></div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Famílias Atendidas */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow">
                <p className="text-5xl font-bold text-green-600 dark:text-green-400">
                  {totalFamilias.toLocaleString('pt-BR')}
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-300 font-semibold">
                  Famílias Atendidas
                </p>
              </div>

              {/* Itens Arrecadados */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow">
                <p className="text-5xl font-bold text-green-600 dark:text-green-400">
                  {totalItens.toLocaleString('pt-BR')}
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-300 font-semibold">
                  Itens Arrecadados
                </p>
              </div>

              {/* Reais Doados */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow">
                <p className="text-5xl font-bold text-green-600 dark:text-green-400">
                  {totalDinheiro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-300 font-semibold">
                  Reais Doados
                </p>
              </div>

            </div>
          </div>
        </section>

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
              O grupo EmpáTech nasceu da união entre empatia e tecnologia. O nosso propósito é desenvolver soluções tecnológicas que sirvam como pontes para a solidariedade, conectando quem deseja ajudar com quem mais precisa. Este dashboard é a materialização desse objetivo: uma ferramenta criada para otimizar a gestão de projetos de beneficência, garantindo que cada doação, seja de alimentos ou recursos, seja rastreada com transparência e eficiência, maximizando o impacto positivo na comunidade.
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
