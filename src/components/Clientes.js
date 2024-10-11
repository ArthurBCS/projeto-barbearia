import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "../components/src/ui/button";
import { Input } from "./src/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/src/ui/card";
import { PlusCircle, Edit, Trash2, Search } from 'lucide-react'; // Assumindo que você está usando lucide-react para ícones

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [novoCliente, setNovoCliente] = useState({ nome: '', telefone: '', email: '', dataNascimento: '' });
  const [modoEdicao, setModoEdicao] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [pesquisa, setPesquisa] = useState('');

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

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
    cliente.email.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-8">
      <Card className="bg-white shadow-xl">
        <CardHeader className="bg-gray-100 border-b">
          <CardTitle className="text-3xl font-bold text-gray-800">Gerenciar Clientes</CardTitle>
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
          
          <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              {modoEdicao ? 'Editar Cliente' : 'Adicionar Novo Cliente'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                name="nome"
                value={novoCliente.nome}
                onChange={handleInputChange}
                placeholder="Nome do Cliente"
                required
                className="bg-white"
              />
              <Input
                type="tel"
                name="telefone"
                value={novoCliente.telefone}
                onChange={handleInputChange}
                placeholder="Telefone"
                required
                className="bg-white"
              />
              <Input
                type="email"
                name="email"
                value={novoCliente.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
                className="bg-white"
              />
              <Input
                type="date"
                name="dataNascimento"
                value={novoCliente.dataNascimento}
                onChange={handleInputChange}
                required
                className="bg-white"
              />
            </div>
            <Button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700">
              {modoEdicao ? <Edit className="mr-2" size={16} /> : <PlusCircle className="mr-2" size={16} />}
              {modoEdicao ? 'Atualizar Cliente' : 'Adicionar Cliente'}
            </Button>
          </form>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Telefone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Data de Nascimento</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {clientesFiltrados.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{cliente.nome}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{cliente.telefone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{cliente.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(cliente.dataNascimento).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button onClick={() => editarCliente(cliente)} variant="outline" className="mr-2">
                        <Edit size={16} className="mr-1" /> Editar
                      </Button>
                      <Button onClick={() => excluirCliente(cliente.id)} variant="destructive">
                        <Trash2 size={16} className="mr-1" /> Excluir
                      </Button>
                    </td>
                  </tr>
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