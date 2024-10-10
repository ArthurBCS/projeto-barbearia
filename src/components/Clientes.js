import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "../components/src/ui/button";
import { Input } from "../components/src/ui/imput";
import { Card, CardContent, CardHeader, CardTitle } from "../components/src/ui/card";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [novoCliente, setNovoCliente] = useState({ nome: '', telefone: '', email: '', dataNascimento: '' });
  const [modoEdicao, setModoEdicao] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

  useEffect(() => {
    // TODO: Substituir por uma chamada API real
    // fetch('/api/clientes')
    //   .then(response => response.json())
    //   .then(data => setClientes(data))
    //   .catch(error => console.error('Erro ao carregar clientes:', error));

    // REMOVER: Dados mockados (remover quando integrado com o back-end)
    setClientes([
      { id: 1, nome: 'João Silva', telefone: '(11) 99999-9999', email: 'joao@email.com', dataNascimento: '1990-05-15' },
      { id: 2, nome: 'Maria Souza', telefone: '(11) 88888-8888', email: 'maria@email.com', dataNascimento: '1985-10-20' },
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoCliente(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (modoEdicao) {
      // TODO: Atualizar cliente no servidor
      // fetch(`/api/clientes/${clienteEditando.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(novoCliente)
      // }).then(response => response.json())
      //   .then(updatedCliente => {
      //     setClientes(prev => prev.map(c => c.id === updatedCliente.id ? updatedCliente : c));
      //     setModoEdicao(false);
      //   });

      // REMOVER: Lógica local (remover quando integrado com o back-end)
      setClientes(prev => prev.map(c => c.id === clienteEditando.id ? { ...clienteEditando, ...novoCliente } : c));
      setModoEdicao(false);
    } else {
      // TODO: Adicionar novo cliente no servidor
      // fetch('/api/clientes', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(novoCliente)
      // }).then(response => response.json())
      //   .then(newCliente => setClientes(prev => [...prev, newCliente]));

      // REMOVER: Lógica local (remover quando integrado com o back-end)
      setClientes(prev => [...prev, { ...novoCliente, id: Date.now() }]);
    }
    setNovoCliente({ nome: '', telefone: '', email: '', dataNascimento: '' });
  }, [modoEdicao, clienteEditando, novoCliente]);

  const editarCliente = useCallback((cliente) => {
    setModoEdicao(true);
    setClienteEditando(cliente);
    setNovoCliente(cliente);
  }, []);

  const excluirCliente = useCallback((id) => {
    // TODO: Excluir cliente no servidor
    // fetch(`/api/clientes/${id}`, { method: 'DELETE' })
    //   .then(() => setClientes(prev => prev.filter(c => c.id !== id)))
    //   .catch(error => console.error('Erro ao excluir cliente:', error));

    // REMOVER: Lógica local (remover quando integrado com o back-end)
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
