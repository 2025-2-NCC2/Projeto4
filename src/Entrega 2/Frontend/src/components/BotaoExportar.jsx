import React from 'react';

// Ícone de Download
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

export default function BotaoExportar({ dados, nomeFicheiro }) {
  const exportarParaCSV = () => {
    if (!dados || dados.length === 0) {
      alert("Não há dados para exportar.");
      return;
    }

    const cabecalho = Object.keys(dados[0]).join(';');
    const corpo = dados.map(linha => Object.values(linha).join(';')).join('\n');
    const csv = `${cabecalho}\n${corpo}`;

    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${nomeFicheiro}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <button
      onClick={exportarParaCSV}
      className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 py-1 px-3 rounded-full"
    >
      <DownloadIcon />
      Exportar CSV
    </button>
  );
}