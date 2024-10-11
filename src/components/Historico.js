import React, { useState, useEffect, useMemo } from 'react';
import { format, parse } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from "../components/src/ui/card";
import { Input } from "../components/src/ui/input";
import { Button } from "../components/src/ui/button";

const Historico = () => {
  const [historico, setHistorico] = useState([]);
  const [filtro, setFiltro] = useState({ cliente: '', data: '' });

  useEffect(() => {
    // NOTE: Substituir por chamada à API real quando o back-end estiver pronto
    const dadosMockados = [
      { id: 1, cliente: 'João Silva', servico: 'Corte Simples', barbeiro: 'Carlos', data: '2024-09-29', valor: 30 },
      { id: 2, cliente: 'Maria Souza', servico: 'Coloração', barbeiro: 'Ana', data: '2024-09-30', valor: 150 },
      { id: 3, cliente: 'Pedro Santos', servico: 'Corte + Barba', barbeiro: 'Carlos', data: '2024-10-01', valor: 50 },
    ];
    setHistorico(dadosMockados);
  }, []);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltro(prev => ({ ...prev, [name]: value }));
  };

  const historicoFiltrado = useMemo(() => {
    return historico.filter(item => {
      const clienteCorresponde = !filtro.cliente || 
                                 item.cliente.toLowerCase().includes(filtro.cliente.toLowerCase());
      const dataCorresponde = !filtro.data || item.data === filtro.data;
      return clienteCorresponde && dataCorresponde;
    });
  }, [historico, filtro]);

  const totalReceita = useMemo(() => {
    return historicoFiltrado.reduce((total, item) => total + item.valor, 0);
  }, [historicoFiltrado]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 p-8">
      <Card className="bg-white shadow-xl">
        <CardHeader className="bg-gray-100">
          <CardTitle className="text-3xl font-bold text-center text-gray-800">Histórico de Atendimentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-4">
            <Input
              type="text"
              name="cliente"
              value={filtro.cliente}
              onChange={handleFiltroChange}
              placeholder="Nome do Cliente"
              className="w-full"
            />
            <Input
              type="date"
              name="data"
              value={filtro.data}
              onChange={handleFiltroChange}
              className="w-full"
            />
          </div>

          <div className="overflow-x-auto bg-gray-50 rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600">Data</th>
                  <th className="px-4 py-2 text-left text-gray-600">Cliente</th>
                  <th className="px-4 py-2 text-left text-gray-600">Serviço</th>
                  <th className="px-4 py-2 text-left text-gray-600">Barbeiro</th>
                  <th className="px-4 py-2 text-right text-gray-600">Valor</th>
                </tr>
              </thead>
              <tbody>
                {historicoFiltrado.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="px-4 py-2">{format(parse(item.data, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy')}</td>
                    <td className="px-4 py-2">{item.cliente}</td>
                    <td className="px-4 py-2">{item.servico}</td>
                    <td className="px-4 py-2">{item.barbeiro}</td>
                    <td className="px-4 py-2 text-right">R$ {item.valor.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-right">
            <p className="text-xl font-semibold text-gray-800">Total de Receita: R$ {totalReceita.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Historico;