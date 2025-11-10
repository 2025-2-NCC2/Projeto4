import React, { useState } from 'react';
import { useData } from './context/DataContext'; // Importa o hook para aceder aos dados globais
import TelaLogin from "./components/TelaLogin";
import DashboardGestor from "./components/DashboardGestor";
import DashboardGrupo from './components/DashboardGrupo';
import LandingPage from './components/LandingPage';

export default function Dashboard() {
  const { currentUser } = useData();
  const [currentPage, setCurrentPage] = useState('landing');

  const handleNavigateLogin = () => {
    setCurrentPage('login');
  };

  const handleNavigateHome = () => {
    setCurrentPage('landing');
  };

  if (currentUser) {
    if (currentUser.tipo === 'gestor') {
      return <DashboardGestor onNavigateHome={handleNavigateHome} />;
    }
    if (currentUser.tipo === 'grupo') {
      return <DashboardGrupo onNavigateHome={handleNavigateHome} nomeEquipe={currentUser.nome} />;
    }
  }

  if (currentPage === 'login') {
    return <TelaLogin onNavigateHome={handleNavigateHome} />;
  }

  return <LandingPage onNavigateLogin={handleNavigateLogin} />;
}

