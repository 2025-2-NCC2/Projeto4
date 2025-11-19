import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useData } from './context/DataContext';
import LandingPage from './components/LandingPage';
import TelaLogin from './components/TelaLogin';
import DashboardGestor from './components/DashboardGestor';
import DashboardGrupo from './components/DashboardGrupo';

// Componente para proteger rotas que exigem login
function ProtectedRoute({ children }) {
  const { currentUser } = useData();
  // Se não houver utilizador, redireciona para a página de login
  return currentUser ? children : <Navigate to="/login" />;
}

export default function App() {
  const { currentUser } = useData();

  return (
    <Routes>
      {/* Rota da Página Inicial (Pública) */}
      <Route path="/" element={<LandingPage />} />

      {/* Rota de Login (Pública) */}
      {/* Se o utilizador já estiver logado, redireciona para o dashboard */}
      <Route 
        path="/login" 
        element={currentUser ? <Navigate to="/dashboard" /> : <TelaLogin />} 
      />

      {/* Rota de Dashboard (Protegida) */}
      {/* Renderiza o painel correto (Gestor ou Grupo) com base no tipo de utilizador */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            {currentUser?.tipo === 'gestor' ? (
              <DashboardGestor />
            ) : (
              <DashboardGrupo nomeEquipe={currentUser?.nome} />
            )}
          </ProtectedRoute>
        }
      />
      
      {/* Rota de fallback: qualquer outro caminho redireciona para a página inicial */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

