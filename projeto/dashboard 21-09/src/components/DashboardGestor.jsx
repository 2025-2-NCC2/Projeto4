import React, { useState, useMemo } from "react";
import { useData } from "../context/DataContext";
import { DADOS_INICIAIS_GRAFICO, META_DINHEIRO, META_ALIMENTOS, LIMITE_ESTOQUE_BAIXO } from "../config/constants";
import NavegacaoAbas from "./NavegacaoAbas";
import AtividadesRecentes from "./AtividadesRecentes";
import Filtros from "./Filtros";
import Metas from "./Metas";
import Resumo from "./Resumo";
import GraficoDoacoes from "./GraficoDoacoes";
import RankingEquipes from "./RankingEquipes";
import EstoqueAlimentos from "./EstoqueAlimentos";
import DoacoesDinheiro from "./DoacoesDinheiro";
import CadastroEquipe from "./CadastroEquipe";
import CadastroAluno from "./CadastroAluno";
import RegistroAlimentos from "./RegistroAlimentos";
import HistoricoDoacoes from "./HistoricoDoacoes";
import ListaIntegrantes from "./ListaIntegrantes";
import RankingAlimentos from "./RankingAlimentos";
import CadastroFamilia from "./CadastroFamilia";
import ListaFamilias from "./ListaFamilias";
import HistoricoSaidas from "./HistoricoSaidas";
import ThemeToggle from "./ThemeToggle";
import MuralAvisos from "./MuralAvisos";
import CadastroAviso from "./CadastroAviso";
import GraficoCategorias from "./GraficoCategorias";
import GraficoRegioes from "./GraficoRegioes";
import CadastroCampanha from "./CadastroCampanha";
import MontagemCestas from "./MontagemCestas";
import ListaCampanhas from "./ListaCampanhas";
import ProgressoCampanha from "./ProgressoCampanha";

export default function DashboardGestor({ onLogout, onNavigateHome }) {
  const [abaAtiva, setAbaAtiva] = useState('visaoGeral');
  const { equipes, estoque, historicoDoacoes, familias, campanhas } = useData();
  const [filtroMes, setFiltroMes] = useState("Todos");
  const [filtroEquipe, setFiltroEquipe] = useState("Todas");

  const campanhaAtiva = campanhas.find(c => new Date(c.dataTermino) >= new Date());

  const dadosFiltrados = useMemo(() => {
    const doacoesFiltradas = (historicoDoacoes || []).filter(doacao => {
      if (!doacao.data) return false;
      const mesDaDoacao = new Date(doacao.data).getMonth();
      const filtroMesValido = filtroMes === "Todos" || mesDaDoacao === parseInt(filtroMes);
      const filtroEquipeValido = filtroEquipe === "Todas" || doacao.equipe === filtroEquipe;
      return filtroMesValido && filtroEquipeValido;
    });

    const totalDinheiro = doacoesFiltradas.reduce((acc, doacao) => acc + parseFloat(doacao.valor || 0), 0);
    const dadosGrafico = [...DADOS_INICIAIS_GRAFICO].map(d => ({ ...d, valor: 0 }));

    doacoesFiltradas.forEach(doacao => {
      if (doacao.data) {
        const mesIndex = new Date(doacao.data).getMonth();
        if (!isNaN(mesIndex) && dadosGrafico[mesIndex]) {
          dadosGrafico[mesIndex].valor += parseFloat(doacao.valor || 0);
        }
      }
    });

    const equipesCalculadas = (equipes || []).map(equipe => {
      const doacoesDaEquipe = doacoesFiltradas.filter(d => d.equipe === equipe.nome);
      
      const valorTotal = doacoesDaEquipe
        .reduce((acc, d) => acc + parseFloat(d.valor || 0), 0);

      // CORREÇÃO FINAL: Usar 'quantidade' (que vem do backend) em vez de 'qtd'.
      const itensTotal = doacoesDaEquipe
        .reduce((acc, d) => acc + parseInt(d.quantidade || 0), 0);

      return { ...equipe, valor: valorTotal, itens: itensTotal };
    });

    return { totalDinheiro, historicoDoacoes: doacoesFiltradas, dadosGrafico, equipes: equipesCalculadas };
  }, [historicoDoacoes, filtroMes, filtroEquipe, equipes]);

  const totalAlimentos = (estoque || []).reduce((acc, item) => acc + parseInt(item.qtd || 0), 0);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">Dashboard - Lideranças Empáticas</h1>
        <div className="flex items-center gap-4">
          <button onClick={onNavigateHome} className="text-sm text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">Voltar ao Site</button>
          <ThemeToggle />
          <button onClick={onLogout} className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600">Sair</button>
        </div>
      </header>

      <NavegacaoAbas abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />

      <main>
        {abaAtiva === 'visaoGeral' && (
          <div className="space-y-6 mt-6">
            {campanhaAtiva && <ProgressoCampanha campanha={campanhaAtiva} />}
            <Filtros filtroMes={filtroMes} setFiltroMes={setFiltroMes} filtroEquipe={filtroEquipe} setFiltroEquipe={setFiltroEquipe} />
            <Resumo totalDinheiro={dadosFiltrados.totalDinheiro} totalAlimentos={totalAlimentos} familias={familias.length} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Metas titulo="Meta de Arrecadação (Dinheiro)" valorAtual={dadosFiltrados.totalDinheiro} meta={META_DINHEIRO} unidade="R$" />
              <Metas titulo="Meta de Arrecadação (Alimentos)" valorAtual={totalAlimentos} meta={META_ALIMENTOS} unidade="" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GraficoDoacoes dados={dadosFiltrados.dadosGrafico} />
              <AtividadesRecentes />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GraficoCategorias />
              <GraficoRegioes />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <RankingEquipes equipes={dadosFiltrados.equipes} />
              <RankingAlimentos equipes={dadosFiltrados.equipes} />
            </div>
          </div>
        )}

        {abaAtiva === 'estoque' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 space-y-6">
              <EstoqueAlimentos limiteEstoqueBaixo={LIMITE_ESTOQUE_BAIXO} />
              <HistoricoSaidas />
              <MontagemCestas />
            </div>
            <div className="space-y-6">
              <RegistroAlimentos />
            </div>
          </div>
        )}
        
        {abaAtiva === 'financeiro' && ( <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6"> <div className="lg:col-span-2"><HistoricoDoacoes /></div> <DoacoesDinheiro /> </div> )}
        {abaAtiva === 'equipes' && ( <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6"> <div className="lg:col-span-2"><ListaIntegrantes /></div> <div className="space-y-6"><CadastroEquipe /><CadastroAluno /></div> </div> )}
        {abaAtiva === 'familias' && ( <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6"> <div className="lg:col-span-2"><ListaFamilias /></div> <CadastroFamilia /> </div> )}
        {abaAtiva === 'campanhas' && ( <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6"> <div className="lg:col-span-2"><ListaCampanhas /></div> <CadastroCampanha /> </div> )}
        {abaAtiva === 'comunicacao' && ( <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6"> <div className="lg:col-span-2"><MuralAvisos /></div> <CadastroAviso /> </div> )}
      </main>
    </div>
  );
}

