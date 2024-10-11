import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "./src/ui/button";
import { Input } from "./src/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./src/ui/card";
import { UserPlus, Phone, Mail, Calendar, Search, Edit, Trash2 } from 'lucide-react';
import { api } from '../services/api';
import { motion } from 'framer-motion';

// Funções de formatação - podem ser mantidas no front-end ou movidas para um arquivo de utilidades
const formatCPF = (value) => {
  const cpf = value.replace(/\D/g, '');
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

const formatTelefone = (value) => {
  const telefone = value.replace(/\D/g, '');
  return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

const Clientes = () => {
  // Estados para gerenciar os dados dos clientes
  const [clientes, setClientes] = useState([]);
  const [novoCliente, setNovoCliente] = useState({ nome: '', cpf: '', telefone: '', email: '', dataNascimento: '' });
  const [modoEdicao, setModoEdicao] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [pesquisa, setPesquisa] = useState('');

  useEffect(() => {
    fetchClientes();
  }, []);

  const editarCliente = (cliente) => {
    setNovoCliente(cliente);
    setModoEdicao(true);
    setClienteEditando(cliente);
  };

  const fetchClientes = async () => {
    try {
      const data = await api.get('/clientes');
      setClientes(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    if (name === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (name === 'telefone') {
      formattedValue = formatTelefone(value);
    }
    
    setNovoCliente(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      if (modoEdicao) {
        await api.put(`/clientes/${clienteEditando.id}`, novoCliente);
      } else {
        await api.post('/clientes', novoCliente);
      }
      fetchClientes();
      setNovoCliente({ nome: '', cpf: '', telefone: '', email: '', dataNascimento: '' });
      setModoEdicao(false);
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  }, [modoEdicao, clienteEditando, novoCliente]);

  const excluirCliente = useCallback(async (id) => {
    try {
      await api.delete(`/clientes/${id}`);
      fetchClientes();
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  }, []);

  // Função para filtrar clientes
  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
    cliente.email.toLowerCase().includes(pesquisa.toLowerCase()) ||
    cliente.cpf.includes(pesquisa)
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-8">
      <Card className="bg-white shadow-xl w-full max-w-7xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <CardTitle className="text-3xl font-bold flex items-center">
            <UserPlus className="mr-2" /> Gerenciar Clientes
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Pesquisar clientes..."
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="mb-8 bg-gray-100 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {modoEdicao ? 'Editar Cliente' : 'Adicionar Novo Cliente'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center bg-white rounded-md shadow">
                <UserPlus className="ml-3 text-gray-400" />
                <Input
                  type="text"
                  name="nome"
                  value={novoCliente.nome}
                  onChange={handleInputChange}
                  placeholder="Nome do Cliente"
                  required
                  className="border-0 focus:ring-0"
                />
              </div>
              <div className="flex items-center bg-white rounded-md shadow">
                <span className="ml-3 text-gray-400 font-mono">123</span>
                <Input
                  type="text"
                  name="cpf"
                  value={novoCliente.cpf}
                  onChange={handleInputChange}
                  placeholder="CPF"
                  required
                  className="border-0 focus:ring-0"
                />
              </div>
              <div className="flex items-center bg-white rounded-md shadow">
                <Phone className="ml-3 text-gray-400" />
                <Input
                  type="tel"
                  name="telefone"
                  value={novoCliente.telefone}
                  onChange={handleInputChange}
                  placeholder="Telefone"
                  required
                  className="border-0 focus:ring-0"
                />
              </div>
              <div className="flex items-center bg-white rounded-md shadow">
                <Mail className="ml-3 text-gray-400" />
                <Input
                  type="email"
                  name="email"
                  value={novoCliente.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  className="border-0 focus:ring-0"
                />
              </div>
              <div className="flex items-center bg-white rounded-md shadow">
                <Calendar className="ml-3 text-gray-400" />
                <Input
                  type="date"
                  name="dataNascimento"
                  value={novoCliente.dataNascimento}
                  onChange={handleInputChange}
                  required
                  className="border-0 focus:ring-0"
                />
              </div>
            </div>
            <Button type="submit" className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              {modoEdicao ? 'Atualizar Cliente' : 'Incluir Cliente'}
            </Button>
          </form>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Nome</th>
                  <th className="px-4 py-2 text-left">CPF</th>
                  <th className="px-4 py-2 text-left">Telefone</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Data de Nascimento</th>
                  <th className="px-4 py-2 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {clientesFiltrados.map((cliente, index) => (
                  <motion.tr 
                    key={cliente.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="px-4 py-2">{cliente.nome}</td>
                    <td className="px-4 py-2">{cliente.cpf}</td>
                    <td className="px-4 py-2">{cliente.telefone}</td>
                    <td className="px-4 py-2">{cliente.email}</td>
                    <td className="px-4 py-2">{new Date(cliente.dataNascimento).toLocaleDateString()}</td>
                    <td className="px-4 py-2">
                      <Button onClick={() => editarCliente(cliente)} variant="outline" className="mr-2 bg-yellow-500 hover:bg-yellow-600 text-white">
                        <Edit size={16} className="mr-1" /> Editar
                      </Button>
                      <Button onClick={() => excluirCliente(cliente.id)} variant="destructive" className="bg-red-500 hover:bg-red-600">
                        <Trash2 size={16} className="mr-1" /> Excluir
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Clientes;