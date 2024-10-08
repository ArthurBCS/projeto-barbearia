import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "../components/src/ui/button";
import { Input } from "../components/src/ui/imput";
import { Card, CardContent, CardHeader, CardTitle } from "../components/src/ui/card";

const Funcionarios = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [novoFuncionario, setNovoFuncionario] = useState({ nome: '', cargo: '', telefone: '' });

  useEffect(() => {
    // TODO: Buscar funcionários do servidor
    // fetch('/api/funcionarios')
    //   .then(response => response.json())
    //   .then(data => setFuncionarios(data))
    //   .catch(error => console.error('Erro ao carregar funcionários:', error));

    // REMOVER: Dados mockados (remover quando integrado com o back-end)
    setFuncionarios([
      { id: 1, nome: 'Pedro Oliveira', cargo: 'Barbeiro', telefone: '(11) 97777-7777' },
      { id: 2, nome: 'Ana Santos', cargo: 'Cabeleireira', telefone: '(11) 96666-6666' },
    ]);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setNovoFuncionario(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (novoFuncionario.nome && novoFuncionario.cargo && novoFuncionario.telefone) {
      // TODO: Adicionar novo funcionário no servidor
      // fetch('/api/funcionarios', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(novoFuncionario)
      // }).then(response => response.json())
      //   .then(newFuncionario => {
      //     setFuncionarios(prev => [...prev, newFuncionario]);
      //     setNovoFuncionario({ nome: '', cargo: '', telefone: '' });
      //   })
      //   .catch(error => console.error('Erro ao adicionar funcionário:', error));

      // REMOVER: Lógica local (remover quando integrado com o back-end)
      setFuncionarios(prev => [...prev, { ...novoFuncionario, id: Date.now() }]);
      setNovoFuncionario({ nome: '', cargo: '', telefone: '' });
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }, [novoFuncionario]);

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-4">Gerenciar Funcionários</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="text"
              name="nome"
              value={novoFuncionario.nome}
              onChange={handleInputChange}
              placeholder="Nome do Funcionário"
              required
            />
            <Input
              type="text"
              name="cargo"
              value={novoFuncionario.cargo}
              onChange={handleInputChange}
              placeholder="Cargo"
              required
            />
            <Input
              type="tel"
              name="telefone"
              value={novoFuncionario.telefone}
              onChange={handleInputChange}
              placeholder="Telefone"
              required
            />
          </div>
          <Button type="submit" className="mt-4">
            Adicionar Funcionário
          </Button>
        </form>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {funcionarios.map((funcionario) => (
                <tr key={funcionario.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{funcionario.nome}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{funcionario.cargo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{funcionario.telefone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Funcionarios;