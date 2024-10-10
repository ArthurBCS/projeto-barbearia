import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/src/ui/card";
import { Button } from "../components/src/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Scissors, Users, DollarSign, TrendingUp } from 'lucide-react';

// Dados de exemplo para o gráfico
const data = [
  { name: 'Jan', vendas: 4000 },
  { name: 'Fev', vendas: 3000 },
  { name: 'Mar', vendas: 5000 },
  { name: 'Abr', vendas: 4500 },
  { name: 'Mai', vendas: 6000 },
  { name: 'Jun', vendas: 5500 },
];

// Componente de card de estatística
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
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard da Barbearia</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total de Clientes" value="1,254" icon={Users} change="+20% em relação ao mês passado" />
        <StatCard title="Cortes Realizados" value="345" icon={Scissors} change="+5% em relação ao mês passado" />
        <StatCard title="Faturamento" value="R$ 12.450" icon={DollarSign} change="+10% em relação ao mês passado" />
        <StatCard title="Taxa de Crescimento" value="12%" icon={TrendingUp} change="+2% em relação ao mês passado" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vendas Mensais</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
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
              <li>09:00 - João Silva (Corte de Cabelo)</li>
              <li>10:30 - Maria Oliveira (Barba)</li>
              <li>14:00 - Carlos Santos</li>
              <li>14:00 - Carlos Santos (Pacote Completo)</li>
              <li>16:30 - Ana Rodrigues (Corte de Cabelo)</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button>Novo Agendamento</Button>
          <Button variant="outline">Relatório de Vendas</Button>
          <Button variant="secondary">Gerenciar Estoque</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardBarbearia;