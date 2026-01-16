
import React, { useState } from 'react';
import { X, Target, DollarSign, Calendar, Tag } from 'lucide-react';
import { Category, Goal } from '../types';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: Omit<Goal, 'id'>) => void;
}

const GoalModal: React.FC<GoalModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState<Category>(Category.INVESTMENT);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !targetAmount || !deadline) return;

    onSave({
      title,
      targetAmount: parseFloat(targetAmount),
      currentAmount: 0,
      deadline,
      category,
    });

    // Reset and close
    setTitle('');
    setTargetAmount('');
    setDeadline('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-8 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-xl text-white">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Novo Objetivo</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 ml-1">O que você quer conquistar?</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Viagem para a Disney, Carro Novo..."
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500/20 outline-none dark:text-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 ml-1">Quanto custa esse sonho?</label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold">R$</div>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  placeholder="0,00"
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl pl-12 pr-5 py-4 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-bold text-slate-700 dark:text-slate-100 text-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 ml-1">Prazo final</label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500/20 outline-none dark:text-white transition-all appearance-none"
                  />
                  <Calendar className="w-4 h-4 absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 ml-1">Categoria</label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500/20 outline-none dark:text-white transition-all appearance-none cursor-pointer"
                  >
                    {Object.values(Category).map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <Tag className="w-4 h-4 absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
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
              Criar Meta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalModal;
