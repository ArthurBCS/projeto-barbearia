import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">BarberSystem</h1>
          <div className="mt-4 w-32 h-32 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
            <span className="text-gray-500">Logo</span>
          </div>
        </div>

        <motion.div
          key={isLogin ? 'login' : 'register'}
          initial={{ opacity: 0, x: isLogin ? -100 : 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isLogin ? (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 mb-4 border rounded"
              />
              <input
                type="password"
                placeholder="Senha"
                className="w-full p-2 mb-4 border rounded"
              />
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">
                Entrar
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nome"
                className="w-full p-2 mb-4 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 mb-4 border rounded"
              />
              <input
                type="password"
                placeholder="Senha"
                className="w-full p-2 mb-4 border rounded"
              />
              <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300">
                Inscrever-se
              </button>
            </form>
          )}
        </motion.div>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? "Não tem uma conta? Inscreva-se" : "Já tem uma conta? Entre"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;