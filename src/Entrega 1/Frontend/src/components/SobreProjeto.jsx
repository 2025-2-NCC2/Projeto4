import React from 'react';

// Ícone para o grupo
const GroupIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

// Ícone para link externo
const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-1 opacity-50 group-hover:opacity-100">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

export default function SobreProjeto() {
  // Agora um array de objetos com nome e link
  const integrantes = [
    { nome: "Breno Sales Colaneri", linkedin: "https://www.linkedin.com/in/breno-sales-colaneri-231b59322" },
    { nome: "Guilherme Leão Rodrigues", linkedin: "https://www.linkedin.com/in/guilherme-le%C3%A3o-277053347/" },
    { nome: "Izabelli Ribeiro Dos Santos", linkedin: "https://www.linkedin.com/in/izabelliribeiro/" },
    { nome: "Rafael Chagas Silva", linkedin: "https://www.linkedin.com/in/rafael-chagas-0648a6349/" }
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Nosso Propósito</h2>
        <h3 className="text-3xl font-bold text-green-600 mt-1">EmpáTech</h3>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          O grupo EmpáTech nasceu da união entre empatia e tecnologia. Nosso propósito é desenvolver soluções tecnológicas que sirvam como pontes para a solidariedade, conectando quem deseja ajudar com quem mais precisa. Este dashboard é a materialização desse objetivo: uma ferramenta criada para otimizar a gestão de projetos beneficentes, garantindo que cada doação, seja de alimentos ou recursos, seja rastreada com transparência e eficiência, maximizando o impacto positivo na comunidade.
        </p>
      </div>

      <div className="mt-8 border-t pt-6">
        <h3 className="text-xl font-bold text-gray-800 text-center flex items-center justify-center gap-2">
          <GroupIcon />
          Integrantes do Projeto
        </h3>
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          {integrantes.map((integrante) => (
            <li key={integrante.nome}>
              <a
                href={integrante.linkedin}
                target="_blank" // Abre em uma nova aba
                rel="noopener noreferrer" // Boa prática de segurança
                className="group text-gray-700 p-2 bg-gray-50 rounded-md block text-center hover:bg-green-100 hover:text-green-800 transition-colors"
              >
                {integrante.nome}
                <LinkIcon />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
