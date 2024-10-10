import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/src/ui/card";
import { Button } from "../components/src/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Scissors, Users, DollarSign, TrendingUp } from 'lucide-react';

// REMOVER: Este bloco de dados mockados deve ser removido quando integrar com o back-end
const mockData = {
  totalClientes: 1254,
  cortesRealizados: 345,
  faturamento: 12450,
  taxaCrescimento: 12,
  vendasMensais: [
    { name: 'Jan', vendas: 4000 },
    { name: 'Fev', vendas: 3000 },
    { name: 'Mar', vendas: 5000 },
    { name: 'Abr', vendas: 4500 },
    { name: 'Mai', vendas: 6000 },
    { name: 'Jun', vendas: 5500 },
  ],
  proximosAgendamentos: [
    { horario: '09:00', cliente: 'João Silva', servico: 'Corte de Cabelo' },
    { horario: '10:30', cliente: 'Maria Oliveira', servico: 'Barba' },
    { horario: '14:00', cliente: 'Carlos Santos', servico: 'Pacote Completo' },
    { horario: '16:30', cliente: 'Ana Rodrigues', servico: 'Corte de Cabelo' },
  ]
};

const StatCard = ({ title, value, icon: Icon, change }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{change}</p>
    </CardContent>
  </Card>
);

const DashboardBarbearia = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // REMOVER: Este bloco de código que simula uma chamada de API deve ser removido
    setTimeout(() => {
      setDashboardData(mockData);
    }, 1000);

    // ADICIONAR: Implemente a chamada real à API aqui
    // Exemplo:
    // fetch('/api/dashboard')
    //   .then(response => response.json())
    //   .then(data => setDashboardData(data))
    //   .catch(error => console.error('Erro ao carregar dados:', error));
  }, []);

  if (!dashboardData) return <div>Carregando...</div>;

  const statCards = [
    { title: "Total de Clientes", value: dashboardData.totalClientes, icon: Users, change: "+20% em relação ao mês passado" },
    { title: "Cortes Realizados", value: dashboardData.cortesRealizados, icon: Scissors, change: "+5% em relação ao mês passado" },
    { title: "Faturamento", value: `R$ ${dashboardData.faturamento.toFixed(2)}`, icon: DollarSign, change: "+10% em relação ao mês passado" },
    { title: "Taxa de Crescimento", value: `${dashboardData.taxaCrescimento}%`, icon: TrendingUp, change: "+2% em relação ao mês passado" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard da Barbearia</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vendas Mensais</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.vendasMensais}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="vendas" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Próximos Agendamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {dashboardData.proximosAgendamentos.map((agendamento, index) => (
                <li key={index}>{agendamento.horario} - {agendamento.cliente} ({agendamento.servico})</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button onClick={() => {
            // REMOVER: Este console.log deve ser removido
            console.log('Novo Agendamento clicado');
            // ADICIONAR: Implemente a lógica para criar um novo agendamento
            // Exemplo:
            // fetch('/api/agendamentos', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ /* dados do agendamento */ })
            // }).then(response => response.json())
            //   .then(data => { /* atualizar estado ou redirecionar */ })
            //   .catch(error => console.error('Erro ao criar agendamento:', error));
          }}>
            Novo Agendamento
          </Button>
          <Button variant="outline" onClick={() => {
            // REMOVER: Este console.log deve ser removido
            console.log('Relatório de Vendas clicado');
            // ADICIONAR: Implemente a lógica para gerar um relatório de vendas
            // Exemplo:
            // fetch('/api/relatorios/vendas')
            //   .then(response => response.blob())
            //   .then(blob => {
            //     const url = window.URL.createObjectURL(blob);
            //     const a = document.createElement('a');
            //     a.style.display = 'none';
            //     a.href = url;
            //     a.download = 'relatorio_vendas.pdf';
            //     document.body.appendChild(a);
            //     a.click();
            //     window.URL.revokeObjectURL(url);
            //   })
            //   .catch(error => console.error('Erro ao gerar relatório:', error));
          }}>
            Relatório de Vendas
          </Button>
          <Button variant="secondary" onClick={() => {
            // REMOVER: Este console.log deve ser removido
            console.log('Gerenciar Estoque clicado');
            // ADICIONAR: Implemente a navegação para a página de gerenciamento de estoque
            // Exemplo:
            // history.push('/estoque');
          }}>
            Gerenciar Estoque
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardBarbearia;