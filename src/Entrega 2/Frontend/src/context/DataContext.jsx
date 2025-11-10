import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const DataContext = createContext();

function parseJwt (token) { try { return JSON.parse(atob(token.split('.')[1])); } catch (e) { return null; } }

export function useData() {
  return useContext(DataContext);
}

function DataProviderContent({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
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
  const navigate = useNavigate();

  // 1. FUNÇÃO PARA O BOTÃO "VOLTAR AO SITE"
  const logoutAndGoHome = () => { 
    navigate('/'); // Navega para a página inicial
    setTimeout(() => {
      setCurrentUser(null);
      localStorage.removeItem('token');
    }, 0);
  };

  // 2. FUNÇÃO PARA O BOTÃO "SAIR"
  const logoutAndGoToLogin = () => { 
    navigate('/login'); // Navega para a página de login
    setTimeout(() => {
      setCurrentUser(null);
      localStorage.removeItem('token');
    }, 0);
  };
  
  const apiFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = { ...options.headers };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }
    const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
    if (response.status === 401 || response.status === 403) {
      // Se a sessão expirar, envia para a tela de login por segurança
      logoutAndGoToLogin(); 
      throw new Error('Sessão inválida ou expirada.');
    }
    return response;
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = parseJwt(token);
        if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
            setCurrentUser({ nome: decodedToken.nome, tipo: decodedToken.tipo });
        } else {
            localStorage.removeItem('token');
        }
    }
  }, []);
  
  const fetchData = async () => {
    if (!localStorage.getItem('token')) return;
    try {
      const endpoints = [ 'equipes', 'alunos', 'familias', 'estoque', 'doacoes', 'transacoes-alimentos', 'historicoSaidas', 'avisos', 'campanhas' ];
      const responses = await Promise.all(endpoints.map(ep => apiFetch(`/${ep}`)));
      for (const response of responses) { if (!response.ok) throw new Error('Falha ao buscar dados'); }
      const [ equipesData, alunosData, familiasData, estoqueData, moneyDonationsData, foodTransactionsData, saidasData, avisosData, campanhasData ] = await Promise.all(responses.map(res => res.json()));
      const equipeMap = new Map(equipesData.map(e => [e.equipe_id, e.nome]));
      const enrichedMoneyDonations = moneyDonationsData.map(doacao => ({ ...doacao, equipe: equipeMap.get(doacao.equipe_id) || 'Equipe Desconhecida' }));
      const foodDonations = foodTransactionsData.filter(t => t.tipo === 'Entrada');
      const combinedHistory = [...enrichedMoneyDonations, ...foodDonations].sort((a, b) => new Date(b.data) - new Date(a.data));
      setEquipes(equipesData); setAlunos(alunosData); setFamilias(familiasData); setEstoque(estoqueData); setHistoricoDoacoes(combinedHistory); setHistoricoFinanceiro(enrichedMoneyDonations); setHistoricoSaidas(saidasData); setAvisos(avisosData); setCampanhas(campanhasData);
    } catch (error) { console.error("Erro ao buscar dados do backend:", error); }
  };
  
  useEffect(() => {
    if (currentUser) fetchData();
  }, [currentUser]);

  const adicionarAtividade = (descricao, tipo) => { const novaAtividade = { descricao, tipo, data: new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }; setAtividades(prev => [novaAtividade, ...prev].slice(0, 20)); };

  const login = async (tipo, credentials) => {
    try {
      const payload = tipo === 'grupo' ? { nomeEquipe: credentials.nomeEquipe, senha: credentials.senha } : credentials;
      const response = await fetch(`${API_URL}/auth/login/${tipo}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) { const { error } = await response.json(); throw new Error(error); }
      const data = await response.json();
      if (data.token) { localStorage.setItem('token', data.token); setCurrentUser(data.user); return { success: true }; }
      throw new Error('Token não recebido.');
    } catch (error) { console.error(`Erro no login de ${tipo}:`, error); return { success: false, message: error.message }; }
  };
  
  const register = async (tipo, data) => { try { const response = await fetch(`${API_URL}/auth/register/${tipo}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), }); if (!response.ok) { const { error } = await response.json(); throw new Error(error); } alert('Cadastro realizado com sucesso! Agora você pode fazer o login.'); return { success: true }; } catch (error) { console.error(`Erro no registro de ${tipo}:`, error); return { success: false, message: error.message }; } };
  
  // --- FUNÇÕES CRUD ---
  const cadastrarEquipe = async (equipeData) => {  try { const response = await fetch(`${API_URL}/auth/register/grupo`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(equipeData) }); if (!response.ok) { const { error } = await response.json(); throw new Error(error || 'Falha ao criar equipe'); } await fetchData(); adicionarAtividade(`A equipe "${equipeData.nome}" foi criada.`, 'info'); alert('Equipe cadastrada com sucesso!'); } catch(error) { console.error("Erro ao cadastrar equipe:", error); alert(`Erro ao cadastrar equipe: ${error.message}`); } };
  const atualizarEquipe = async (equipeId, dados) => { try { await apiFetch(`/equipes/${equipeId}`, { method: 'PUT', body: JSON.stringify(dados) }); await fetchData(); adicionarAtividade(`Dados da equipe "${dados.nome}" atualizados.`, 'info'); } catch (error) { console.error("Erro ao atualizar equipe:", error); alert("Erro ao atualizar a equipe."); } };
  const excluirEquipe = async (equipeId) => { if (window.confirm("Certeza?")) { try { await apiFetch(`/equipes/${equipeId}`, { method: 'DELETE' }); await fetchData(); adicionarAtividade(`Uma equipe foi excluída.`, 'saida'); } catch (error) { console.error("Erro ao excluir equipe:", error); alert("Erro ao excluir a equipe."); } } };
  const cadastrarAluno = async (aluno) => { try { await apiFetch(`/alunos`, { method: 'POST', body: JSON.stringify(aluno) }); await fetchData(); adicionarAtividade(`Integrante ${aluno.nome} adicionado.`, 'info'); } catch(error) { console.error("Erro ao cadastrar aluno:", error); alert("Erro ao cadastrar aluno."); } };
  const atualizarAluno = async (alunoId, dados) => { try { await apiFetch(`/alunos/${alunoId}`, { method: 'PUT', body: JSON.stringify(dados) }); await fetchData(); adicionarAtividade(`Dados de ${dados.nome} atualizados.`, 'info'); } catch (error) { console.error("Erro ao atualizar aluno:", error); } };
  const excluirAluno = async (alunoId) => { if (window.confirm("Certeza?")) { try { await apiFetch(`/alunos/${alunoId}`, { method: 'DELETE' }); await fetchData(); adicionarAtividade(`Um integrante foi excluído.`, 'saida'); } catch (error) { console.error("Erro ao excluir aluno:", error); } } };
  const cadastrarFamilia = async (familia) => { try { await apiFetch(`/familias`, { method: 'POST', body: JSON.stringify(familia) }); await fetchData(); adicionarAtividade(`A família ${familia.nome} foi cadastrada.`, 'info'); } catch(error) { console.error("Erro ao cadastrar família:", error); alert("Erro ao cadastrar família."); } };
  const adicionarAviso = async (mensagem) => { try { await apiFetch(`/avisos`, { method: 'POST', body: JSON.stringify({ mensagem }) }); await fetchData(); } catch(error) { console.error("Erro ao adicionar aviso:", error); alert("Erro ao adicionar aviso."); } };
  const adicionarCampanha = async (campanha) => { try { await apiFetch(`/campanhas`, { method: 'POST', body: JSON.stringify(campanha) }); await fetchData(); adicionarAtividade(`A campanha "${campanha.nome}" foi criada.`, 'info'); } catch(error) { console.error("Erro ao criar campanha:", error); alert("Erro ao criar campanha."); } };
  const adicionarDoacao = async (dados) => { try { const formData = new FormData(); Object.keys(dados).forEach(key => { if (dados[key] !== null) formData.append(key, dados[key]); }); await apiFetch(`/doacoes`, { method: 'POST', body: formData }); await fetchData(); adicionarAtividade(`Doação de ${dados.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} registrada.`, 'entrada'); } catch (error) { console.error("Erro ao adicionar doação:", error); alert(`Erro ao adicionar doação: ${error.message}`); } };
  const handleRegistroAlimento = async (dados) => { try { const formData = new FormData(); Object.keys(dados).forEach(key => { if (dados[key] !== null) { if (key === 'itens') { formData.append(key, JSON.stringify(dados[key])); } else { formData.append(key, dados[key]); } } }); await apiFetch(`/transacoes-alimentos`, { method: 'POST', body: formData }); await fetchData(); adicionarAtividade(`Registro de alimentos (${dados.tipo}) efetuado.`, 'entrada'); } catch (error) { console.error("Erro ao registrar transação:", error.message); alert(`Erro: ${error.message}`); } };

  // 3. ATUALIZE O OBJETO "value" PARA EXPORTAR AS NOVAS FUNÇÕES
  const value = { 
    currentUser, 
    login, 
    logoutAndGoHome, 
    logoutAndGoToLogin,
    register, 
    equipes, 
    alunos, 
    estoque, 
    historicoDoacoes, 
    familias, 
    historicoSaidas, 
    atividades, 
    avisos, 
    campanhas, 
    historicoFinanceiro, 
    adicionarAtividade, 
    cadastrarEquipe, 
    atualizarEquipe, 
    excluirEquipe, 
    cadastrarAluno, 
    atualizarAluno, 
    excluirAluno, 
    cadastrarFamilia, 
    adicionarAviso, 
    adicionarCampanha, 
    adicionarDoacao, 
    handleRegistroAlimento, 
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function DataProvider({ children }) {
    return (
        <DataProviderContent>
            {children}
        </DataProviderContent>
    );
}