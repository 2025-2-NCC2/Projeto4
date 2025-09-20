import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

const API_URL = 'http://localhost:3001/api';

export function DataProvider({ children }) {
  const [equipes, setEquipes] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [estoque, setEstoque] = useState([]);
  const [historicoDoacoes, setHistoricoDoacoes] = useState([]);
  const [historicoFinanceiro, setHistoricoFinanceiro] = useState([]);
  const [familias, setFamilias] = useState([]);
  const [historicoSaidas, setHistoricoSaidas] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [avisos, setAvisos] = useState([]);
  const [campanhas, setCampanhas] = useState([]);

  const fetchData = async () => {
    try {
      const responses = await Promise.all([
        fetch(`${API_URL}/equipes`), fetch(`${API_URL}/alunos`), fetch(`${API_URL}/familias`),
        fetch(`${API_URL}/estoque`), fetch(`${API_URL}/historicoDoacoes`), fetch(`${API_URL}/transacoes-alimentos`),
        fetch(`${API_URL}/historicoSaidas`), fetch(`${API_URL}/avisos`), fetch(`${API_URL}/campanhas`),
      ]);

      for (const response of responses) {
        if (!response.ok) throw new Error(`Erro ao buscar dados: ${response.statusText} em ${response.url}`);
      }
      
      const [
        equipesData, alunosData, familiasData, estoqueData,
        moneyDonationsData, foodTransactionsData,
        saidasData, avisosData, campanhasData
      ] = await Promise.all(responses.map(res => res.json()));

      const equipeMap = new Map(equipesData.map(e => [e.equipe_id, e.nome]));

      const enrichedMoneyDonations = moneyDonationsData.map(doacao => ({
        ...doacao,
        equipe: equipeMap.get(doacao.equipe_id) || 'Equipe Desconhecida'
      }));

      const foodDonations = foodTransactionsData.filter(t => t.tipo === 'Entrada');
      const combinedHistory = [...enrichedMoneyDonations, ...foodDonations];
      
      setEquipes(equipesData);
      setAlunos(alunosData);
      setFamilias(familiasData);
      setEstoque(estoqueData);
      setHistoricoDoacoes(combinedHistory);
      setHistoricoFinanceiro(enrichedMoneyDonations);
      setHistoricoSaidas(saidasData);
      setAvisos(avisosData);
      setCampanhas(campanhasData);

    } catch (error) {
      console.error("Erro detalhado ao buscar dados do backend:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const adicionarAtividade = (descricao, tipo) => {
    const novaAtividade = {
      descricao,
      tipo,
      data: new Date().toLocaleString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      })
    };
    setAtividades(prev => [novaAtividade, ...prev].slice(0, 20));
  };

  const handleRegistroAlimento = async (dados) => {
    try {
      const dadosParaEnviar = { ...dados, nomeNotaFiscal: dados.notaFiscal ? dados.notaFiscal.name : null, };
      delete dadosParaEnviar.notaFiscal;

      const response = await fetch(`${API_URL}/transacoes-alimentos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosParaEnviar),
      });
      
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Falha ao registrar transação.');
      }
      
      const novaTransacao = await response.json();

      if (novaTransacao.tipo === 'Entrada') {
        setHistoricoDoacoes(prev => [novaTransacao, ...prev]);
        
        setEstoque(prevEstoque => {
            const estoqueAtualizado = [...prevEstoque];
            const itemIndex = estoqueAtualizado.findIndex(i => i.item === novaTransacao.item);
            if (itemIndex > -1) {
                const qtdAtual = parseInt(estoqueAtualizado[itemIndex].qtd) || 0;
                const qtdAdicionada = parseInt(novaTransacao.quantidade) || 0;
                estoqueAtualizado[itemIndex].qtd = qtdAtual + qtdAdicionada;
            }
            return estoqueAtualizado;
        });
        adicionarAtividade(`${novaTransacao.quantidade}x ${novaTransacao.item} arrecadados pela equipe ${novaTransacao.equipe}.`, 'entrada');
      
      } else { // Saída
        setHistoricoSaidas(prev => [novaTransacao, ...prev]);
        setEstoque(prevEstoque => {
            const estoqueAtualizado = [...prevEstoque];
            const itemIndex = estoqueAtualizado.findIndex(i => i.item === novaTransacao.item);
            if (itemIndex > -1) {
                const qtdAtual = parseInt(estoqueAtualizado[itemIndex].qtd) || 0;
                const qtdRemovida = parseInt(novaTransacao.quantidade) || 0;
                estoqueAtualizado[itemIndex].qtd = qtdAtual - qtdRemovida;
            }
            return estoqueAtualizado;
        });
        adicionarAtividade(`${novaTransacao.quantidade}x ${novaTransacao.item} entregues para ${novaTransacao.destino}.`, 'saida');
      }

    } catch (error) {
      console.error("Erro ao registrar transação de alimento:", error.message);
      alert(`Erro: ${error.message}`); 
    }
  };

  const adicionarDoacao = async (doacao) => {
    try {
      const response = await fetch(`${API_URL}/doacoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doacao),
      });
      if (!response.ok) throw new Error('Falha ao adicionar doação');
      
      const serverResponse = await response.json();
      
      // CORREÇÃO: Converte o campanha_id para número para garantir consistência.
      const novaDoacaoParaState = {
        ...serverResponse,
        ...doacao,
        campanha_id: doacao.campanha_id ? parseInt(doacao.campanha_id, 10) : null,
        quantidade: 0
      };
      
      setHistoricoDoacoes(prev => [novaDoacaoParaState, ...prev]);
      setHistoricoFinanceiro(prev => [novaDoacaoParaState, ...prev]);

      adicionarAtividade(`Doação de ${(doacao.valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} registrada para a equipe ${doacao.equipe}.`, 'entrada');
    } catch (error) {
      console.error("Erro ao adicionar doação:", error);
      alert("Erro ao adicionar doação.");
    }
  };

  // Funções de cadastro restantes
  const cadastrarEquipe = async (nome, mentorInfo) => { 
    try {
      const response = await fetch(`${API_URL}/equipes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nome, ...mentorInfo }), });
      if (!response.ok) throw new Error('Falha ao criar equipe');
      const novaEquipe = await response.json();
      setEquipes(prev => [novaEquipe, ...prev]);
      adicionarAtividade(`A equipe "${nome}" foi criada.`, 'info');
    } catch(error) { console.error("Erro ao cadastrar equipe:", error); alert("Erro ao cadastrar equipe."); }
  };
  const cadastrarAluno = async (aluno) => {
    try {
      const response = await fetch(`${API_URL}/alunos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(aluno), });
      if (!response.ok) throw new Error('Falha ao cadastrar aluno');
      const novoAluno = await response.json();
      setAlunos(prev => [novoAluno, ...prev]);
      adicionarAtividade(`O integrante ${aluno.nome} foi adicionado à equipe ${aluno.equipe}.`, 'info');
    } catch(error) { console.error("Erro ao cadastrar aluno:", error); alert("Erro ao cadastrar aluno."); }
  };
  const cadastrarFamilia = async (familia) => {
    try {
      const response = await fetch(`${API_URL}/familias`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(familia), });
      if (!response.ok) throw new Error('Falha ao cadastrar família');
      const novaFamilia = await response.json();
      setFamilias(prev => [novaFamilia, ...prev]);
      adicionarAtividade(`A família ${familia.nome} foi cadastrada.`, 'info');
    } catch(error) { console.error("Erro ao cadastrar família:", error); alert("Erro ao cadastrar família."); }
  };
  const adicionarAviso = async (mensagem) => {
    try {
      const response = await fetch(`${API_URL}/avisos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mensagem }), });
      if (!response.ok) throw new Error('Falha ao adicionar aviso');
      const novoAviso = await response.json();
      setAvisos(prev => [novoAviso, ...prev]);
    } catch(error) { console.error("Erro ao adicionar aviso:", error); alert("Erro ao adicionar aviso."); }
  };
  const adicionarCampanha = async (campanha) => {
    try {
      const response = await fetch(`${API_URL}/campanhas`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(campanha), });
      if (!response.ok) throw new Error('Falha ao criar campanha');
      const novaCampanha = await response.json();
      setCampanhas(prev => [novaCampanha, ...prev].sort((a, b) => new Date(b.data_termino) - new Date(a.data_termino)));
      adicionarAtividade(`A campanha "${campanha.nome}" foi criada.`, 'info');
    } catch(error) { console.error("Erro ao criar campanha:", error); alert("Erro ao criar campanha."); }
  };

  const value = {
    equipes, alunos, estoque, historicoDoacoes, familias, historicoSaidas,
    atividades, avisos, campanhas, historicoFinanceiro,
    cadastrarEquipe, cadastrarAluno, cadastrarFamilia, adicionarDoacao,
    handleRegistroAlimento, adicionarAviso, adicionarCampanha,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

