
import React from 'react';
import { Target, Plus, Calendar, TrendingUp, Trophy, ArrowRight, DollarSign, Clock } from 'lucide-react';
import { Goal } from '../types';
import { CATEGORY_ICONS } from '../constants';

interface GoalsProps {
  goals: Goal[];
  onAddGoal?: () => void;
}

const Goals: React.FC<GoalsProps> = ({ goals, onAddGoal }) => {
  const totalTarget = goals.reduce((acc, g) => acc + g.targetAmount, 0);
  const totalSaved = goals.reduce((acc, g) => acc + g.currentAmount, 0);
  const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  // SVG Circle Constants
  const radius = 40;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const getDaysRemaining = (deadline: string) => {
    const diff = new Date(deadline).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Header with Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Metas & Sonhos</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Transforme seus planos em realidade com economia focada.</p>
        </div>
        <button 
          onClick={onAddGoal}
          className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 dark:shadow-none"
        >
          <Plus className="w-5 h-5" />
          Nova Meta
        </button>
      </div>

      {/* Global Progress Card */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        
        <div className="flex flex-col lg:flex-row gap-8 items-center relative z-10">
          <div className="relative w-40 h-40 flex items-center justify-center p-2">
            <svg 
              viewBox="0 0 80 80" 
              className="w-full h-full transform -rotate-90 drop-shadow-sm"
            >
              {/* Background Circle */}
              <circle
                cx="40"
                cy="40"
                r={normalizedRadius}
                fill="transparent"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                className="text-slate-100 dark:text-slate-800"
              />
              {/* Progress Circle */}
              <circle
                cx="40"
                cy="40"
                r={normalizedRadius}
                fill="transparent"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (overallProgress / 100) * circumference}
                strokeLinecap="round"
                className="text-indigo-600 transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-slate-800 dark:text-white">{Math.round(overallProgress)}%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Geral</span>
            </div>
          </div>

          <div className="flex-1 space-y-6 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-3xl border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Acumulado</p>
                <h4 className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  R$ {totalSaved.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </h4>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-3xl border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Faltam Poupar</p>
                <h4 className="text-2xl font-black text-slate-800 dark:text-white">
                  R$ {Math.max(0, totalTarget - totalSaved).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </h4>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-indigo-50/50 dark:bg-indigo-900/10 p-3 rounded-2xl">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Você está no caminho certo! Continue mantendo seus aportes mensais.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Individual Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const daysLeft = getDaysRemaining(goal.deadline);
          const monthsLeft = Math.max(1, Math.ceil(daysLeft / 30));
          const monthlyTarget = Math.max(0, (goal.targetAmount - goal.currentAmount) / monthsLeft);

          return (
            <div key={goal.id} className="group bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-indigo-100/20 dark:hover:shadow-none transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl group-hover:scale-110 transition-transform">
                    {CATEGORY_ICONS[goal.category] || <Target className="w-6 h-6" />}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white">{goal.title}</h4>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">{goal.category}</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-full text-[10px] font-black text-slate-400 uppercase">
                  {daysLeft > 0 ? `${daysLeft} dias` : 'Vencido'}
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-2xl font-black text-slate-800 dark:text-white">
                      R$ {goal.currentAmount.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      Meta: R$ {goal.targetAmount.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 rounded-full transition-all duration-1000 ease-out relative"
                      style={{ width: `${Math.min(100, progress)}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </div>
                  </div>
                  <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                    <span>{progress.toFixed(1)}% completo</span>
                    <span>R$ {Math.max(0, goal.targetAmount - goal.currentAmount).toLocaleString()} restantes</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase mb-1">
                      <Clock className="w-3 h-3" /> Prazo
                    </div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                      {new Date(goal.deadline).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="p-3 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100/50 dark:border-indigo-800/50">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-400 uppercase mb-1">
                      <TrendingUp className="w-3 h-3" /> Sugestão
                    </div>
                    <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                      R$ {monthlyTarget.toLocaleString('pt-BR')}/mês
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Aportar
                  </button>
                  <button className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add Goal Empty State Card */}
        <button 
          onClick={onAddGoal}
          className="h-full min-h-[300px] border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 group hover:border-indigo-200 dark:hover:border-indigo-900/50 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-all"
        >
          <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center group-hover:scale-110 shadow-sm transition-all">
            <Plus className="w-8 h-8 text-slate-300 group-hover:text-indigo-600" />
          </div>
          <div className="text-center">
            <p className="text-slate-500 dark:text-slate-400 font-bold">Adicionar Novo Objetivo</p>
            <p className="text-xs text-slate-400">Dê o primeiro passo para sua conquista</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Goals;
