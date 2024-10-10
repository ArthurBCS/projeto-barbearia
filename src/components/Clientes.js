import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "../components/src/ui/button";
import { Input } from "../components/src/ui/imput";
import { Card, CardContent, CardHeader, CardTitle } from "../components/src/ui/card";

const Clientes = () => {
  // Estados para gerenciar a lista de clientes e o formulário
  const [clientes, setClientes] = useState([]);
  const [novoCliente, setNovoCliente] = useState({ nome: '', telefone: '', email: '', dataNascimento: '' });
  const [modoEdicao, setModoEdicao] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

  // Simula o carregamento de clientes do banco de dados
  useEffect(() => {
    // TODO: Substituir por uma chamada API real
    setClientes([
      { id: 1, nome: 'João Silva', telefone: '(11) 99999-9999', email: 'joao@email.com', dataNascimento: '1990-05-15' },
      { id: 2, nome: 'Maria Souza', telefone: '(11) 88888-8888', email: 'maria@email.com', dataNascimento: '1985-10-20' },
    ]);
  }, []);

  // Atualiza o estado do novoCliente quando os inputs mudam
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoCliente(prev => ({ ...prev, [name]: value }));
  };

  // Lida com a submissão do formulário (adicionar ou editar cliente)
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (modoEdicao) {
      // Atualiza o cliente existente
      setClientes(prev => prev.map(c => c.id === clienteEditando.id ? { ...clienteEditando, ...novoCliente } : c));
      setModoEdicao(false);
    } else {
      // Adiciona um novo cliente
      setClientes(prev => [...prev, { ...novoCliente, id: Date.now() }]);
    }
    // Reseta o formulário
    setNovoCliente({ nome: '', telefone: '', email: '', dataNascimento: '' });
  }, [modoEdicao, clienteEditando, novoCliente]);

  // Inicia o modo de edição para um cliente
  const editarCliente = useCallback((cliente) => {
    setModoEdicao(true);
    setClienteEditando(cliente);
    setNovoCliente(cliente);
  }, []);

  // Remove um cliente da lista
  const excluirCliente = useCallback((id) => {
    setClientes(prev => prev.filter(c => c.id !== id));
  }, []);

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-4">Gerenciar Clientes</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              name="nome"
              value={novoCliente.nome}
              onChange={handleInputChange}
              placeholder="Nome do Cliente"
              required
            />
            <Input
              type="tel"
              name="telefone"
              value={novoCliente.telefone}
              onChange={handleInputChange}
              placeholder="Telefone"
              required
            />
            <Input
              type="email"
              name="email"
              value={novoCliente.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
            <Input
              type="date"
              name="dataNascimento"
              value={novoCliente.dataNascimento}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit" className="mt-4">
            {modoEdicao ? 'Atualizar Cliente' : 'Adicionar Cliente'}
          </Button>
        </form>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Nascimento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{cliente.nome}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{cliente.telefone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{cliente.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(cliente.dataNascimento).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button onClick={() => editarCliente(cliente)} variant="outline" className="mr-2">Editar</Button>
                    <Button onClick={() => excluirCliente(cliente.id)} variant="destructive">Excluir</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Clientes;