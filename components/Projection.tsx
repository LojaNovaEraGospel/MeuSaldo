
import React, { useState, useMemo } from 'react';
import { TrendingUp, Plus, Minus, Info } from 'lucide-react';
import { Transaction, TransactionType } from '../types';

interface ProjectionProps {
  transactions: Transaction[];
  currentBalance: number;
}

const Projection: React.FC<ProjectionProps> = ({ transactions, currentBalance }) => {
  const [extraIncome, setExtraIncome] = useState(0);
  const [spendingCut, setSpendingCut] = useState(0);

  const monthlyStats = useMemo(() => {
    const income = transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((acc, curr) => acc + curr.amount, 0);
    const expense = transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((acc, curr) => acc + curr.amount, 0);
    return { income, expense };
  }, [transactions]);

  const projectedBalance = currentBalance + (monthlyStats.income + extraIncome) - (monthlyStats.expense - spendingCut);
  const commitmentRate = ((monthlyStats.expense - spendingCut) / (monthlyStats.income + extraIncome)) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <TrendingUp className="w-8 h-8 text-indigo-600" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Projeção Financeira</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Simulador de Cenários</h3>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-slate-600 dark:text-slate-400 font-medium">Se eu ganhar mais (R$ / mês)</label>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">R$ {extraIncome}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="10000" 
                  step="100"
                  value={extraIncome}
                  onChange={(e) => setExtraIncome(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-slate-600 dark:text-slate-400 font-medium">Se eu gastar menos (R$ / mês)</label>
                  <span className="text-rose-500 font-bold">R$ {spendingCut}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max={Math.min(monthlyStats.expense, 5000)} 
                  step="50"
                  value={spendingCut}
                  onChange={(e) => setSpendingCut(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>
          </div>

          <div className="bg-indigo-600 dark:bg-indigo-700 p-8 rounded-3xl text-white shadow-xl shadow-indigo-100 dark:shadow-none transition-colors duration-300">
            <h3 className="text-lg opacity-80 mb-2">Saldo Previsto para Fim do Mês</h3>
            <div className="text-5xl font-bold mb-6">
              R$ {projectedBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="flex gap-4">
              <div className="bg-white/10 p-4 rounded-2xl flex-1">
                <div className="text-xs opacity-70 mb-1">Taxa de Comprometimento</div>
                <div className="text-xl font-bold">{commitmentRate.toFixed(1)}%</div>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl flex-1">
                <div className="text-xs opacity-70 mb-1">Capacidade Poupança</div>
                <div className="text-xl font-bold">R$ {(projectedBalance - currentBalance).toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-indigo-500" />
              Análise de Saúde
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <span className="text-slate-600 dark:text-slate-400">Receita Base</span>
                <span className="font-semibold dark:text-slate-200">R$ {monthlyStats.income.toFixed(2)}</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <span className="text-slate-600 dark:text-slate-400">Gastos Fixos Estim.</span>
                <span className="font-semibold dark:text-slate-200">R$ {monthlyStats.expense.toFixed(2)}</span>
              </div>
              <div className="p-4 rounded-2xl border-2 border-dashed border-slate-100 dark:border-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400 italic text-center">
                  "Com seus ajustes, você conseguirá guardar {Math.max(0, 100 - commitmentRate).toFixed(0)}% da sua renda total este mês."
                </p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-800">
            <h4 className="font-bold text-emerald-800 dark:text-emerald-400 mb-2">Dica de Projeção</h4>
            <p className="text-sm text-emerald-700 dark:text-emerald-300 leading-relaxed">
              Manter uma taxa de comprometimento abaixo de 70% é ideal para criar uma reserva de emergência sólida. Tente ajustar seus gastos variáveis para atingir esse patamar!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projection;
