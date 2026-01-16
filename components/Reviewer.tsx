
import React, { useState, useEffect } from 'react';
import { SearchCheck, Sparkles, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { Transaction } from '../types';
import { getFinancialInsights } from '../services/geminiService';

interface ReviewerProps {
  transactions: Transaction[];
}

const Reviewer: React.FC<ReviewerProps> = ({ transactions }) => {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<{ summary: string; tips: string[] } | null>(null);

  const analyze = async () => {
    setLoading(true);
    const result = await getFinancialInsights(transactions);
    setInsight(result);
    setLoading(false);
  };

  useEffect(() => {
    analyze();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600 text-white rounded-2xl">
            <SearchCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Revisor de Gastos</h2>
            <p className="text-slate-500 dark:text-slate-400">Análise inteligente do seu comportamento financeiro</p>
          </div>
        </div>
        <button 
          onClick={analyze}
          disabled={loading}
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 px-4 py-2 rounded-xl transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          Recalcular Análise
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 min-h-[300px] flex flex-col">
            <div className="flex items-center gap-2 mb-6 text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-5 h-5" />
              <span className="font-bold uppercase tracking-wider text-xs">Resumo da Inteligência Artificial</span>
            </div>
            
            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-500 dark:text-slate-400 animate-pulse">Lendo suas transações...</p>
              </div>
            ) : (
              <div className="flex-1">
                <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-8">
                  {insight?.summary}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mb-2" />
                    <div className="text-xs text-emerald-800 dark:text-emerald-400 font-bold uppercase mb-1">Ponto Forte</div>
                    <div className="text-sm text-emerald-700 dark:text-emerald-300">Controle de gastos fixos está excelente este mês.</div>
                  </div>
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-800">
                    <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400 mb-2" />
                    <div className="text-xs text-amber-800 dark:text-amber-400 font-bold uppercase mb-1">Atenção</div>
                    <div className="text-sm text-amber-700 dark:text-amber-300">Gastos com lazer subiram 15% em relação à média.</div>
                  </div>
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                    <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mb-2" />
                    <div className="text-xs text-indigo-800 dark:text-indigo-400 font-bold uppercase mb-1">Sugestão</div>
                    <div className="text-sm text-indigo-700 dark:text-indigo-300">Considere antecipar parcelas do cartão para ganhar desconto.</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 dark:bg-slate-800 p-8 rounded-3xl text-white">
            <h3 className="text-xl font-bold mb-6">Dicas de Economia</h3>
            <ul className="space-y-4">
              {loading ? (
                Array.from({length: 3}).map((_, i) => (
                  <li key={i} className="h-10 bg-slate-800 dark:bg-slate-700 rounded-xl animate-pulse" />
                ))
              ) : (
                insight?.tips.map((tip, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-xs flex-shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-slate-300 text-sm">{tip}</span>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4">Comportamento Geral</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500 dark:text-slate-400">Essenciais</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200">60%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[60%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500 dark:text-slate-400">Lazer</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200">25%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[25%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500 dark:text-slate-400">Dívidas</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200">15%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 w-[15%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviewer;
