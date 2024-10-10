import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Dashboard from './components/Painel';
import Agendamentos from './components/Agendamentos';
import Clientes from './components/Clientes';
import Historico from './components/Historico';

// Componente principal da aplicação
const App = () => {
  // Estado para controlar a opção de menu selecionada
  const [selectedOption, setSelectedOption] = useState('dashboard');

  // Array de itens do menu
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'agendamentos', label: 'Agendamentos', icon: '📅' },
    { id: 'clientes', label: 'Clientes', icon: '👥' },
    { id: 'historico', label: 'Histórico', icon: '📜' },
  ];

  // Função para renderizar o conteúdo baseado na opção selecionada
  const renderContent = () => {
    switch (selectedOption) {
      case 'dashboard':
        return <Dashboard />;
      case 'agendamentos':
        return <Agendamentos />;
      case 'clientes':
        return <Clientes />;
      case 'historico':
        return <Historico />;
      default:
        return <Dashboard />;
    }
  };

  // NOTE: Implementar verificação de autenticação
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       // Verificar token com o back-end
  //       // Se inválido, redirecionar para login
  //     } else {
  //       // Redirecionar para login
  //     }
  //   };
  //   checkAuth();
  // }, []);

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
            onClick={() => {
              // NOTE: Implementar lógica de logout
              // 1. Chamar API de logout no back-end
              // 2. Limpar token do localStorage
              // 3. Redirecionar para tela de login
            }}
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