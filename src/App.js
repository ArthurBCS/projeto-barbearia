import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Login from './components/Login';
import Dashboard from './components/Painel';
import Agendamentos from './components/Agendamentos';
import Clientes from './components/Clientes';
import Funcionarios from './components/Funcionarios';
import Historico from './components/Historico';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedOption, setSelectedOption] = useState('dashboard');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setSelectedOption('dashboard');
  };

  // Itens do menu
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'agendamentos', label: 'Agendamentos', icon: '📅' },
    { id: 'clientes', label: 'Clientes', icon: '👥' },
    { id: 'funcionarios', label: 'Funcionários', icon: '👨‍💼' },
    { id: 'historico', label: 'Histórico', icon: '📜' },
  ];

  // Função para renderizar o conteúdo baseado na opção selecionada
  const renderContent = () => {
    switch (selectedOption) {
      case 'dashboard': return <Dashboard />;
      case 'agendamentos': return <Agendamentos />;
      case 'clientes': return <Clientes />;
      case 'funcionarios': return <Funcionarios />;
      case 'historico': return <Historico />;
      default: return <Dashboard />;
    }
  };

  // Renderiza o componente de Login se não estiver autenticado
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // Renderiza o layout principal se estiver autenticado
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Menu Lateral */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-5">
          <h1 className="text-2xl font-semibold text-gray-800">BarberSystem</h1>
        </div>
        <nav className="mt-5">
          <ul>
            {menuItems.map((item) => (
              <li key={item.id} className="mb-2">
                <button
                  onClick={() => setSelectedOption(item.id)}
                  className={`w-full text-left p-3 flex items-center ${
                    selectedOption === item.id
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-64 p-5">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 overflow-auto">
        <motion.div
          key={selectedOption}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8"
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default App;