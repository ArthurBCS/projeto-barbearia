import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { AlertCircle, Edit2, MoreVertical, Check, Clock, X, Calendar } from 'lucide-react';
import { Input } from "../components/ui/imput";

const tiposDeCorte = [
  { nome: "Corte Clássico", valor: 30, tempoMedio: 30 },
  { nome: "Barba", valor: 25, tempoMedio: 20 },
  { nome: "Corte + Barba", valor: 50, tempoMedio: 45 },
  { nome: "Acabamento", valor: 20, tempoMedio: 15 },
  { nome: "Pacote Completo", valor: 70, tempoMedio: 60 },
];

const AgendamentoDashboard = () => {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [tipoCorte, setTipoCorte] = useState('');
  const [valor, setValor] = useState(0);
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState(null);
  const [barbeiros, setBarbeiros] = useState([
    { id: 1, nome: "Barbeiro 1" },
    { id: 2, nome: "Barbeiro 2" },
    { id: 3, nome: "Barbeiro 3" }
  ]);
  
  const [agendamentos, setAgendamentos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [agendamentosCancelados, setAgendamentosCancelados] = useState([]);
  const [menuAbertoId, setMenuAbertoId] = useState(null);
  const [dataFiltro, setDataFiltro] = useState('');
  const [agendamentosFiltrados, setAgendamentosFiltrados] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAgendamentos(prevAgendamentos => 
        prevAgendamentos.map(agendamento => {
          const agendamentoDateTime = new Date(`${agendamento.data}T${agendamento.hora}`);
          if (agendamento.status === 'confirmado' && agendamentoDateTime < new Date()) {
            return { ...agendamento, status: 'pendente' };
          }
          return agendamento;
        })
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    filtrarAgendamentos();
  }, [agendamentos, dataFiltro]);

  const filtrarAgendamentos = () => {
    if (!dataFiltro) {
      setAgendamentosFiltrados(agendamentos);
    } else {
      const filtrados = agendamentos.filter(agendamento => agendamento.data === dataFiltro);
      setAgendamentosFiltrados(filtrados);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmado': return 'text-green-500';
      case 'pendente': return 'text-yellow-500';
      case 'cancelado': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const StatusIcon = ({ status }) => {
    switch(status) {
      case 'confirmado': return <Check className={`${getStatusColor(status)}`} />;
      case 'pendente': return <Clock className={`${getStatusColor(status)}`} />;
      case 'cancelado': return <X className={`${getStatusColor(status)}`} />;
      default: return null;
    }
  };

  const toggleMenu = (id) => {
    setMenuAbertoId(menuAbertoId === id ? null : id);
  };

  const updateStatus = (id, newStatus) => {
    if (newStatus === 'cancelado') {
      const agendamentoCancelado = agendamentos.find(ag => ag.id === id);
      setAgendamentosCancelados([...agendamentosCancelados, agendamentoCancelado]);
      setAgendamentos(agendamentos.filter(ag => ag.id !== id));
    } else {
      setAgendamentos(agendamentos.map(ag =>
        ag.id === id ? { ...ag, status: newStatus } : ag
      ));
    }
    setMenuAbertoId(null);
  };

  const verificarDisponibilidade = (data, hora, barbeiro, tempoMedio) => {
    const horaInicio = new Date(`${data}T${hora}`);
    const horaFim = new Date(horaInicio.getTime() + tempoMedio * 60000);

    return !agendamentos.some(ag => {
      if (ag.barbeiro !== barbeiro || ag.data !== data) return false;
      const agInicio = new Date(`${ag.data}T${ag.hora}`);
      const agFim = new Date(agInicio.getTime() + ag.tempoMedio * 60000);
      return (horaInicio < agFim && horaFim > agInicio);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tipoCorteObj = tiposDeCorte.find(t => t.nome === tipoCorte);
    if (!verificarDisponibilidade(data, hora, barbeiroSelecionado, tipoCorteObj.tempoMedio)) {
      alert("Horário indisponível para este barbeiro. Por favor, escolha outro horário ou barbeiro.");
      return;
    }
    const novoAgendamento = { 
      id: Date.now(), 
      nome, 
      data, 
      hora, 
      tipoCorte, 
      valor,
      tempoMedio: tipoCorteObj.tempoMedio,
      barbeiro: barbeiroSelecionado,
      status: 'confirmado' 
    };
    setAgendamentos([...agendamentos, novoAgendamento]);
    resetForm();
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const tipoCorteObj = tiposDeCorte.find(t => t.nome === tipoCorte);
    if (!verificarDisponibilidade(data, hora, barbeiroSelecionado, tipoCorteObj.tempoMedio)) {
      alert("Horário indisponível para este barbeiro. Por favor, escolha outro horário ou barbeiro.");
      return;
    }
    setAgendamentos(agendamentos.map(ag => 
      ag.id === editandoId ? { ...ag, nome, data, hora, tipoCorte, valor, barbeiro: barbeiroSelecionado, tempoMedio: tipoCorteObj.tempoMedio } : ag
    ));
    resetForm();
  };

  const handleTipoCorteChange = (e) => {
    const selectedValue = e.target.value;
    setTipoCorte(selectedValue);
    const corte = tiposDeCorte.find(tipo => tipo.nome === selectedValue);
    setValor(corte ? corte.valor : 0);
  };

  const startEditing = (agendamento) => {
    setEditandoId(agendamento.id);
    setNome(agendamento.nome);
    setData(agendamento.data);
    setHora(agendamento.hora);
    setTipoCorte(agendamento.tipoCorte);
    setValor(agendamento.valor);
    setBarbeiroSelecionado(agendamento.barbeiro);
  };

  const resetForm = () => {
    setNome('');
    setData('');
    setHora('');
    setTipoCorte('');
    setValor(0);
    setBarbeiroSelecionado('');
    setEditandoId(null);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Sistema de Agendamentos</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card de Novo Agendamento/Edição */}
          <Card className="h-full">
            <CardHeader className="bg-gray-800 text-white">
              <CardTitle className="text-xl font-semibold">
                {editandoId ? 'Editar Agendamento' : 'Novo Agendamento'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={editandoId ? saveEdit : handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <Input
                    id="nome"
                    type="text"
                    placeholder="Nome do Cliente"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      id="data"
                      type="date"
                      value={data}
                      onChange={(e) => setData(e.target.value)}
                      required
                    />
                    <Input
                      id="hora"
                      type="time"
                      value={hora}
                      onChange={(e) => setHora(e.target.value)}
                      required
                    />
                  </div>
                  <select
                    id="tipoCorte"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={tipoCorte}
                    onChange={handleTipoCorteChange}
                    required
                  >
                    <option value="">Selecione o serviço</option>
                    {tiposDeCorte.map((tipo) => (
                      <option key={tipo.nome} value={tipo.nome}>
                        {tipo.nome} - R$ {tipo.valor.toFixed(2)} ({tipo.tempoMedio} min)
                      </option>
                    ))}
                  </select>
                  <select
                    id="barbeiro"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={barbeiroSelecionado}
                    onChange={(e) => setBarbeiroSelecionado(e.target.value)}
                    required
                  >
                    <option value="">Selecione o barbeiro</option>
                    {barbeiros.map((barbeiro) => (
                      <option key={barbeiro.id} value={barbeiro.nome}>
                        {barbeiro.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xl font-bold text-blue-600">
                    Valor: R$ {valor.toFixed(2)}
                  </div>
                  <Button type="submit" className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out">
                    {editandoId ? 'Salvar Edição' : 'Agendar'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Card de Agendamentos */}
          <Card className="h-full">
            <CardHeader className="bg-black text-white">
              <CardTitle className="text-xl font-bold">Agendamentos</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-4">
                <Input
                  type="date"
                  value={dataFiltro}
                  onChange={(e) => setDataFiltro(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-4 max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
                {agendamentosFiltrados.map((agendamento) => (
                  <div key={agendamento.id} className={`bg-white p-4 rounded-md shadow border-l-4 ${getStatusColor(agendamento.status)} border-opacity-50`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{agendamento.nome}</h3>
                        <p className="text-gray-600">{agendamento.data} às {agendamento.hora}</p>
                        <p className="text-gray-600">{agendamento.tipoCorte}</p>
                        <p className="text-blue-600 font-semibold">R$ {agendamento.valor.toFixed(2)}</p>
                        <p className="text-gray-600">Barbeiro: {agendamento.barbeiro}</p>
                        <p className="text-gray-600">Duração estimada: {agendamento.tempoMedio} minutos</p>
                        <div className={`flex items-center ${getStatusColor(agendamento.status)}`}>
                          <StatusIcon status={agendamento.status} />
                          <span className="ml-1 capitalize">{agendamento.status}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => startEditing(agendamento)} className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full">
                          <Edit2 size={16} />
                        </Button>
                        <div className="relative">
                          <Button onClick={() => toggleMenu(agendamento.id)} className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-full">
                            <MoreVertical size={16} />
                          </Button>
                          {menuAbertoId === agendamento.id && (
                            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <button
                                  onClick={() => updateStatus(agendamento.id, 'confirmado')}
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                  role="menuitem"
                                >
                                  <Check className="mr-3 h-5 w-5 text-green-500" />
                                  Confirmado
                                </button>
                                <button
                                  onClick={() => updateStatus(agendamento.id, 'pendente')}
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                  role="menuitem"
                                >
                                  <Clock className="mr-3 h-5 w-5 text-yellow-500" />
                                  Pendente
                                </button>
                                <button
                                  onClick={() => updateStatus(agendamento.id, 'cancelado')}
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                  role="menuitem"
                                >
                                  <X className="mr-3 h-5 w-5 text-red-500" />
                                  Cancelar
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {agendamentosFiltrados.length === 0 && (
                  <p className="text-center text-gray-500 italic">Nenhum agendamento encontrado para esta data.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgendamentoDashboard;