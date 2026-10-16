import React, { useState } from "react";
import granLogo from "./src/gran.png";
import {
  Printer,
  Plus,
  Trash2,
  RefreshCw,
  FileCheck,
  ShoppingCart,
  Clock,
  User,
  Calendar,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  PackageCheck,
} from "lucide-react";

export default function PedidoComprasApp() {
  // Estado inicial das informações de cabeçalho
  const [formData, setFormData] = useState({
    requerente: "Nivaldo (Manutenção & Infraestrutura)",
    dataHora: "16/10/2026 - 09:30",
    prazo: "20/10/2026",
    setor: "Infraestrutura / Almoxarifado",
    prioridade: "Alta",
    observacoes:
      "Material necessário para a manutenção preventiva das instalações desportivas e piscinas antes do evento do fim de semana.",
  });

  // Estado inicial da tabela de itens de compra
  const [itens, setItens] = useState([
    {
      id: 1,
      itemNum: "01",
      descricao: "Cloro Granulado 60% para Tratamento de Piscinas (Balde 10kg)",
      qtdAtual: "2 baldes",
      qtdMinima: "5 baldes",
      qtdIdeal: "12 baldes",
    },
    {
      id: 2,
      itemNum: "02",
      descricao: "Lâmpadas LED Tubular 18W 120cm Bivolt",
      qtdAtual: "4 un",
      qtdMinima: "15 un",
      qtdIdeal: "30 un",
    },
    {
      id: 3,
      itemNum: "03",
      descricao: "Detergente Concentrado para Limpeza de Quadras (Galão 5L)",
      qtdAtual: "1 galão",
      qtdMinima: "3 galões",
      qtdIdeal: "6 galões",
    },
    {
      id: 4,
      itemNum: "04",
      descricao: "Fita Zebrada de Sinalização 70mm x 200m",
      qtdAtual: "0 rolos",
      qtdMinima: "2 rolos",
      qtdIdeal: "5 rolos",
    },
  ]);

  const [zoom, setZoom] = useState(100);

  // Manipuladores de alterações no formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manipuladores da tabela de itens
  const handleItemChange = (id, field, value) => {
    setItens((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const adicionarItem = () => {
    const novoId =
      itens.length > 0 ? Math.max(...itens.map((i) => i.id)) + 1 : 1;
    const numFormatado = String(itens.length + 1).padStart(2, "0");
    setItens([
      ...itens,
      {
        id: novoId,
        itemNum: numFormatado,
        descricao: "",
        qtdAtual: "",
        qtdMinima: "",
        qtdIdeal: "",
      },
    ]);
  };

  const removerItem = (id) => {
    const itensFiltrados = itens.filter((item) => item.id !== id);
    // Reordenar numeração dos itens
    const itensReordenados = itensFiltrados.map((item, idx) => ({
      ...item,
      itemNum: String(idx + 1).padStart(2, "0"),
    }));
    setItens(itensReordenados);
  };

  const carregarExemplo = () => {
    const agora = new Date();
    const dataHoraAtual = `${agora.toLocaleDateString("pt-PT")} - ${agora.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" })}`;

    setFormData({
      requerente: "Ana Paula Rocha (Secretaria / Almoxarifado)",
      dataHora: dataHoraAtual,
      prazo: "25/10/2026",
      setor: "Administração Desportiva",
      prioridade: "Urgente",
      observacoes:
        "Solicitação referente ao reforço de estoque para o início das inscrições da nova época desportiva.",
    });

    setItens([
      {
        id: 1,
        itemNum: "01",
        descricao: "Papel A4 Sulfite 75g (Caixa com 10 reamas)",
        qtdAtual: "1 caixa",
        qtdMinima: "3 caixas",
        qtdIdeal: "8 caixas",
      },
      {
        id: 2,
        itemNum: "02",
        descricao: "Toner para Impressora HP LaserJet 105A",
        qtdAtual: "1 un",
        qtdMinima: "2 un",
        qtdIdeal: "5 un",
      },
      {
        id: 3,
        itemNum: "03",
        descricao: "Crachás em PVC com Cordão Personalizado GRN",
        qtdAtual: "20 un",
        qtdMinima: "50 un",
        qtdIdeal: "150 un",
      },
    ]);
  };

  const limparCampos = () => {
    setFormData({
      requerente: "",
      dataHora: "",
      prazo: "",
      setor: "",
      prioridade: "Normal",
      observacoes: "",
    });
    setItens([]);
  };

  const handleImprimir = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      {/* Regras CSS para impressão em papel A4 */}
      <style>{`
        @media print {
          body {
            background-color: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          .print-area {
            box-shadow: none !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: none !important;
            border: none !important;
            transform: none !important;
          }
          @page {
            size: A4 portrait;
            margin: 12mm;
          }
        }
      `}</style>

      {/* Barra de Navegação / Cabeçalho da Aplicação */}
      <header className="no-print sticky top-0 z-50 bg-slate-900 text-white shadow-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={granLogo}
              alt="Sociedade Esportiva Gran São João"
              className={`object-contain ${className}`}
            />
            <div>
              <h1 className="font-bold text-lg leading-tight">
                Sociedade Esportiva Gran São João
              </h1>
              <p className="text-xs text-slate-400">
                Emissão de Pedido de Compras • Comunicação Interna
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={carregarExemplo}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded border border-slate-700 flex items-center gap-1.5 transition"
              title="Preencher com dados de teste"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Exemplo
            </button>

            <button
              onClick={limparCampos}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded border border-slate-700 flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              Limpar
            </button>

            <button
              onClick={handleImprimir}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-md shadow flex items-center gap-2 transition"
            >
              <Printer className="w-4 h-4" />
              Exportar PDF / Imprimir
            </button>
          </div>
        </div>
      </header>

      {/* Layout Principal: Painel de Edição à Esquerda + Pré-visualização A4 à Direita */}
      <main className="max-w-[1600px] mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* PAINEL DE FORMULÁRIO (no-print) */}
        <section className="no-print lg:col-span-5 space-y-5">
          {/* Dados Gerais do Pedido */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <ShoppingCart className="w-5 h-5 text-emerald-700" />
              <h2 className="font-bold text-slate-800">
                Informações da Requisição
              </h2>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Requerente (Nome / Função / Setor)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    name="requerente"
                    value={formData.requerente}
                    onChange={handleInputChange}
                    placeholder="Ex: João Silva (Almoxarifado)"
                    className="w-full pl-9 pr-3 py-1.5 text-sm rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Data / Hora da Solicitação
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      name="dataHora"
                      value={formData.dataHora}
                      onChange={handleInputChange}
                      placeholder="DD/MM/AAAA - 00:00"
                      className="w-full pl-9 pr-3 py-1.5 text-sm rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Prazo Limite / Necessidade
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      name="prazo"
                      value={formData.prazo}
                      onChange={handleInputChange}
                      placeholder="DD/MM/AAAA"
                      className="w-full pl-9 pr-3 py-1.5 text-sm rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Setor Destino / Aplicação
                  </label>
                  <input
                    type="text"
                    name="setor"
                    value={formData.setor}
                    onChange={handleInputChange}
                    placeholder="Ex: Manutenção, Desporto"
                    className="w-full px-3 py-1.5 text-sm rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Prioridade
                  </label>
                  <select
                    name="prioridade"
                    value={formData.prioridade}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1.5 text-sm rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="Baixa">Baixa</option>
                    <option value="Normal">Normal</option>
                    <option value="Alta">Alta</option>
                    <option value="Urgente">Urgente</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Justificativa / Observações
                </label>
                <textarea
                  name="observacoes"
                  rows={2}
                  value={formData.observacoes}
                  onChange={handleInputChange}
                  placeholder="Justifique a necessidade das quantidades solicitadas..."
                  className="w-full px-3 py-1.5 text-sm rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Editor da Tabela de Itens */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <PackageCheck className="w-5 h-5 text-emerald-700" />
                <h2 className="font-bold text-slate-800">
                  Itens do Pedido ({itens.length})
                </h2>
              </div>
              <button
                onClick={adicionarItem}
                className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded text-xs font-semibold flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar Item
              </button>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {itens.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-lg">
                  Nenhum item adicionado. Clique em "Adicionar Item" acima.
                </div>
              ) : (
                itens.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                        Item #{item.itemNum}
                      </span>
                      <button
                        onClick={() => removerItem(item.id)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded transition"
                        title="Remover Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-500">
                        Descrição do Item
                      </label>
                      <input
                        type="text"
                        value={item.descricao}
                        onChange={(e) =>
                          handleItemChange(item.id, "descricao", e.target.value)
                        }
                        placeholder="Ex: Cloro granulado 60% (10kg)"
                        className="w-full px-2 py-1 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[10px] font-medium text-slate-500">
                          Qtd. Atual
                        </label>
                        <input
                          type="text"
                          value={item.qtdAtual}
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              "qtdAtual",
                              e.target.value,
                            )
                          }
                          placeholder="Ex: 2 un"
                          className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-medium text-slate-500">
                          Qtd. Mínima
                        </label>
                        <input
                          type="text"
                          value={item.qtdMinima}
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              "qtdMinima",
                              e.target.value,
                            )
                          }
                          placeholder="Ex: 5 un"
                          className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-medium text-slate-500">
                          Qtd. Ideal
                        </label>
                        <input
                          type="text"
                          value={item.qtdIdeal}
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              "qtdIdeal",
                              e.target.value,
                            )
                          }
                          placeholder="Ex: 10 un"
                          className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* ÁREA DE PRÉ-VISUALIZAÇÃO DA FOLHA A4 (Exportável / Imprimível) */}
        <section className="lg:col-span-7 flex flex-col items-center">
          {/* Barra de Ferramentas da Visualização */}
          <div className="no-print w-full max-w-[210mm] mb-3 flex items-center justify-between bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-emerald-600" />{" "}
              Pré-visualização A4 em Tempo Real
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom(Math.max(60, zoom - 10))}
                className="p-1 text-slate-600 hover:bg-slate-100 rounded"
                title="Reduzir Zoom"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono w-12 text-center text-slate-600">
                {zoom}%
              </span>
              <button
                onClick={() => setZoom(Math.min(130, zoom + 10))}
                className="p-1 text-slate-600 hover:bg-slate-100 rounded"
                title="Aumentar Zoom"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Documento Físico A4 */}
          <div
            className="w-full overflow-x-auto flex justify-center pb-8"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
            }}
          >
            <div className="print-area w-[210mm] min-h-[297mm] bg-white p-[15mm] shadow-2xl border border-slate-300 text-slate-900 flex flex-col justify-between font-sans box-border relative">
              <div>
                {/* CABEÇALHO DO DOCUMENTO COM IDENTIDADE GRN */}
                <div className="border-2 border-slate-800 p-4 mb-5">
                  <div className="flex items-center justify-between border-b-2 border-slate-800 pb-3 mb-3">
                    {/* Escudo / Logótipo GRN */}
                    <div className="flex items-center gap-3">
                      <img
                        src={granLogo}
                        alt="Sociedade Esportiva Gran São João"
                        className={`object-contain ${className}`}
                      />
                      <div>
                        <h2 className="font-black text-lg uppercase tracking-tight text-slate-900">
                          Sociedade Esportiva Gran São João
                        </h2>
                        <p className="text-xs font-semibold text-slate-700 tracking-wider uppercase">
                          Comunicação Interna • Departamento de Compras
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="bg-slate-900 text-white font-bold text-xs px-3 py-1 rounded tracking-wide uppercase inline-block">
                        Pedido de Compras
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 font-mono">
                        DOC-PC #{Math.floor(1000 + Math.random() * 9000)}
                      </p>
                    </div>
                  </div>

                  {/* TABELA DE METADADOS / CABEÇALHO */}
                  <div className="grid grid-cols-12 gap-2 text-xs">
                    <div className="col-span-8 bg-slate-50 border border-slate-300 p-2 rounded-sm">
                      <span className="block text-[10px] uppercase font-bold text-slate-500">
                        Requerente:
                      </span>
                      <span className="font-semibold text-slate-900">
                        {formData.requerente || "—"}
                      </span>
                    </div>

                    <div className="col-span-4 bg-slate-50 border border-slate-300 p-2 rounded-sm">
                      <span className="block text-[10px] uppercase font-bold text-slate-500">
                        Data / Hora:
                      </span>
                      <span className="font-semibold text-slate-900">
                        {formData.dataHora || "—"}
                      </span>
                    </div>

                    <div className="col-span-6 bg-slate-50 border border-slate-300 p-2 rounded-sm">
                      <span className="block text-[10px] uppercase font-bold text-slate-500">
                        Prazo p/ Atendimento:
                      </span>
                      <span className="font-semibold text-slate-900">
                        {formData.prazo || "—"}
                      </span>
                    </div>

                    <div className="col-span-3 bg-slate-50 border border-slate-300 p-2 rounded-sm">
                      <span className="block text-[10px] uppercase font-bold text-slate-500">
                        Setor / Destino:
                      </span>
                      <span className="font-semibold text-slate-900">
                        {formData.setor || "—"}
                      </span>
                    </div>

                    <div className="col-span-3 bg-slate-50 border border-slate-300 p-2 rounded-sm">
                      <span className="block text-[10px] uppercase font-bold text-slate-500">
                        Prioridade:
                      </span>
                      <span
                        className={`font-bold ${formData.prioridade === "Urgente" || formData.prioridade === "Alta" ? "text-red-700" : "text-slate-900"}`}
                      >
                        {formData.prioridade}
                      </span>
                    </div>
                  </div>
                </div>

                {/* TABELA PRINCIPAL DE ITENS SOLICITADOS */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 border-l-4 border-emerald-600 pl-2">
                    Tabela de Itens para Aquisição
                  </h3>

                  <table className="w-full border-collapse border border-slate-800 text-xs">
                    <thead>
                      <tr className="bg-slate-800 text-white">
                        <th className="border border-slate-800 py-2 px-2 text-center w-12 font-bold uppercase text-[10px]">
                          Item
                        </th>
                        <th className="border border-slate-800 py-2 px-3 text-left font-bold uppercase text-[10px]">
                          Descrição do Material / Produto
                        </th>
                        <th className="border border-slate-800 py-2 px-2 text-center w-28 font-bold uppercase text-[10px]">
                          Qtd. Atual
                        </th>
                        <th className="border border-slate-800 py-2 px-2 text-center w-32 font-bold uppercase text-[10px]">
                          Qtd. Mínima p/ Compra
                        </th>
                        <th className="border border-slate-800 py-2 px-2 text-center w-32 font-bold uppercase text-[10px]">
                          Qtd. Ideal p/ Compra
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {itens.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="border border-slate-300 py-6 text-center text-slate-400 italic"
                          >
                            Nenhum item discriminado no pedido.
                          </td>
                        </tr>
                      ) : (
                        itens.map((item, index) => (
                          <tr
                            key={item.id}
                            className={
                              index % 2 === 0 ? "bg-white" : "bg-slate-50"
                            }
                          >
                            <td className="border border-slate-400 py-2 px-2 text-center font-bold text-slate-700">
                              {item.itemNum}
                            </td>
                            <td className="border border-slate-400 py-2 px-3 text-slate-900 font-medium">
                              {item.descricao || "—"}
                            </td>
                            <td className="border border-slate-400 py-2 px-2 text-center text-slate-700 bg-amber-50/50">
                              {item.qtdAtual || "0"}
                            </td>
                            <td className="border border-slate-400 py-2 px-2 text-center text-slate-800">
                              {item.qtdMinima || "—"}
                            </td>
                            <td className="border border-slate-400 py-2 px-2 text-center font-bold text-emerald-800 bg-emerald-50/30">
                              {item.qtdIdeal || "—"}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* JUSTIFICATIVA / OBSERVAÇÕES */}
                {formData.observacoes && (
                  <div className="border border-slate-300 rounded p-3 mb-6 bg-slate-50/50">
                    <span className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                      Justificativa / Observações Adicionais:
                    </span>
                    <p className="text-xs text-slate-800 whitespace-pre-line leading-relaxed">
                      {formData.observacoes}
                    </p>
                  </div>
                )}
              </div>

              {/* SEÇÃO DE CAMPOS DE PARECER E ASSINATURAS */}
              <div className="mt-8 space-y-6">
                {/* Bloco de Despacho das Compras */}
                <div className="border border-slate-300 rounded p-3 text-xs grid grid-cols-3 gap-3 bg-slate-50">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-500 uppercase">
                      Aprovação Compras:
                    </span>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="border border-slate-400 w-3 h-3 inline-block rounded-sm"></span>{" "}
                      Aprovado
                      <span className="border border-slate-400 w-3 h-3 inline-block rounded-sm ml-2"></span>{" "}
                      Reprovado
                    </div>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-500 uppercase">
                      Cotação Nº:
                    </span>
                    <div className="border-b border-slate-400 mt-2 h-4"></div>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-500 uppercase">
                      Valor Est. Total:
                    </span>
                    <div className="border-b border-slate-400 mt-2 h-4"></div>
                  </div>
                </div>

                {/* Assinaturas */}
                <div className="grid grid-cols-3 gap-6 pt-4">
                  <div className="text-center">
                    <div className="border-t border-slate-800 pt-1.5 text-[11px] font-bold text-slate-800">
                      Requerente
                    </div>
                    <p className="text-[9px] text-slate-500">
                      Assinatura / Carimbo
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="border-t border-slate-800 pt-1.5 text-[11px] font-bold text-slate-800">
                      Gestão de Compras
                    </div>
                    <p className="text-[9px] text-slate-500">
                      Visto / Autorização
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="border-t border-slate-800 pt-1.5 text-[11px] font-bold text-slate-800">
                      Diretoria / Presidência
                    </div>
                    <p className="text-[9px] text-slate-500">
                      Aprovação Final (se aplicável)
                    </p>
                  </div>
                </div>

                {/* Rodapé institucional */}
                <div className="text-center border-t border-slate-200 pt-2 text-[9px] text-slate-400">
                  Sociedade Esportiva Gran São João • Sistema Interno de
                  Comunicação e Suprimentos
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
