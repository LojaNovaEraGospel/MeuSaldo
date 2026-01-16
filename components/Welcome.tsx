
import React from 'react';
import { ShieldCheck, TrendingUp, Sparkles, ArrowRight, Wallet, PieChart, Lock } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
  onLogin: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart, onLogin }) => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/20 rounded-full blur-[120px] animate-pulse" />
      
      <div className="max-w-4xl w-full z-10 space-y-12 my-auto">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-bold tracking-wide animate-bounce">
            <Sparkles className="w-4 h-4" />
            INTELIGÊNCIA FINANCEIRA AO SEU ALCANCE
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            Domine suas finanças com <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Consciência.</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Grana Consciente | MeuSaldo é o seu novo parceiro para organizar gastos, planejar metas e projetar seu futuro financeiro com IA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-700/50 hover:border-indigo-500/50 transition-all group">
            <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform">
              <Wallet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Gestão Ágil</h3>
            <p className="text-sm text-slate-500">Controle contas e cartões em um único lugar de forma intuitiva.</p>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-700/50 hover:border-emerald-500/50 transition-all group">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Projeções IA</h3>
            <p className="text-sm text-slate-500">Saiba quanto você terá no final do mês antes mesmo de gastar.</p>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-700/50 hover:border-amber-500/50 transition-all group">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform">
              <PieChart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Metas Reais</h3>
            <p className="text-sm text-slate-500">Transforme sonhos em metas alcançáveis com lembretes inteligentes.</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 pt-8">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button 
              onClick={onStart}
              className="group relative px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xl rounded-[2rem] shadow-2xl shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              ACESSAR AGORA
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            
            <button 
              onClick={onLogin}
              className="group relative px-10 py-5 bg-transparent border-2 border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800 text-white font-bold text-lg rounded-[2rem] transition-all flex items-center justify-center gap-3"
            >
              <Lock className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
              FAZER LOGIN
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <ShieldCheck className="w-4 h-4" />
            Criptografia de ponta a ponta em todos os seus dados
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 flex items-center gap-3 opacity-30">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-white">M</div>
        <div className="font-bold text-lg">MeuSaldo</div>
      </div>
    </div>
  );
};

export default Welcome;
