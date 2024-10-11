import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from "../components/src/ui/button";
import { Input } from "./src/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/src/ui/card";
import { Scissors, UserPlus, Phone, Calendar, Edit, Trash2 } from 'lucide-react';

// Funções de formatação - podem ser mantidas no front-end ou movidas para um arquivo de utilidades
const formatCPF = (value) => {
  const cpf = value.replace(/\D/g, '');
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

const formatTelefone = (value) => {
  const telefone = value.replace(/\D/g, '');
  return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

const Funcionarios = () => {
  // Estados para gerenciar os dados dos funcionários
  const [funcionarios, setFuncionarios] = useState([]);
  const [novoFuncionario, setNovoFuncionario] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    dataNascimento: ''
  });
  const [modoEdicao, setModoEdicao] = useState(false);
  const [funcionarioEditando, setFuncionarioEditando] = useState(null);

  // REMOVER: Este useEffect com dados mockados
  useEffect(() => {
    // Simulação de carregamento de dados
    setTimeout(() => {
      setFuncionarios([
        { id: 1, nome: 'Pedro Oliveira', cpf: '123.456.789-00', telefone: '(11) 97777-7777', dataNascimento: '1990-05-15' },
        { id: 2, nome: 'Ana Santos', cpf: '987.654.321-00', telefone: '(11) 96666-6666', dataNascimento: '1988-10-20' },
      ]);
    }, 1000);
  }, []);

  // SUBSTITUIR: Com uma chamada à API para buscar funcionários
  // useEffect(() => {
  //   fetch('/api/funcionarios')
  //     .then(response => response.json())
  //     .then(data => setFuncionarios(data))
  //     .catch(error => console.error('Erro ao carregar funcionários:', error));
  // }, []);

  // Função para lidar com mudanças nos inputs
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (name === 'telefone') {
      formattedValue = formatTelefone(value);
    }
    setNovoFuncionario(prev => ({ ...prev, [name]: formattedValue }));
  }, []);

  // Função para lidar com o envio do formulário
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    // REMOVER: Lógica local de adição/edição
    if (modoEdicao) {
      setFuncionarios(prev => prev.map(f => f.id === funcionarioEditando.id ? { ...funcionarioEditando, ...novoFuncionario } : f));
      setModoEdicao(false);
    } else {
      setFuncionarios(prev => [...prev, { ...novoFuncionario, id: Date.now() }]);
    }
    setNovoFuncionario({ nome: '', cpf: '', telefone: '', dataNascimento: '' });

    // SUBSTITUIR: Com chamadas à API para adicionar ou atualizar funcionário
    // const url = modoEdicao ? `/api/funcionarios/${funcionarioEditando.id}` : '/api/funcionarios';
    // const method = modoEdicao ? 'PUT' : 'POST';
    // fetch(url, {
    //   method: method,
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(novoFuncionario)
    // })
    // .then(response => response.json())
    // .then(data => {
    //   if (modoEdicao) {
    //     setFuncionarios(prev => prev.map(f => f.id === data.id ? data : f));
    //   } else {
    //     setFuncionarios(prev => [...prev, data]);
    //   }
    //   setModoEdicao(false);
    //   setNovoFuncionario({ nome: '', cpf: '', telefone: '', dataNascimento: '' });
    // })
    // .catch(error => console.error('Erro ao salvar funcionário:', error));
  }, [modoEdicao, funcionarioEditando, novoFuncionario]);

  // Função para iniciar a edição de um funcionário
  const editarFuncionario = useCallback((funcionario) => {
    setModoEdicao(true);
    setFuncionarioEditando(funcionario);
    setNovoFuncionario(funcionario);
  }, []);

  // Função para excluir um funcionário
  const excluirFuncionario = useCallback((id) => {
    // REMOVER: Lógica local de exclusão
    setFuncionarios(prev => prev.filter(f => f.id !== id));

    // SUBSTITUIR: Com chamada à API para excluir funcionário
    // fetch(`/api/funcionarios/${id}`, { method: 'DELETE' })
    //   .then(() => setFuncionarios(prev => prev.filter(f => f.id !== id)))
    //   .catch(error => console.error('Erro ao excluir funcionário:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-8">
      <Card className="bg-white shadow-xl w-full max-w-7xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <CardTitle className="text-3xl font-bold flex items-center">
            <Scissors className="mr-2" /> Gerenciar Funcionários
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="mb-8 bg-gray-100 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {modoEdicao ? 'Editar Funcionário' : 'Adicionar Novo Funcionário'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center bg-white rounded-md shadow">
                <UserPlus className="ml-3 text-gray-400" />
                <Input
                  type="text"
                  name="nome"
                  value={novoFuncionario.nome}
                  onChange={handleInputChange}
                  placeholder="Nome do Funcionário"
                  required
                  className="border-0 focus:ring-0"
                />
              </div>
              <div className="flex items-center bg-white rounded-md shadow">
                <span className="ml-3 text-gray-400 font-mono">123</span>
                <Input
                  type="text"
                  name="cpf"
                  value={novoFuncionario.cpf}
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
                  value={novoFuncionario.telefone}
                  onChange={handleInputChange}
                  placeholder="Telefone"
                  required
                  className="border-0 focus:ring-0"
                />
              </div>
              <div className="flex items-center bg-white rounded-md shadow">
                <Calendar className="ml-3 text-gray-400" />
                <Input
                  type="date"
                  name="dataNascimento"
                  value={novoFuncionario.dataNascimento}
                  onChange={handleInputChange}
                  required
                  className="border-0 focus:ring-0"
                />
              </div>
            </div>
            <Button type="submit" className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              {modoEdicao ? 'Atualizar Funcionário' : 'Incluir Funcionário'}
            </Button>
          </form>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Nome</th>
                  <th className="px-4 py-2 text-left">CPF</th>
                  <th className="px-4 py-2 text-left">Telefone</th>
                  <th className="px-4 py-2 text-left">Data de Nascimento</th>
                  <th className="px-4 py-2 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {funcionarios.map((funcionario, index) => (
                  <motion.tr 
                    key={funcionario.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="px-4 py-2">{funcionario.nome}</td>
                    <td className="px-4 py-2">{funcionario.cpf}</td>
                    <td className="px-4 py-2">{funcionario.telefone}</td>
                    <td className="px-4 py-2">{funcionario.dataNascimento}</td>
                    <td className="px-4 py-2">
                      <Button onClick={() => editarFuncionario(funcionario)} variant="outline" className="mr-2 bg-yellow-500 hover:bg-yellow-600 text-white">
                        <Edit size={16} className="mr-1" /> Editar
                      </Button>
                      <Button onClick={() => excluirFuncionario(funcionario.id)} variant="destructive" className="bg-red-500 hover:bg-red-600">
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

export default Funcionarios;