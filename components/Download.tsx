
import React from 'react';
import { 
  Smartphone, 
  Download as DownloadIcon, 
  ShieldCheck, 
  CloudIcon, 
  Apple, 
  Play as PlayIcon, 
  Monitor,
  ArrowRight,
  Share,
  PlusSquare,
  Layers,
  Zap
} from 'lucide-react';

interface DownloadProps {
  onExportData: () => void;
  onInstallApp: () => void;
  showInstallButton: boolean;
}

const Download: React.FC<DownloadProps> = ({ onExportData, onInstallApp, showInstallButton }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex p-4 bg-indigo-600 text-white rounded-[2rem] shadow-xl shadow-indigo-200 dark:shadow-none mb-4">
          <Smartphone className="w-10 h-10" />
        </div>
        <h2 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">Leve o MeuSaldo com você</h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg">Instale nosso aplicativo em qualquer dispositivo sem precisar de lojas. É rápido, leve e seguro.</p>
        
        {showInstallButton && (
          <button 
            onClick={onInstallApp}
            className="mt-6 px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xl rounded-[2.5rem] shadow-2xl shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto"
          >
            <Zap className="w-6 h-6 fill-white" />
            INSTALAR APLICATIVO AGORA
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {/* PWA Section */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-indigo-500/10 transition-colors" />
          
          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-3">
              <Layers className="w-6 h-6 text-indigo-600" />
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Instalação Manual</h3>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-3xl shrink-0">
                  <Apple className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">iOS (iPhone/iPad)</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Toque em <Share className="inline w-4 h-4 mx-1" /> e selecione <strong>"Adicionar à Tela de Início"</strong>.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-3xl shrink-0">
                  <PlayIcon className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">Android</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Clique nos 3 pontos do navegador e escolha <strong>"Instalar Aplicativo"</strong>.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-3xl shrink-0">
                  <Monitor className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">Desktop (PC/Mac)</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Clique no ícone de <PlusSquare className="inline w-4 h-4 mx-1" /> na barra de endereços do Chrome ou Edge.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Backup Section */}
        <div className="bg-slate-900 dark:bg-slate-950 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full -ml-32 -mb-32 blur-3xl" />
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <CloudIcon className="w-6 h-6 text-indigo-400" />
                <h3 className="text-2xl font-bold">Backup de Dados</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Sua segurança é nossa prioridade. Baixe uma cópia completa de todos os seus dados locais em um arquivo seguro para importação futura.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                  Transações e Histórico
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                  Configurações de Contas
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                  Metas e Sonhos
                </li>
              </ul>
            </div>

            <button 
              onClick={onExportData}
              className="mt-12 w-full py-5 bg-white text-slate-900 font-black rounded-[2rem] hover:bg-indigo-50 transition-all flex items-center justify-center gap-3 active:scale-95 group"
            >
              <DownloadIcon className="w-6 h-6 group-hover:translate-y-0.5 transition-transform" />
              BAIXAR BACKUP AGORA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
