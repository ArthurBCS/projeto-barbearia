import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "../components/src/ui/card";
import { Input } from "../components/src/ui/input";
import { Button } from "../components/src/ui/button";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('API URL:', process.env.REACT_APP_API_URL);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log('Tentando fazer login com:', formData);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      
      console.log('Resposta completa:', response);
      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Usuário ou senha inválidos');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Dados da resposta:', data);

      localStorage.setItem('token', data.token);
      onLogin();
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      setError(error.message || 'Erro ao tentar fazer login. Por favor, tente novamente.');
    }
  };

  const handleForgotPassword = () => {
    alert("Função de recuperação de senha ainda não implementada.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" 
         style={{backgroundImage: "url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')"}}>
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-black bg-opacity-80">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2 text-white">BarberSystem</h1>
              <p className="text-gray-400">Bem-vindo de volta!</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Usuário"
                  required
                  className="w-full p-3 bg-white text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Senha"
                  required
                  className="w-full p-3 bg-white text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-300">
                    Lembrar
                  </label>
                </div>
                <div className="text-sm">
                  <button 
                    type="button"
                    onClick={handleForgotPassword}
                    className="font-medium text-blue-400 hover:text-blue-300"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md transition duration-300">
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;