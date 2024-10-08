import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const Historico = () => {
  const [historico, setHistorico] = useState([]);
  const [filtro, setFiltro] = useState({ dataInicio: '', dataFim: '', cliente: '' });

  useEffect(() => {
    // Aqui você carregaria o histórico do banco de dados
    // Por enquanto, vamos usar dados de exemplo
    setHistorico([
      { id: 1, cliente: 'João Silva', servico: 'Corte Simples', data: '2024-10-01', valor: 30 },
      { id: 2, cliente: 'Maria Souza', servico: 'Coloração', data: '2024-10-02', valor: 150 },
      { id: 3, cliente: 'Pedro Santos', servico: 'Corte + Barba', data: '2024-10-03', valor: 50 },
    ]);
  }, []);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltro({ ...filtro, [name]: value });
  };

  const filtrarHistorico = () => {
    return historico.filter(item => {
      const dataCorresponde = (!filtro.dataInicio || item.data >= filtro.dataInicio) &&
                              (!filtro.dataFim || item.data <= filtro.dataFim);
      const clienteCorresponde = !filtro.cliente || item.cliente.toLowerCase().includes(filtro.cliente.toLowerCase());
      return dataCorresponde && clienteCorresponde;
    });
  };

  const historicoFiltrado = filtrarHistorico();

  const calcularTotalReceita = () => {
    return historicoFiltrado.reduce((total, item) => total + item.valor, 0);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Histórico de Atendimentos</h2>
      
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="date"
            name="dataInicio"
            value={filtro.dataInicio}
            onChange={handleFiltroChange}
            className="p-2 border rounded"
            placeholder="Data Início"
          />
          <input
            type="date"
            name="dataFim"
            value={filtro.dataFim}
            onChange={handleFiltroChange}
            className="p-2 border rounded"
            placeholder="Data Fim"
          />
          <input
            type="text"
            name="cliente"
            value={filtro.cliente}
            onChange={handleFiltroChange}
            className="p-2 border rounded"
            placeholder="Nome do Cliente"
          />
        </div>
      </div>

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

      <div className="mt-4 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Total de Receita: R$ {calcularTotalReceita().toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Historico;