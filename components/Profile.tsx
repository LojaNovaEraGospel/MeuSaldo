
import React, { useState, useRef, useEffect } from 'react';
import { 
  User, Moon, Sun, Camera, Shield, Bell, ChevronRight, 
  PieChart, Link, RefreshCcw, CheckCircle2, X, Landmark,
  Lock, ArrowRight, Smartphone, Save, Download, Settings
} from 'lucide-react';
import { Budget, Category } from '../types';

interface ProfileProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  budgets: Budget[];
  onUpdateBudget: (category: Category, limit: number) => void;
  profileImage: string;
  onUpdateProfileImage: (newImage: string) => void;
  onConnectBank: (bankName: string, color: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ 
  isDarkMode, 
  onToggleDarkMode, 
  budgets, 
  onUpdateBudget,
  profileImage,
  onUpdateProfileImage,
  onConnectBank
}) => {
  const [name, setName] = useState('Lucas Silva');
  const [showBudgets, setShowBudgets] = useState(false);
  const [openFinanceStep, setOpenFinanceStep] = useState<'idle' | 'selecting' | 'syncing' | 'success'>('idle');
  const [syncProgress, setSyncProgress] = useState(0);
  const [selectedBank, setSelectedBank] = useState<{name: string, color: string} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const budgetCategories = Object.values(Category).filter(
    cat => cat !== Category.SALARY && cat !== Category.INVESTMENT
  );

  const availableBanks = [
    { name: 'Nubank', color: 'bg-purple-600', icon: 'N' },
    { name: 'Itaú', color: 'bg-orange-600', icon: 'I' },
    { name: 'Bradesco', color: 'bg-red-600', icon: 'B' },
    { name: 'Inter', color: 'bg-orange-500', icon: 'I' },
    { name: 'Santander', color: 'bg-red-700', icon: 'S' },
    { name: 'XP', color: 'bg-yellow-500', icon: 'XP' },
  ];

  useEffect(() => {
    let interval: any;
    if (openFinanceStep === 'syncing') {
      setSyncProgress(0);
      interval = setInterval(() => {
        setSyncProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            if (selectedBank) {
              onConnectBank(selectedBank.name, selectedBank.color);
            }
            setOpenFinanceStep('success');
            return 100;
          }
          return prev + 10;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [openFinanceStep, selectedBank, onConnectBank]);

  const handleImageClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Seu Perfil</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Personalize sua conta e gerencie suas preferências.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Perfil */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex flex-col items-center shadow-sm">
            <div className="relative mb-6">
              <div className="w-32 h-32 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl ring-4 ring-indigo-500/10">
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
              <button 
                onClick={handleImageClick}
                className="absolute bottom-1 right-1 p-3 bg-indigo-600 text-white rounded-full border-4 border-white dark:border-slate-900 shadow-lg hover:scale-110 active:scale-95 transition-all"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
            
            <div className="text-center space-y-1">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">{name}</h3>
              <p className="text-sm text-slate-400 font-medium">Conta Premium</p>
            </div>

            <div className="w-full mt-8 pt-8 border-t border-slate-50 dark:border-slate-800 space-y-3">
              <button 
                onClick={() => alert("Backup exportado!")}
                className="w-full py-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Baixar Backup
              </button>
            </div>
          </div>
        </div>

        {/* Configurações Principais */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card Configurações Gerais */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-50 dark:border-slate-800 font-bold flex items-center gap-2 text-slate-800 dark:text-white">
              <Settings className="w-5 h-5 text-indigo-500" />
              Preferências do Aplicativo
            </div>
            
            <div className="p-6 space-y-8">
              {/* Tema */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-indigo-900/30 text-indigo-400' : 'bg-orange-50 text-orange-500'}`}>
                    {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 dark:text-white">Modo de Visualização</div>
                    <div className="text-xs text-slate-500">Alternar entre claro e escuro</div>
                  </div>
                </div>
                <button 
                  onClick={onToggleDarkMode}
                  className={`w-14 h-8 rounded-full p-1 transition-colors ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-200'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Open Finance Status */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 rounded-2xl">
                      <Link className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        Open Finance 
                        <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 text-[10px] px-2 py-0.5 rounded-full font-black">ATIVO</span>
                      </div>
                      <div className="text-xs text-slate-500">Sincronização automática com bancos</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setOpenFinanceStep('selecting')}
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none"
                  >
                    Nova Conexão
                  </button>
                </div>

                {openFinanceStep === 'syncing' && (
                  <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 animate-in slide-in-from-top-2">
                    <div className="flex justify-between items-center mb-2 text-xs font-bold">
                      <span className="flex items-center gap-2 text-slate-500">
                        <RefreshCcw className="w-3 h-3 animate-spin" />
                        Conectando ao {selectedBank?.name}...
                      </span>
                      <span className="text-indigo-600">{syncProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 transition-all duration-300" style={{width: `${syncProgress}%`}} />
                    </div>
                  </div>
                )}
              </div>

              {/* Orçamentos / Metas de Gastos */}
              <div className="space-y-4">
                <button 
                  onClick={() => setShowBudgets(!showBudgets)}
                  className="w-full flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 rounded-2xl">
                      <PieChart className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-slate-800 dark:text-white">Metas de Gastos</div>
                      <div className="text-xs text-slate-500">Defina limites mensais por categoria</div>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-slate-300 transition-transform ${showBudgets ? 'rotate-90 text-indigo-500' : ''}`} />
                </button>

                {showBudgets && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-14 animate-in slide-in-from-top-2">
                    {budgetCategories.map(cat => (
                      <div key={cat} className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cat}</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">R$</span>
                          <input 
                            type="number" 
                            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl pl-9 pr-4 py-2 text-sm dark:text-white focus:ring-2 focus:ring-indigo-500/20 outline-none" 
                            placeholder="0,00"
                            onChange={(e) => onUpdateBudget(cat, parseFloat(e.target.value) || 0)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card Dados da Conta */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-500" />
              Dados Cadastrais
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nome de Exibição</label>
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-2xl px-5 py-3.5 border-none focus:ring-2 focus:ring-indigo-500/20 outline-none dark:text-white font-medium"
                  />
                  <button className="px-6 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Salvar
                  </button>
                </div>
              </div>
              
              <div className="p-4 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 flex items-center gap-4">
                <Lock className="w-5 h-5 text-indigo-500 shrink-0" />
                <p className="text-xs text-indigo-700 dark:text-indigo-300 font-medium">Seus dados são armazenados localmente. Ao trocar de navegador ou limpar o cache, lembre-se de usar a função de backup.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Seleção de Banco */}
      {openFinanceStep === 'selecting' && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setOpenFinanceStep('idle')} />
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-800 dark:text-white">Vincular Instituição</h3>
              <button onClick={() => setOpenFinanceStep('idle')} className="p-2 bg-slate-50 dark:bg-slate-800 rounded-full">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {availableBanks.map(bank => (
                <button 
                  key={bank.name}
                  onClick={() => {
                    setSelectedBank(bank);
                    setOpenFinanceStep('syncing');
                  }}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className={`w-16 h-16 ${bank.color} rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg transition-transform group-hover:scale-110`}>
                    {bank.icon}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{bank.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Overlay de Sucesso */}
      {openFinanceStep === 'success' && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-indigo-600/95 backdrop-blur-md animate-in fade-in duration-500" />
          <div className="relative text-center space-y-6 animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle2 className="w-12 h-12 text-indigo-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-white italic">Conexão Realizada!</h3>
              <p className="text-indigo-100 max-w-xs mx-auto">O {selectedBank?.name} agora faz parte do seu ecossistema MeuSaldo.</p>
            </div>
            <button 
              onClick={() => setOpenFinanceStep('idle')}
              className="px-10 py-4 bg-white text-indigo-600 font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto"
            >
              CONTINUAR
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
