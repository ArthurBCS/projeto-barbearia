import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "../components/src/ui/card";
import { Input } from "../components/src/ui/imput";
import { Button } from "../components/src/ui/button";

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // NOTE: Implementar lógica de autenticação real
    // Exemplo de integração futura com o back-end:
    // try {
    //   const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    //   const response = await fetch(endpoint, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    //   });
    //   if (response.ok) {
    //     const data = await response.json();
    //     localStorage.setItem('authToken', data.token);
    //     onLogin();
    //   } else {
    //     const errorData = await response.json();
    //     alert(errorData.message);
    //   }
    // } catch (error) {
    //   console.error('Erro de autenticação:', error);
    //   alert('Erro ao realizar autenticação. Tente novamente.');
    // }
    
    // REMOVER: Esta linha deve ser removida quando a autenticação real for implementada
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-gray-800">BarberSystem</CardTitle>
            <div className="mt-4 w-32 h-32 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
              <span className="text-gray-500">Logo</span>
            </div>
          </CardHeader>
          <CardContent>
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, x: isLogin ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nome"
                    required
                  />
                )}
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                />
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Senha"
                  required
                />
                <Button type="submit" className="w-full">
                  {isLogin ? 'Entrar' : 'Inscrever-se'}
                </Button>
              </form>
            </motion.div>

            <div className="mt-4 text-center">
              <Button
                onClick={() => setIsLogin(!isLogin)}
                variant="link"
                className="text-blue-500 hover:underline"
              >
                {isLogin ? "Não tem uma conta? Inscreva-se" : "Já tem uma conta? Entre"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;