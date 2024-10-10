import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "../components/src/ui/card";
import { Input } from "../components/src/ui/imput";
import { Button } from "../components/src/ui/button";

const Login = ({ onLogin }) => {
  // Estado para controlar se está no modo de login ou registro
  const [isLogin, setIsLogin] = useState(true);

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implementar lógica de autenticação real
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
              {isLogin ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Email"
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Senha"
                    required
                  />
                  <Button type="submit" className="w-full">
                    Entrar
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Nome"
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Senha"
                    required
                  />
                  <Button type="submit" className="w-full">
                    Inscrever-se
                  </Button>
                </form>
              )}
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