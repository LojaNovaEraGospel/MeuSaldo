
import React, { useState, useEffect } from 'react';
import { X, Calendar, Tag, CreditCard as CardIcon, DollarSign, Wallet, RefreshCw, CalendarDays } from 'lucide-react';
import { Category, TransactionType, Transaction, BankAccount, CreditCard, RecurrenceFrequency } from '../types';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Omit<Transaction, 'id'>) => void;
  accounts: BankAccount[];
  cards: CreditCard[];
}

const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, onSave, accounts, cards }) => {
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState<Category>(Category.OTHERS);
  const [accountId, setAccountId] = useState('');
  const [cardId, setCardId] = useState('');
  
  // Recurrence states
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState<RecurrenceFrequency>(RecurrenceFrequency.MONTHLY);
  const [recurrenceEndDate, setRecurrenceEndDate] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (accounts.length > 0 && !accountId) {
        setAccountId(accounts[0].id);
      }
      setCardId('');
      setIsRecurring(false);
      setRecurrenceEndDate('');
    }
  }, [isOpen, accounts, accountId]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !accountId) return;

    onSave({
      description,
      amount: parseFloat(amount),
      date,
      category,
      type,
      accountId,
      cardId: type === TransactionType.EXPENSE && cardId ? cardId : undefined,
      recurrence: isRecurring ? {
        frequency,
        endDate: recurrenceEndDate || undefined
      } : undefined
    });

    // Reset and close
    setDescription('');
    setAmount('');
    setCardId('');
    setIsRecurring(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 my-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">Nova Movimentação</h3>
          <button onClick={onClose} aria-label="Fechar modal" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Type Toggle */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
            <button
              type="button"
              onClick={() => setType(TransactionType.INCOME)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                type === TransactionType.INCOME 
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              Receita
            </button>
            <button
              type="button"
              onClick={() => setType(TransactionType.EXPENSE)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                type === TransactionType.EXPENSE 
                  ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              Despesa
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="tx-description" className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Descrição</label>
              <input
                id="tx-description"
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Aluguel, Supermercado..."
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 outline-none dark:text-white transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="tx-amount" className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Valor</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-medium">R$</div>
                  <input
                    id="tx-amount"
                    type="number"
                    step="0.01"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0,00"
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 outline-none transition-all font-bold text-slate-700 dark:text-slate-100"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="tx-date" className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Data</label>
                <input
                  id="tx-date"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 outline-none dark:text-white transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="tx-account" className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Conta</label>
                <div className="relative">
                  <select
                    id="tx-account"
                    required
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 outline-none dark:text-white transition-all appearance-none cursor-pointer"
                  >
                    {accounts.map((acc) => (
                      <option key={acc.id} value={acc.id} className="dark:bg-slate-900">
                        {acc.bank}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-500">
                    <Wallet className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="tx-category" className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Categoria</label>
                <div className="relative">
                  <select
                    id="tx-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 outline-none dark:text-white transition-all appearance-none cursor-pointer"
                  >
                    {Object.values(Category).map((cat) => (
                      <option key={cat} value={cat} className="dark:bg-slate-900">{cat}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-500">
                    <Tag className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Credit Card Selector - Only for Expenses */}
            {type === TransactionType.EXPENSE && (
              <div className="animate-in slide-in-from-top-2 duration-300">
                <label htmlFor="tx-card" className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Cartão de Crédito (Opcional)</label>
                <div className="relative">
                  <select
                    id="tx-card"
                    value={cardId}
                    onChange={(e) => setCardId(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 outline-none dark:text-white transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="dark:bg-slate-900">Nenhum cartão</option>
                    {cards.map((card) => (
                      <option key={card.id} value={card.id} className="dark:bg-slate-900">
                        {card.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-500">
                    <CardIcon className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )}

            {/* Recurrence Toggle */}
            <div className="pt-2">
              <div className="flex items-center justify-between p-4 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                    <RefreshCw className={`w-4 h-4 ${isRecurring ? 'animate-spin-slow' : ''}`} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-white leading-none">Repetir Transação</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-1">Lançamento automático recorrente</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => setIsRecurring(!isRecurring)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${isRecurring ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isRecurring ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              {isRecurring && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-300">
                  <div>
                    <label htmlFor="tx-frequency" className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Frequência</label>
                    <div className="relative">
                      <select
                        id="tx-frequency"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value as RecurrenceFrequency)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 outline-none dark:text-white transition-all appearance-none cursor-pointer text-sm"
                      >
                        <option value={RecurrenceFrequency.DAILY}>Diária</option>
                        <option value={RecurrenceFrequency.WEEKLY}>Semanal</option>
                        <option value={RecurrenceFrequency.MONTHLY}>Mensal</option>
                        <option value={RecurrenceFrequency.YEARLY}>Anual</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-500">
                        <CalendarDays className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="tx-end-date" className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Terminar em (Opcional)</label>
                    <input
                      id="tx-end-date"
                      type="date"
                      value={recurrenceEndDate}
                      onChange={(e) => setRecurrenceEndDate(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 outline-none dark:text-white transition-all text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 px-6 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-4 px-6 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 dark:shadow-none transition-all active:scale-95"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
      <style>{`
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default TransactionModal;
