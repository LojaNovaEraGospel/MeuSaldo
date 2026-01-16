
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

// Fixed: Added missing availableBanks definition
const availableBanks = [
  { name: 'Nubank', color: 'bg-purple-600', icon: <Landmark className="w-8 h-8" /> },
  { name: 'Inter', color: 'bg-orange-500', icon: <Landmark className="w-8 h-8" /> },
  { name: 'Itaú', color: 'bg-orange-600', icon: <Landmark className="w-8 h-8" /> },
  { name: 'Bradesco', color: 'bg-rose-600', icon: <Landmark className="w-8 h-8" /> },
  { name: 'Santander', color: 'bg-rose-700', icon: <Landmark className="w-8 h-8" /> },
  { name: 'XP', color: 'bg-yellow-500', icon: <Landmark className="w-8 h-8" /> },
];

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
  const [isSaving, setIsSaving] = useState(false);
  const [showBudgets, setShowBudgets] = useState(true);
  const [openFinanceStep, setOpenFinanceStep] = useState<'idle' | 'selecting' | 'syncing' | 'success'>('idle');
  const [syncProgress, setSyncProgress] = useState(0);
  const [selectedBank, setSelectedBank] = useState<{name: string, color: string} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const budgetCategories = Object.values(Category).filter(
    cat => cat !== Category.SALARY && cat !== Category.INVESTMENT
  );

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

  const handleSaveName = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Seu Perfil</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Personalize sua conta e gerencie suas metas financeiras.</p>
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
              <p className="text-sm text-slate-400 font-medium">Conta Ativa Local-First</p>
            </div>

            <div className="w-full mt-8 pt-8 border-t border-slate-50 dark:border-slate-800 space-y-3">
              <button 
                onClick={() => alert("Backup exportado!")}
                className="w-full py-4 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Baixar Backup Local
              </button>
            </div>
          </div>
        </div>

        {/* Configurações Principais */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dados Cadastrais */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-500" />
              Dados Cadastrais
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nome de Exibição</label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-2xl px-5 py-3.5 border-none focus:ring-2 focus:ring-indigo-500/20 outline-none dark:text-white font-medium"
                  />
                  <button 
                    onClick={handleSaveName}
                    disabled={isSaving}
                    className={`px-8 py-3.5 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${isSaving ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100 dark:shadow-none'}`}
                  >
                    {isSaving ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    {isSaving ? 'Salvo!' : 'Salvar Alteração'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preferências e App */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-50 dark:border-slate-800 font-bold flex items-center gap-2 text-slate-800 dark:text-white">
              <Settings className="w-5 h-5 text-indigo-500" />
              Configurações do Aplicativo
            </div>
            
            <div className="p-6 space-y-8">
              {/* Tema */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-indigo-900/30 text-indigo-400' : 'bg-orange-50 text-orange-500'}`}>
                    {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 dark:text-white">Modo Escuro</div>
                    <div className="text-xs text-slate-500">Alterar aparência visual</div>
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 rounded-2xl">
                    <Link className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 dark:text-white">Open Finance Brasil</div>
                    <div className="text-xs text-slate-500">Conexão segura com bancos reais</div>
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

              {/* Orçamentos / Metas de Gastos */}
              <div className="space-y-4 pt-4 border-t border-slate-50 dark:border-slate-800">
                <button 
                  onClick={() => setShowBudgets(!showBudgets)}
                  className="w-full flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 rounded-2xl">
                      <PieChart className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-slate-800 dark:text-white">Orçamentos Mensais</div>
                      <div className="text-xs text-slate-500">Defina limites para não estourar seu saldo</div>
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
                            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl pl-9 pr-4 py-2.5 text-sm dark:text-white focus:ring-2 focus:ring-indigo-500/20 outline-none" 
                            placeholder="0,00"
                            defaultValue={budgets.find(b => b.category === cat)?.limit || ''}
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
        </div>
      </div>

      {/* Modal de Seleção de Banco */}
      {openFinanceStep === 'selecting' && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setOpenFinanceStep('idle')} />
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-800 dark:text-white">Escolha o Banco</h3>
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
              <h3 className="text-3xl font-black text-white italic">Tudo Pronto!</h3>
              <p className="text-indigo-100 max-w-xs mx-auto">Sua conta do {selectedBank?.name} foi conectada com sucesso via Open Finance.</p>
            </div>
            <button 
              onClick={() => setOpenFinanceStep('idle')}
              className="px-10 py-4 bg-white text-indigo-600 font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto"
            >
              VAMOS LÁ
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
