
import React, { useState, useRef, useEffect } from 'react';
import { Wallet, Plus, RefreshCcw, ExternalLink, MoreVertical, Landmark, ArrowUpRight, ArrowDownRight, Trash2, Edit3, Check, X as CloseIcon, FileText, Calendar, Search, Link2 } from 'lucide-react';
import { BankAccount } from '../types';

interface AccountsProps {
  accounts: BankAccount[];
  onAddAccount: () => void;
  onDeleteAccount: (id: string) => void;
  onUpdateAccount: (id: string, newName: string) => void;
  onSyncAccount: (id: string) => void;
}

const Accounts: React.FC<AccountsProps> = ({ accounts, onAddAccount, onDeleteAccount, onUpdateAccount, onSyncAccount }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [selectedStatementAccount, setSelectedStatementAccount] = useState<BankAccount | null>(null);
  const [syncingAccountId, setSyncingAccountId] = useState<string | null>(null);
  
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  const handleOpenFinanceSync = (id: string) => {
    setSyncingAccountId(id);
    setActiveMenuId(null);
    setTimeout(() => {
      onSyncAccount(id);
      setSyncingAccountId(null);
    }, 2500);
  };

  const handleViewStatement = (acc: BankAccount) => {
    setSelectedStatementAccount(acc);
  };

  const toggleMenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const startEditing = (acc: BankAccount) => {
    setEditingId(acc.id);
    setEditValue(acc.name);
    setActiveMenuId(null);
  };

  const saveEdit = (id: string) => {
    if (editValue.trim()) {
      onUpdateAccount(id, editValue.trim());
    }
    setEditingId(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeMenuId) {
        const currentRef = menuRefs.current[activeMenuId];
        if (currentRef && !currentRef.contains(event.target as Node)) {
          setActiveMenuId(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeMenuId]);

  const totalBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Minhas Contas</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Gerencie suas conexões bancárias e saldos em tempo real.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="flex-1 md:flex-none px-5 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCcw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-indigo-500' : ''}`} />
            {isSyncing ? 'Sincronizando...' : 'Sincronizar'}
          </button>
          <button 
            onClick={onAddAccount}
            className="flex-1 md:flex-none px-5 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 dark:shadow-none"
          >
            <Plus className="w-5 h-5" />
            Conectar Conta
          </button>
        </div>
      </div>

      <div className="bg-indigo-600 dark:bg-indigo-700 p-8 rounded-[2.5rem] text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl shadow-indigo-200 dark:shadow-none overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="space-y-1 text-center md:text-left relative z-10">
          <p className="text-indigo-100 text-sm font-medium uppercase tracking-widest">Saldo Consolidado</p>
          <h3 className="text-4xl md:text-5xl font-black">R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
        </div>
        <div className="flex gap-4 relative z-10">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10 text-center min-w-[120px]">
            <p className="text-xs text-indigo-100 mb-1">Instituições</p>
            <p className="text-lg font-bold">{accounts.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((acc) => (
          <div key={acc.id} className="group bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 relative">
            <div className="flex justify-between items-start mb-8 relative z-20">
              <div className={`p-4 ${acc.color} rounded-2xl text-white shadow-lg relative`}>
                <Landmark className="w-6 h-6" />
                {syncingAccountId === acc.id && (
                  <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center">
                    <RefreshCcw className="w-5 h-5 animate-spin text-white" />
                  </div>
                )}
              </div>
              <div className="relative" ref={el => menuRefs.current[acc.id] = el}>
                <button 
                  onClick={(e) => toggleMenu(acc.id, e)}
                  className={`p-2 rounded-full transition-all ${activeMenuId === acc.id ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40' : 'text-slate-300 hover:text-slate-500 dark:hover:text-slate-400 bg-slate-50 dark:bg-slate-800'}`}
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
                
                {activeMenuId === acc.id && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 py-2 z-[100] animate-in fade-in zoom-in duration-200">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenFinanceSync(acc.id);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors text-left font-bold"
                    >
                      <Link2 className="w-4 h-4" />
                      Atualizar Open Finance
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditing(acc);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
                    >
                      <Edit3 className="w-4 h-4" />
                      Editar Nome
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuId(null);
                        onDeleteAccount(acc.id);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors text-left border-t border-slate-50 dark:border-slate-800"
                    >
                      <Trash2 className="w-4 h-4" />
                      Excluir Conta
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              <div>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{acc.bank}</p>
                {editingId === acc.id ? (
                  <div className="flex items-center gap-2">
                    <input 
                      autoFocus
                      className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold rounded-lg px-2 py-1 outline-none ring-2 ring-indigo-500 w-full"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && saveEdit(acc.id)}
                    />
                    <button onClick={() => saveEdit(acc.id)} className="p-1 text-emerald-500"><Check className="w-5 h-5" /></button>
                    <button onClick={() => setEditingId(null)} className="p-1 text-rose-500"><CloseIcon className="w-5 h-5" /></button>
                  </div>
                ) : (
                  <h4 className="text-xl font-bold text-slate-800 dark:text-white truncate">{acc.name}</h4>
                )}
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Saldo disponível</p>
                  <p className="text-2xl font-black text-slate-800 dark:text-white">
                    R$ {acc.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => handleViewStatement(acc)}
                className="w-full py-3 mt-2 border-2 border-dashed border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 text-sm font-bold rounded-2xl hover:border-indigo-300 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
              >
                Ver Extrato
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        <button 
          onClick={onAddAccount}
          className="h-full min-h-[250px] border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[2rem] flex flex-col items-center justify-center gap-4 group hover:border-indigo-200 transition-all"
        >
          <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-sm">
            <Plus className="w-6 h-6 text-slate-300 group-hover:text-indigo-500" />
          </div>
          <span className="text-slate-400 font-bold">Conectar Banco</span>
        </button>
      </div>

      {selectedStatementAccount && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setSelectedStatementAccount(null)} />
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
            <div className={`p-8 ${selectedStatementAccount.color} text-white flex justify-between items-center shrink-0`}>
              <div className="flex items-center gap-4">
                <Landmark className="w-8 h-8" />
                <div>
                  <h3 className="text-2xl font-black italic">{selectedStatementAccount.name}</h3>
                  <p className="text-sm opacity-80 font-bold uppercase tracking-widest">{selectedStatementAccount.bank}</p>
                </div>
              </div>
              <button onClick={() => setSelectedStatementAccount(null)} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-4 custom-scrollbar">
              <div className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-slate-800">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Lançamentos</span>
              </div>
              
              {[
                { desc: 'Transferência Recebida', value: 1200.00, date: 'Hoje', cat: 'Outros' },
                { desc: 'Supermercado Silva', value: -150.20, date: 'Hoje', cat: 'Alimentação' },
                { desc: 'Salário Mensal', value: 5500.00, date: 'Ontem', cat: 'Salário' },
                { desc: 'Netflix Premium', value: -55.90, date: '04/06', cat: 'Lazer' },
                { desc: 'Internet Fibra', value: -99.90, date: '01/06', cat: 'Moradia' },
              ].map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 group transition-all">
                  <div className="flex items-center gap-4">
                    <FileText className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">{tx.desc}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">{tx.date} • {tx.cat}</p>
                    </div>
                  </div>
                  <div className={`font-black ${tx.value > 0 ? 'text-emerald-500' : 'text-slate-700 dark:text-slate-300'}`}>
                    {tx.value > 0 ? '+' : ''} R$ {tx.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
              <div className="space-y-1">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Saldo Atual</p>
                <p className="text-2xl font-black text-slate-800 dark:text-white">R$ {selectedStatementAccount.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
              <button className="px-6 py-3 bg-indigo-600 text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-all">
                EXPORTAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounts;
