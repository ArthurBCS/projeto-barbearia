import React, { useState, useEffect } from 'react';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [novoCliente, setNovoCliente] = useState({ nome: '', telefone: '', email: '', dataNascimento: '' });
  const [modoEdicao, setModoEdicao] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

  useEffect(() => {
    // Aqui você carregaria os clientes do banco de dados
    // Por enquanto, vamos usar dados de exemplo
    setClientes([
      { id: 1, nome: 'João Silva', telefone: '(11) 99999-9999', email: 'joao@email.com', dataNascimento: '1990-05-15' },
      { id: 2, nome: 'Maria Souza', telefone: '(11) 88888-8888', email: 'maria@email.com', dataNascimento: '1985-10-20' },
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoCliente({ ...novoCliente, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modoEdicao) {
      setClientes(clientes.map(c => c.id === clienteEditando.id ? { ...clienteEditando, ...novoCliente } : c));
      setModoEdicao(false);
    } else {
      setClientes([...clientes, { ...novoCliente, id: Date.now() }]);
    }
    setNovoCliente({ nome: '', telefone: '', email: '', dataNascimento: '' });
  };

  const editarCliente = (cliente) => {
    setModoEdicao(true);
    setClienteEditando(cliente);
    setNovoCliente(cliente);
  };

  const excluirCliente = (id) => {
    setClientes(clientes.filter(c => c.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gerenciar Clientes</h2>
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="nome"
            value={novoCliente.nome}
            onChange={handleInputChange}
            placeholder="Nome do Cliente"
            className="p-2 border rounded"
            required
          />
          <input
            type="tel"
            name="telefone"
            value={novoCliente.telefone}
            onChange={handleInputChange}
            placeholder="Telefone"
            className="p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={novoCliente.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="p-2 border rounded"
            required
          />
          <input
            type="date"
            name="dataNascimento"
            value={novoCliente.dataNascimento}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {modoEdicao ? 'Atualizar Cliente' : 'Adicionar Cliente'}
        </button>
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
                  <button onClick={() => editarCliente(cliente)} className="text-indigo-600 hover:text-indigo-900 mr-2">Editar</button>
                  <button onClick={() => excluirCliente(cliente.id)} className="text-red-600 hover:text-red-900">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clientes;