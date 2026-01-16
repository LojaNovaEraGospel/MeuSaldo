
import React from 'react';
import { CreditCard as CardIcon, Plus, Info, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { CreditCard } from '../types';

interface CardsProps {
  cards: CreditCard[];
  onAddCard: () => void;
}

const Cards: React.FC<CardsProps> = ({ cards, onAddCard }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Meus Cartões</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Controle de limites, faturas e datas de fechamento.</p>
        </div>
        <button 
          onClick={onAddCard}
          className="w-full md:w-auto px-5 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 dark:shadow-none"
        >
          <Plus className="w-5 h-5" />
          Novo Cartão
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {cards.map((card) => {
          const usedLimit = card.limit - card.availableLimit;
          const usagePercent = (usedLimit / card.limit) * 100;
          
          return (
            <div key={card.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all duration-300">
              <div className="p-8 flex flex-col md:flex-row gap-8">
                {/* Visual Card Representation */}
                <div className={`w-full md:w-72 h-44 ${card.color} rounded-3xl p-6 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden shrink-0`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                  <div className="flex justify-between items-start">
                    <CardIcon className="w-8 h-8 opacity-80" />
                    <div className="text-xs font-black tracking-tighter opacity-80 italic">PREMIUM</div>
                  </div>
                  <div className="space-y-4">
                    <div className="text-lg font-medium tracking-widest">•••• •••• •••• 4492</div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] opacity-60 uppercase font-bold">Titular</p>
                        <p className="text-sm font-bold uppercase tracking-wider">LUCAS SILVA</p>
                      </div>
                      <div className="w-10 h-6 bg-amber-400/80 rounded-md backdrop-blur-sm" />
                    </div>
                  </div>
                </div>

                {/* Card Info */}
                <div className="flex-1 space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-bold text-slate-800 dark:text-white">{card.name}</h4>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Limite Total: R$ {card.limit.toLocaleString()}</p>
                    </div>
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Uso do Limite</span>
                      <span className="text-slate-800 dark:text-white font-bold">{usagePercent.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${usagePercent > 80 ? 'bg-rose-500' : usagePercent > 50 ? 'bg-amber-500' : 'bg-indigo-500'}`}
                        style={{ width: `${usagePercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      <span>R$ {usedLimit.toLocaleString()} usados</span>
                      <span>R$ {card.availableLimit.toLocaleString()} livres</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-50 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <Calendar className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Melhor Dia</p>
                        <p className="text-sm font-bold text-slate-800 dark:text-white">Dia {card.closingDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                        <Info className="w-4 h-4 text-rose-500" />
                      </div>
                      <div>
                        <p className="text-[10px] text-rose-400 font-bold uppercase">Vencimento</p>
                        <p className="text-sm font-bold text-slate-800 dark:text-white">Dia {card.dueDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoice Footer */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">Fatura Atual</p>
                  <p className="text-2xl font-black text-rose-600 dark:text-rose-400">
                    R$ {card.currentInvoice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <button className="px-6 py-3 bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-bold rounded-2xl border border-indigo-100 dark:border-indigo-900/50 hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2 group">
                  Pagar Fatura
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}

        {/* Info Card */}
        <div className="bg-indigo-50 dark:bg-indigo-900/10 p-8 rounded-[2.5rem] border border-indigo-100 dark:border-indigo-900/20 flex flex-col justify-center items-center text-center space-y-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-indigo-100 dark:shadow-none">
            <CardIcon className="w-10 h-10 text-indigo-500" />
          </div>
          <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-300">Dica de Gestão</h3>
          <p className="text-indigo-700/70 dark:text-indigo-400/60 max-w-xs">
            Evite utilizar mais de 30% do seu limite total para manter um bom Score de crédito e evitar juros.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
