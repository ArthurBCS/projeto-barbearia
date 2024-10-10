import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from "../components/src/ui/card";
import { Input } from "../components/src/ui/imput";
import { Button } from "../components/src/ui/button";

const Historico = () => {
  const [historico, setHistorico] = useState([]);
  const [filtro, setFiltro] = useState({ dataInicio: '', dataFim: '', cliente: '' });

  useEffect(() => {
    // TODO: Buscar histórico do servidor
    // fetch('/api/historico')
    //   .then(response => response.json())
    //   .then(data => setHistorico(data))
    //   .catch(error => console.error('Erro ao carregar histórico:', error));

    // REMOVER: Dados mockados (remover quando integrado com o back-end)
    setHistorico([
      { id: 1, cliente: 'João Silva', servico: 'Corte Simples', data: '2024-10-01', valor: 30 },
      { id: 2, cliente: 'Maria Souza', servico: 'Coloração', data: '2024-10-02', valor: 150 },
      { id: 3, cliente: 'Pedro Santos', servico: 'Corte + Barba', data: '2024-10-03', valor: 50 },
    ]);
  }, []);

  const handleFiltroChange = useCallback((e) => {
    const { name, value } = e.target;
    setFiltro(prev => ({ ...prev, [name]: value }));
  }, []);

  const filtrarHistorico = useCallback(() => {
    // TODO: Considerar mover esta lógica para o servidor para melhor performance com grandes volumes de dados
    return historico.filter(item => {
      const dataCorresponde = (!filtro.dataInicio || item.data >= filtro.dataInicio) &&
                              (!filtro.dataFim || item.data <= filtro.dataFim);
      const clienteCorresponde = !filtro.cliente || item.cliente.toLowerCase().includes(filtro.cliente.toLowerCase());
      return dataCorresponde && clienteCorresponde;
    });
  }, [historico, filtro]);

  const historicoFiltrado = useMemo(() => filtrarHistorico(), [filtrarHistorico]);

  const totalReceita = useMemo(() => {
    return historicoFiltrado.reduce((total, item) => total + item.valor, 0);
  }, [historicoFiltrado]);

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-4">Histórico de Atendimentos</CardTitle>
      </CardHeader>
      <CardContent>
        <Card className="mb-6 bg-white p-4 rounded-lg shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold mb-2">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                type="date"
                name="dataInicio"
                value={filtro.dataInicio}
                onChange={handleFiltroChange}
                placeholder="Data Início"
              />
              <Input
                type="date"
                name="dataFim"
                value={filtro.dataFim}
                onChange={handleFiltroChange}
                placeholder="Data Fim"
              />
              <Input
                type="text"
                name="cliente"
                value={filtro.cliente}
                onChange={handleFiltroChange}
                placeholder="Nome do Cliente"
              />
            </div>
          </CardContent>
        </Card>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serviço</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {historicoFiltrado.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{format(new Date(item.data), 'dd/MM/yyyy')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.cliente}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.servico}</td>
                  <td className="px-6 py-4 whitespace-nowrap">R$ {item.valor.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Card className="mt-4 bg-white p-4 rounded-lg shadow">
          <CardContent>
            <h3 className="text-lg font-semibold">Total de Receita: R$ {totalReceita.toFixed(2)}</h3>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default Historico;