
import React, { useState, useEffect } from 'react';
import { SearchCheck, Sparkles, AlertCircle, CheckCircle2, RefreshCw, BrainCircuit, TrendingDown, Target } from 'lucide-react';
import { Transaction } from '../types';
import { getFinancialInsights } from '../services/geminiService';

interface ReviewerProps {
  transactions: Transaction[];
}

const Reviewer: React.FC<ReviewerProps> = ({ transactions }) => {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<{ summary: string; tips: string[]; status: string } | null>(null);

  const analyze = async () => {
    if (transactions.length === 0) return;
    setLoading(true);
    const result = await getFinancialInsights(transactions);
    setInsight(result);
    setLoading(false);
  };

  useEffect(() => {
    analyze();
  }, []);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Estável': return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800';
      case 'Crítico': return 'text-rose-500 bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-800';
      default: return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-indigo-600 text-white rounded-[2rem] shadow-xl shadow-indigo-100 dark:shadow-none">
            <BrainCircuit className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white italic">IA Insight</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Seu consultor financeiro pessoal processado pelo Gemini.</p>
          </div>
        </div>
        
        <button 
          onClick={analyze}
          disabled={loading || transactions.length === 0}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-6 py-3 rounded-2xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-indigo-500' : ''}`} />
          {loading ? 'Analisando Dados...' : 'Recalcular Diagnóstico'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Card Principal de Diagnóstico */}
          <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden min-h-[400px] flex flex-col">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full -mr-40 -mt-40 blur-3xl" />
            
            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-2 mb-8">
                <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
                <span className="text-xs font-black text-indigo-500 uppercase tracking-[0.2em]">Relatório Gerencial IA</span>
              </div>

              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center space-y-6 h-full">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-indigo-100 dark:border-slate-800 rounded-full" />
                    <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-slate-800 dark:text-white font-bold text-xl">Processando Transações...</p>
                    <p className="text-slate-400 text-sm animate-pulse">O Gemini está gerando seu consultivo personalizado.</p>
                  </div>
                </div>
              ) : insight ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${getStatusColor(insight.status)}`}>
                    <div className="w-2 h-2 rounded-full bg-current animate-ping" />
                    Status: {insight.status}
                  </div>
                  
                  <p className="text-2xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed italic">
                    "{insight.summary}"
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-slate-50 dark:border-slate-800">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                      <TrendingDown className="w-6 h-6 text-rose-500 shrink-0" />
                      <div>
                        <h5 className="font-bold text-slate-800 dark:text-white text-sm">Ralo Financeiro</h5>
                        <p className="text-xs text-slate-500">Detectamos gastos acima da média em categorias variáveis.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                      <Target className="w-6 h-6 text-indigo-500 shrink-0" />
                      <div>
                        <h5 className="font-bold text-slate-800 dark:text-white text-sm">Oportunidade</h5>
                        <p className="text-xs text-slate-500">Sua capacidade de poupança pode subir 10% com ajustes simples.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-full">
                    <BrainCircuit className="w-12 h-12 text-slate-300" />
                  </div>
                  <div className="max-w-xs">
                    <h3 className="text-lg font-bold text-slate-400">Sem dados para analisar</h3>
                    <p className="text-sm text-slate-400">Adicione transações para que a IA possa gerar seu diagnóstico financeiro.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 dark:bg-slate-950 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full -mr-16 -mt-16 blur-2xl" />
            <h3 className="text-xl font-black mb-8 italic">Plano de Ação</h3>
            <ul className="space-y-6">
              {loading ? (
                Array.from({length: 3}).map((_, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-6 h-6 bg-slate-800 rounded-full animate-pulse shrink-0" />
                    <div className="h-4 bg-slate-800 w-full rounded-full animate-pulse" />
                  </li>
                ))
              ) : (
                insight?.tips.map((tip, i) => (
                  <li key={i} className="flex gap-4 group animate-in slide-in-from-right-4 duration-500" style={{ transitionDelay: `${i * 150}ms` }}>
                    <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 group-hover:scale-125 transition-transform">
                      {i + 1}
                    </div>
                    <span className="text-sm text-slate-300 leading-relaxed font-medium">{tip}</span>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/10 p-8 rounded-[3rem] border border-indigo-100 dark:border-indigo-900/20">
            <h4 className="font-black text-indigo-900 dark:text-indigo-400 text-sm uppercase tracking-widest mb-4">Sobre a IA</h4>
            <p className="text-xs text-indigo-700/70 dark:text-indigo-400/60 leading-relaxed">
              O MeuSaldo utiliza o modelo <strong>Gemini 3 Flash</strong> para processar seus dados localmente. Suas transações são enviadas de forma anônima e segura apenas para a geração deste consultivo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviewer;
