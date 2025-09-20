import React, { useState } from 'react';
import TelaLogin from "./components/TelaLogin";
import DashboardGestor from "./components/DashboardGestor";
import DashboardGrupo from './components/DashboardGrupo';

export default function Dashboard({ onNavigateHome }) { 
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const handleLogin = (usuario) => {
    setUsuarioLogado(usuario);
  };

  const handleLogout = () => {
    setUsuarioLogado(null);
  };

  if (!usuarioLogado) {
    return <TelaLogin onLogin={handleLogin} onNavigateHome={onNavigateHome} />;
  }

  if (usuarioLogado.tipo === 'gestor') {
    return <DashboardGestor onLogout={handleLogout} onNavigateHome={onNavigateHome} />;
  }

  if (usuarioLogado.tipo === 'grupo') {
    return <DashboardGrupo onLogout={handleLogout} onNavigateHome={onNavigateHome} nomeEquipe={usuarioLogado.nomeEquipe} />;
  }

  return null;
}