import React, { useState } from 'react';

const Funcionarios = () => {
  const [funcionarios, setFuncionarios] = useState([
    { id: 1, nome: 'Pedro Oliveira', cargo: 'Barbeiro', telefone: '(11) 97777-7777' },
    { id: 2, nome: 'Ana Santos', cargo: 'Cabeleireira', telefone: '(11) 96666-6666' },
  ]);

  const [novoFuncionario, setNovoFuncionario] = useState({ nome: '', cargo: '', telefone: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoFuncionario({ ...novoFuncionario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (novoFuncionario.nome && novoFuncionario.cargo && novoFuncionario.telefone) {
      setFuncionarios([...funcionarios, { ...novoFuncionario, id: Date.now() }]);
      setNovoFuncionario({ nome: '', cargo: '', telefone: '' });
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gerenciar Funcionários</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="nome"
          value={novoFuncionario.nome}
          onChange={handleInputChange}
          placeholder="Nome do Funcionário"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          name="cargo"
          value={novoFuncionario.cargo}
          onChange={handleInputChange}
          placeholder="Cargo"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          name="telefone"
          value={novoFuncionario.telefone}
          onChange={handleInputChange}
          placeholder="Telefone"
          className="mr-2 p-2 border rounded"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Adicionar Funcionário
        </button>
      </form>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Nome</th>
            <th className="text-left">Cargo</th>
            <th className="text-left">Telefone</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((funcionario) => (
            <tr key={funcionario.id}>
              <td>{funcionario.nome}</td>
              <td>{funcionario.cargo}</td>
              <td>{funcionario.telefone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Funcionarios;