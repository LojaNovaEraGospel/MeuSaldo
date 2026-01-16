
import React, { useState } from 'react';
import { X, Landmark, DollarSign, CreditCard, Wallet } from 'lucide-react';
import { BankAccount } from '../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (account: Omit<BankAccount, 'id'>) => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [bank, setBank] = useState('');
  const [balance, setBalance] = useState('');
  const [type, setType] = useState<'CHECKING' | 'SAVINGS' | 'INVESTMENT'>('CHECKING');
  const [color, setColor] = useState('bg-indigo-600');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !bank || !balance) return;

    onSave({
      name,
      bank,
      balance: parseFloat(balance),
      type,
      color,
    });

    // Reset and close
    setName('');
    setBank('');
    setBalance('');
    onClose();
  };

  const colors = [
    { name: 'Indigo', class: 'bg-indigo-600' },
    { name: 'Purple', class: 'bg-purple-600' },
    { name: 'Emerald', class: 'bg-emerald-600' },
    { name: 'Rose', class: 'bg-rose-600' },
    { name: 'Amber', class: 'bg-amber-500' },
    { name: 'Sky', class: 'bg-sky-500' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 my-auto">
        <div className="flex items-center justify-between p-8 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-xl text-white">
              <Landmark className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Conectar Instituição</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 ml-1">Instituição Financeira</label>
              <input
                type="text"
                required
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                placeholder="Ex: Nubank, Itaú, Santander..."
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500/20 outline-none dark:text-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 ml-1">Apelido da Conta</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Conta Corrente Principal"
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500/20 outline-none dark:text-white transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 ml-1">Saldo Inicial</label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold">R$</div>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    placeholder="0,00"
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl pl-12 pr-5 py-4 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-bold text-slate-700 dark:text-slate-100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 ml-1">Tipo de Conta</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500/20 outline-none dark:text-white transition-all appearance-none cursor-pointer"
                >
                  <option value="CHECKING">Corrente</option>
                  <option value="SAVINGS">Poupança</option>
                  <option value="INVESTMENT">Investimento</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 ml-1">Cor do Card</label>
              <div className="flex flex-wrap gap-3 p-1">
                {colors.map((c) => (
                  <button
                    key={c.class}
                    type="button"
                    onClick={() => setColor(c.class)}
                    className={`w-10 h-10 rounded-xl transition-all ${c.class} ${color === c.class ? 'ring-4 ring-offset-2 ring-indigo-500 scale-110' : 'opacity-60 hover:opacity-100'}`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-4 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100 dark:shadow-none transition-all active:scale-95"
            >
              Vincular Conta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountModal;
