
import React, { useMemo } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from 'recharts';
import { Transaction, TransactionType, Category } from '../types';
import { CATEGORY_ICONS } from '../constants';
import { ArrowUpCircle, ArrowDownCircle, Wallet, Plus, CreditCard, TrendingUp, Download, RefreshCw } from 'lucide-react';

interface DashboardProps {
  transactions: Transaction[];
  onAddTransaction: () => void;
  onNavigateToAccounts: () => void;
  onNavigateToCards: () => void;
}

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const Dashboard: React.FC<DashboardProps> = ({ 
  transactions, 
  onAddTransaction, 
  onNavigateToAccounts,
  onNavigateToCards 
}) => {
  const stats = useMemo(() => {
    const income = transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((acc, curr) => acc + curr.amount, 0);
    const expense = transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((acc, curr) => acc + curr.amount, 0);
    return { income, expense, balance: income - expense };
  }, [transactions]);

  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .forEach(t => {
        counts[t.category] = (counts[t.category] || 0) + t.amount;
      });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const chartData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split('T')[0];
    });

    const totalNetLast7 = transactions
      .filter(t => t.date >= last7Days[0])
      .reduce((acc, t) => acc + (t.type === TransactionType.INCOME ? t.amount : -t.amount), 0);
    
    let runningBalance = stats.balance - totalNetLast7;

    return last7Days.map(date => {
      const dayTxs = transactions.filter(t => t.date === date);
      const inc = dayTxs.filter(t => t.type === TransactionType.INCOME).reduce((a, b) => a + b.amount, 0);
      const exp = dayTxs.filter(t => t.type === TransactionType.EXPENSE).reduce((a, b) => a + b.amount, 0);
      
      runningBalance += (inc - exp);
      
      return { 
        date: date.slice(8, 10) + '/' + date.slice(5, 7), 
        Ganho: inc, 
        Gasto: exp,
        Saldo: runningBalance
      };
    });
  }, [transactions, stats.balance]);

  const handleExportCSV = () => {
    if (transactions.length === 0) return;

    const headers = ['Data', 'Descricao', 'Valor', 'Categoria', 'Tipo'];
    const csvContent = [
      headers.join(','),
      ...transactions.map(t => [
        t.date,
        `"${t.description.replace(/"/g, '""')}"`,
        t.amount.toFixed(2),
        t.category,
        t.type
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `transacoes_meusaldo_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Visão Geral</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Bem-vindo de volta! Aqui está seu resumo financeiro.</p>
        </div>
        <div className="flex flex-wrap w-full xl:w-auto gap-3">
          <button 
            onClick={handleExportCSV}
            className="flex-1 xl:flex-none px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            title="Exportar para CSV"
          >
            <Download className="w-5 h-5 text-slate-400" />
            <span className="text-sm">Exportar</span>
          </button>
          <button 
            onClick={onNavigateToAccounts}
            className="flex-1 xl:flex-none px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
          >
            <Wallet className="w-5 h-5 text-indigo-500" />
            <span className="text-sm">Contas</span>
          </button>
          <button 
            onClick={onNavigateToCards}
            className="flex-1 xl:flex-none px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5 text-indigo-500" />
            <span className="text-sm">Cartões</span>
          </button>
          <button 
            onClick={onAddTransaction}
            className="flex-1 w-full xl:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-100 dark:shadow-none hover:scale-[1.02] active:scale-95 group"
          >
            <div className="bg-white/20 p-1 rounded-lg group-hover:rotate-90 transition-transform duration-300">
              <Plus className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm">Nova Transação</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl">
              <Wallet className="w-6 h-6" />
            </div>
            <span className="text-slate-500 dark:text-slate-400 font-medium">Saldo Atual</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">
            R$ {stats.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl">
              <ArrowUpCircle className="w-6 h-6" />
            </div>
            <span className="text-slate-500 dark:text-slate-400 font-medium">Receitas</span>
          </div>
          <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            + R$ {stats.income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-2xl">
              <ArrowDownCircle className="w-6 h-6" />
            </div>
            <span className="text-slate-500 dark:text-slate-400 font-medium">Despesas</span>
          </div>
          <div className="text-3xl font-bold text-rose-600 dark:text-rose-400">
            - R$ {stats.expense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Flow Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">Fluxo Financeiro (7 dias)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-100 dark:text-slate-800" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: 'currentColor', fontSize: 12}} className="text-slate-400 dark:text-slate-500" />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    backgroundColor: 'var(--tw-bg-opacity)',
                  }}
                  itemStyle={{ fontWeight: 'bold' }}
                  cursor={{ stroke: 'currentColor', strokeWidth: 2 }}
                  className="dark:!bg-slate-800 dark:!border-slate-700"
                />
                <Area type="monotone" dataKey="Ganho" stroke="#10b981" fillOpacity={1} fill="url(#colorInc)" strokeWidth={3} />
                <Area type="monotone" dataKey="Gasto" stroke="#ef4444" fillOpacity={1} fill="url(#colorExp)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Balance Evolution Line Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Evolução do Saldo</h3>
            <TrendingUp className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-100 dark:text-slate-800" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: 'currentColor', fontSize: 12}} className="text-slate-400 dark:text-slate-500" />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                  formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Saldo']}
                  className="dark:!bg-slate-800 dark:!border-slate-700"
                />
                <Line 
                  type="monotone" 
                  dataKey="Saldo" 
                  stroke="#6366f1" 
                  strokeWidth={4} 
                  dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Pie Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">Gastos por Categoria</h3>
          <div className="flex items-center">
            <div className="w-1/2 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-3">
              {categoryData.slice(0, 4).map((cat, idx) => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[idx % COLORS.length]}} />
                  <span className="text-sm text-slate-600 dark:text-slate-400 truncate">{cat.name}</span>
                  <span className="text-sm font-semibold ml-auto dark:text-slate-200">
                    {stats.expense > 0 ? Math.round((cat.value / stats.expense) * 100) : 0}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Atividade Recente</h3>
          <div className="space-y-4">
            {transactions.slice(0, 5).map(tx => (
              <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-2xl transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${tx.type === TransactionType.INCOME ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400'}`}>
                    {CATEGORY_ICONS[tx.category]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{tx.description}</div>
                      {tx.recurrence && <RefreshCw className="w-3 h-3 text-indigo-400 animate-spin-slow" />}
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">{tx.category} • {tx.date}</div>
                  </div>
                </div>
                <div className={`font-bold ${tx.type === TransactionType.INCOME ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
                  {tx.type === TransactionType.INCOME ? '+' : '-'} R$ {tx.amount.toFixed(2)}
                </div>
              </div>
            ))}
            {transactions.length === 0 && (
              <p className="text-center py-10 text-slate-400 italic">Nenhuma transação encontrada.</p>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
