
"use client";

import { useState } from "react";
import {
  Activity,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Database,
  LayoutDashboard,
  Menu,
  Search,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";

const consultas = [
  {
    paciente: "Mariana Oliveira",
    medico: "Dra. Ana Costa",
    especialidade: "Cardiologia",
    horario: "08:30",
    status: "Confirmada",
  },
  {
    paciente: "Lucas Santos",
    medico: "Dr. Pedro Lima",
    especialidade: "Clínica geral",
    horario: "09:00",
    status: "Aguardando",
  },
  {
    paciente: "Beatriz Souza",
    medico: "Dra. Carla Mendes",
    especialidade: "Dermatologia",
    horario: "10:30",
    status: "Confirmada",
  },
  {
    paciente: "Rafael Ferreira",
    medico: "Dr. João Alves",
    especialidade: "Ortopedia",
    horario: "11:00",
    status: "Concluída",
  },
];

const tabelas = [
  {
    nome: "pacientes",
    campos: "id, nome, email, telefone",
    cor: "bg-blue-100 text-blue-700",
  },
  {
    nome: "medicos",
    campos: "id, nome, crm, especialidade",
    cor: "bg-violet-100 text-violet-700",
  },
  {
    nome: "consultas",
    campos: "id, paciente_id, medico_id, data_hora",
    cor: "bg-emerald-100 text-emerald-700",
  },
];

export default function Home() {
  const [busca, setBusca] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);
  const [secao, setSecao] = useState("Visão geral");
  const [mostrarSql, setMostrarSql] = useState(false);

  const filtradas = consultas.filter((consulta) =>
    `${consulta.paciente} ${consulta.medico} ${consulta.especialidade}`
      .toLowerCase()
      .includes(busca.toLowerCase())
  );

  const navegar = (nome: string, id: string) => {
    setSecao(nome);
    setMenuAberto(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <div className="flex min-h-screen">
        {/* MENU LATERAL */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200 bg-white p-5 transition-transform md:sticky md:top-0 md:flex md:h-screen md:translate-x-0 md:flex-col ${
            menuAberto ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-10 flex items-center gap-3">
            <div className="rounded-xl bg-blue-600 p-3 text-white">
              <Activity size={25} />
            </div>
            <div>
              <h1 className="font-bold tracking-tight">Clínica Cloud</h1>
              <p className="text-xs text-slate-500">Sistema acadêmico</p>
            </div>
            <button
              className="ml-auto md:hidden"
              onClick={() => setMenuAberto(false)}
              aria-label="Fechar menu"
            >
              <X size={20} />
            </button>
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Ambiente de ensino
          </p>

          <nav className="space-y-2">
            {[
              {
                nome: "Visão geral",
                id: "inicio",
                Icone: LayoutDashboard,
              },
              {
                nome: "Agendamentos",
                id: "agendamentos",
                Icone: CalendarDays,
              },
              { nome: "Pacientes", id: "pacientes", Icone: Users },
              { nome: "Banco de dados", id: "banco", Icone: Database },
              { nome: "Segurança", id: "seguranca", Icone: ShieldCheck },
            ].map(({ nome, id, Icone }) => (
              <button
                key={id}
                onClick={() => navegar(nome, id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                  secao === nome
                    ? "bg-blue-600 font-medium text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icone size={19} />
                {nome}
                {secao === nome && (
                  <ChevronRight size={16} className="ml-auto" />
                )}
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl bg-slate-900 p-4 text-white">
            <Cloud className="mb-3 text-blue-300" size={25} />
            <p className="font-semibold">Aula prática</p>
            <p className="mt-2 text-xs leading-5 text-slate-300">
              Banco de Dados 2 — 2º DSA
            </p>
            <div className="mt-4 rounded-lg bg-white/10 px-3 py-2 text-xs">
              Projeto educacional
            </div>
          </div>
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur md:px-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMenuAberto(true)}
                className="rounded-lg p-2 hover:bg-slate-100 md:hidden"
                aria-label="Abrir menu"
              >
                <Menu size={22} />
              </button>
              <div>
                <p className="text-xs text-slate-500">
                  Banco de Dados 2 / Segundo DSA
                </p>
                <p className="text-sm font-semibold">{secao}</p>
              </div>
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-slate-200 px-3 py-2 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-slate-600">
                Ambiente de demonstração
              </span>
            </div>
          </header>

          <div className="mx-auto max-w-7xl space-y-8 p-5 md:p-8">
            {/* APRESENTAÇÃO */}
            <section
              id="inicio"
              className="scroll-mt-24 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-7 text-white md:p-10"
            >
              <div className="grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium">
                    <Cloud size={15} />
                    Tecnologia em nuvem
                  </span>
                  <h2 className="mt-6 text-3xl font-bold leading-tight md:text-4xl">
                    Banco de Dados 2
                    <br />
                    <span className="text-blue-200">Segundo DSA</span>
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-blue-50 md:text-base">
                    Aula sobre bancos de dados em nuvem aplicada ao
                    desenvolvimento de um sistema de agendamento médico.
                    Aprenda como organizar, relacionar e proteger informações
                    em uma aplicação moderna.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <button
                      onClick={() => navegar("Agendamentos", "agendamentos")}
                      className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                    >
                      Explorar sistema
                    </button>
                    <button
                      onClick={() => navegar("Banco de dados", "banco")}
                      className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold hover:bg-white/10"
                    >
                      Ver estrutura SQL
                    </button>
                  </div>
                </div>

                <div className="hidden justify-center md:flex">
                  <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-white/20 bg-white/10">
                    <div className="flex h-36 w-36 items-center justify-center rounded-3xl border border-white/30 bg-white/15 shadow-2xl">
                      <Database size={76} strokeWidth={1.3} />
                    </div>
                    <div className="absolute right-0 top-5 rounded-xl bg-white p-3 text-blue-700 shadow-lg">
                      <CalendarDays size={25} />
                    </div>
                    <div className="absolute bottom-4 left-0 rounded-xl bg-white p-3 text-emerald-600 shadow-lg">
                      <CheckCircle2 size={25} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* INDICADORES */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  titulo: "Pacientes cadastrados",
                  valor: "128",
                  detalhe: "Dados ilustrativos",
                  Icone: Users,
                  cor: "bg-blue-50 text-blue-700",
                },
                {
                  titulo: "Consultas do dia",
                  valor: "24",
                  detalhe: "Agenda demonstrativa",
                  Icone: CalendarDays,
                  cor: "bg-violet-50 text-violet-700",
                },
                {
                  titulo: "Médicos cadastrados",
                  valor: "08",
                  detalhe: "Equipe fictícia",
                  Icone: Activity,
                  cor: "bg-emerald-50 text-emerald-700",
                },
                {
                  titulo: "Banco de dados",
                  valor: "Cloud",
                  detalhe: "Arquitetura proposta",
                  Icone: Database,
                  cor: "bg-amber-50 text-amber-700",
                },
              ].map(({ titulo, valor, detalhe, Icone, cor }) => (
                <article
                  key={titulo}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <p className="max-w-36 text-sm leading-5 text-slate-500">
                      {titulo}
                    </p>
                    <span className={`rounded-xl p-2.5 ${cor}`}>
                      <Icone size={21} />
                    </span>
                  </div>
                  <p className="mt-5 text-3xl font-bold tracking-tight">
                    {valor}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">{detalhe}</p>
                </article>
              ))}
            </section>

            {/* AGENDAMENTOS */}
            <section
              id="agendamentos"
              className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-xl font-bold">Agenda médica</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Exemplo de consultas armazenadas no sistema.
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5">
                  <Search size={17} className="text-slate-400" />
                  <input
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    placeholder="Buscar consulta..."
                    className="w-full bg-transparent text-sm outline-none sm:w-48"
                    aria-label="Buscar paciente, médico ou especialidade"
                  />
                </div>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[650px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400">
                      <th className="pb-4 font-medium">Horário</th>
                      <th className="pb-4 font-medium">Paciente</th>
                      <th className="pb-4 font-medium">Médico</th>
                      <th className="pb-4 font-medium">Especialidade</th>
                      <th className="pb-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtradas.map((consulta) => (
                      <tr
                        key={`${consulta.horario}-${consulta.paciente}`}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className="py-5 font-semibold">
                          {consulta.horario}
                        </td>
                        <td className="py-5 font-medium">
                          {consulta.paciente}
                        </td>
                        <td className="py-5 text-slate-600">
                          {consulta.medico}
                        </td>
                        <td className="py-5 text-slate-600">
                          {consulta.especialidade}
                        </td>
                        <td className="py-5">
                          <span
                            className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                              consulta.status === "Confirmada"
                                ? "bg-emerald-50 text-emerald-700"
                                : consulta.status === "Concluída"
                                  ? "bg-blue-50 text-blue-700"
                                  : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {consulta.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filtradas.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-8 text-center text-slate-500"
                        >
                          Nenhuma consulta encontrada.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-slate-400">
                Todos os nomes e agendamentos desta tela são fictícios.
              </p>
            </section>

            {/* MODELAGEM */}
            <section
              id="banco"
              className="scroll-mt-24 space-y-5"
            >
              <div>
                <h2 className="text-2xl font-bold">
                  Arquitetura do banco de dados
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  A estrutura relacional separa as entidades e utiliza chaves
                  estrangeiras para manter a integridade dos relacionamentos.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {tabelas.map((tabela) => (
                  <article
                    key={tabela.nome}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${tabela.cor}`}
                      >
                        TABELA
                      </span>
                      <Database size={20} className="text-slate-400" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold">
                      {tabela.nome}
                    </h3>
                    <p className="mt-2 break-words font-mono text-xs leading-6 text-slate-500">
                      {tabela.campos}
                    </p>
                  </article>
                ))}
              </div>

              <div className="rounded-2xl bg-slate-950 p-5 text-slate-100 md:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">Laboratório SQL</p>
                    <p className="mt-1 text-xs text-slate-400">
                      Exemplo de consulta relacional
                    </p>
                  </div>
                  <button
                    onClick={() => setMostrarSql(!mostrarSql)}
                    className="rounded-lg border border-slate-700 px-4 py-2 text-xs font-medium hover:bg-slate-800"
                  >
                    {mostrarSql ? "Ocultar SQL" : "Visualizar SQL"}
                  </button>
                </div>

                {mostrarSql && (
                  <pre className="mt-5 overflow-x-auto rounded-xl bg-black/30 p-4 text-xs leading-7 text-emerald-300">
{`SELECT
    p.nome AS paciente,
    m.nome AS medico,
    m.especialidade,
    c.data_hora,
    c.status
FROM consultas c
INNER JOIN pacientes p
    ON p.id = c.paciente_id
INNER JOIN medicos m
    ON m.id = c.medico_id
ORDER BY c.data_hora;`}
                  </pre>
                )}

                <div className="mt-5 flex items-start gap-3 rounded-xl border border-slate-700 p-4">
                  <Database className="mt-0.5 shrink-0 text-blue-300" size={20} />
                  <div>
                    <p className="text-sm font-medium">
                      Conceito aplicado
                    </p>
                    <p className="mt-1 text-xs leading-6 text-slate-400">
                      A consulta SQL utiliza INNER JOIN para combinar dados
                      de três tabelas por meio de suas chaves relacionadas.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* PACIENTES */}
            <section
              id="pacientes"
              className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                  <Users size={25} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    Cadastro de pacientes
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    A tabela pacientes armazena os dados necessários para
                    identificar cada paciente. A tabela consultas referencia
                    esses registros por meio de paciente_id, evitando
                    duplicação desnecessária de informações.
                  </p>
                </div>
              </div>
            </section>

            {/* SEGURANÇA */}
            <section
              id="seguranca"
              className="scroll-mt-24 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 md:p-7"
            >
              <div className="flex items-start gap-4">
                <ShieldCheck
                  className="mt-1 shrink-0 text-emerald-700"
                  size={28}
                />
                <div>
                  <h2 className="text-xl font-bold text-emerald-950">
                    Segurança e LGPD
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-emerald-900/80">
                    Informações de saúde são dados pessoais sensíveis. Um
                    sistema real exige autenticação, autorização por perfil,
                    políticas de acesso ao banco, proteção das credenciais,
                    backups e tratamento adequado dos dados conforme a LGPD.
                  </p>
                  <p className="mt-3 text-xs leading-5 text-emerald-800">
                    Esta interface é apenas uma demonstração: não está
                    conectada a um banco de dados e não implementa
                    autenticação ou controles reais de segurança.
                  </p>
                </div>
              </div>
            </section>

            <footer className="border-t border-slate-200 py-6 text-center">
              <p className="text-sm font-semibold text-slate-600">
                Banco de Dados 2 — Segundo DSA
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Aula prática: banco de dados em nuvem e agendamento médico
              </p>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
