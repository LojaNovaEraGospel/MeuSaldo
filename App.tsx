
import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Bell, 
  Search, 
  User as UserIcon, 
  LogOut, 
  ChevronRight,
  Plus,
  LayoutDashboard,
  Wallet,
  SearchCheck,
  Target
} from 'lucide-react';
import { AppSection, Transaction, BankAccount, CreditCard, Goal, Budget, Category } from './types';
import { 
  MENU_ITEMS, 
  MOCK_ACCOUNTS, 
  MOCK_TRANSACTIONS, 
  MOCK_CARDS, 
  MOCK_GOALS, 
  MOCK_BUDGETS 
} from './constants';
import Dashboard from './components/Dashboard';
import Projection from './components/Projection';
import Reviewer from './components/Reviewer';
import Accounts from './components/Accounts';
import Cards from './components/Cards';
import Goals from './components/Goals';
import TransactionModal from './components/TransactionModal';
import GoalModal from './components/GoalModal';
import AccountModal from './components/AccountModal';
import CardModal from './components/CardModal';
import Profile from './components/Profile';
import Help from './components/Help';
import Contact from './components/Contact';
import Welcome from './components/Welcome';

const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(() => {
    return localStorage.getItem('isStarted') === 'true';
  });
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.DASHBOARD);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem('profileImage') || "https://picsum.photos/seed/user123/200";
  });
  
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [accounts, setAccounts] = useState<BankAccount[]>(MOCK_ACCOUNTS);
  const [cards, setCards] = useState<CreditCard[]>(MOCK_CARDS);
  const [goals, setGoals] = useState<Goal[]>(MOCK_GOALS);
  const [budgets, setBudgets] = useState<Budget[]>(MOCK_BUDGETS);

  const totalBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleStartApp = () => {
    setIsStarted(true);
    localStorage.setItem('isStarted', 'true');
  };

  const handleLogin = () => {
    setIsStarted(true);
    localStorage.setItem('isStarted', 'true');
  };

  const handleLogout = () => {
    setIsStarted(false);
    localStorage.removeItem('isStarted');
  };

  const handleUpdateProfileImage = (newImage: string) => {
    setProfileImage(newImage);
    localStorage.setItem('profileImage', newImage);
  };

  const handleConnectOpenFinance = (bankName: string, color: string) => {
    const newAccount: BankAccount = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Conta ${bankName}`,
      bank: bankName,
      balance: Math.floor(Math.random() * 5000) + 1000,
      type: 'CHECKING',
      color: color
    };
    setAccounts(prev => [newAccount, ...prev]);
  };

  const handleDeleteAccount = (id: string) => {
    if (confirm("Deseja realmente remover esta conta?")) {
      setAccounts(prev => prev.filter(acc => acc.id !== id));
      setTransactions(prev => prev.filter(tx => tx.accountId !== id));
    }
  };

  const handleUpdateAccount = (id: string, newName: string) => {
    setAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, name: newName } : acc));
  };

  const handleSyncAccount = (id: string) => {
    setAccounts(prev => prev.map(acc => {
      if (acc.id === id) {
        const variation = (Math.random() * 100) - 50;
        return { ...acc, balance: Math.max(0, acc.balance + variation) };
      }
      return acc;
    }));
  };

  const handleUpdateBudget = (category: Category, limit: number) => {
    setBudgets(prev => {
      const exists = prev.find(b => b.category === category);
      if (exists) {
        return prev.map(b => b.category === category ? { ...b, limit } : b);
      }
      return [...prev, { category, limit, spent: 0 }];
    });
  };

  const handleSaveTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTx,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTransactions(prev => [transaction, ...prev]);
    
    if (transaction.cardId) {
      setCards(prev => prev.map(card => {
        if (card.id === transaction.cardId) {
          return {
            ...card,
            availableLimit: card.availableLimit - transaction.amount,
            currentInvoice: card.currentInvoice + transaction.amount
          };
        }
        return card;
      }));
    } else {
      setAccounts(prev => prev.map(acc => {
        if (acc.id === transaction.accountId) {
          return {
            ...acc,
            balance: transaction.type === 'INCOME' 
              ? acc.balance + transaction.amount 
              : acc.balance - transaction.amount
          };
        }
        return acc;
      }));
    }
  };

  const handleSaveGoal = (newGoal: Omit<Goal, 'id'>) => {
    const goal: Goal = {
      ...newGoal,
      id: Math.random().toString(36).substr(2, 9),
    };
    setGoals(prev => [...prev, goal]);
  };

  const handleSaveAccount = (newAcc: Omit<BankAccount, 'id'>) => {
    const account: BankAccount = {
      ...newAcc,
      id: Math.random().toString(36).substr(2, 9),
    };
    setAccounts(prev => [...prev, account]);
  };

  const handleSaveCard = (newCard: Omit<CreditCard, 'id'>) => {
    const card: CreditCard = {
      ...newCard,
      id: Math.random().toString(36).substr(2, 9),
    };
    setCards(prev => [...prev, card]);
  };

  const renderContent = () => {
    switch (activeSection) {
      case AppSection.DASHBOARD:
        return (
          <Dashboard 
            transactions={transactions} 
            onAddTransaction={() => setIsTransactionModalOpen(true)} 
            onNavigateToAccounts={() => setActiveSection(AppSection.ACCOUNTS)}
            onNavigateToCards={() => setActiveSection(AppSection.CARDS)}
          />
        );
      case AppSection.ACCOUNTS:
        return (
          <Accounts 
            accounts={accounts} 
            onAddAccount={() => setIsAccountModalOpen(true)} 
            onDeleteAccount={handleDeleteAccount}
            onUpdateAccount={handleUpdateAccount}
            onSyncAccount={handleSyncAccount}
          />
        );
      case AppSection.CARDS:
        return <Cards cards={cards} onAddCard={() => setIsCardModalOpen(true)} />;
      case AppSection.GOALS:
        return <Goals goals={goals} onAddGoal={() => setIsGoalModalOpen(true)} />;
      case AppSection.PROJECTION:
        return <Projection transactions={transactions} currentBalance={totalBalance} />;
      case AppSection.REVIEWS:
        return <Reviewer transactions={transactions} />;
      case AppSection.PROFILE:
        return (
          <Profile 
            isDarkMode={isDarkMode} 
            onToggleDarkMode={toggleDarkMode} 
            budgets={budgets}
            onUpdateBudget={handleUpdateBudget}
            profileImage={profileImage}
            onUpdateProfileImage={handleUpdateProfileImage}
            onConnectBank={handleConnectOpenFinance}
          />
        );
      case AppSection.HELP:
        return <Help />;
      case AppSection.CONTACT:
        return <Contact />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[70vh] text-slate-400 dark:text-slate-500">
            <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-full mb-4">
              <Search className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-slate-600 dark:text-white">Em Desenvolvimento</h3>
            <p>A seção {activeSection} estará disponível em breve!</p>
          </div>
        );
    }
  };

  if (!isStarted) {
    return (
      <Welcome 
        onStart={handleStartApp} 
        onLogin={handleLogin} 
      />
    );
  }

  const mobileNavItems = [
    { id: AppSection.DASHBOARD, label: 'Resumo', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: AppSection.ACCOUNTS, label: 'Contas', icon: <Wallet className="w-5 h-5" /> },
    { id: AppSection.REVIEWS, label: 'IA Insights', icon: <SearchCheck className="w-5 h-5" /> },
    { id: AppSection.GOALS, label: 'Metas', icon: <Target className="w-5 h-5" /> },
    { id: AppSection.PROFILE, label: 'Perfil', icon: <UserIcon className="w-5 h-5" /> },
  ];

  return (
    <div className={`min-h-screen flex bg-[#f8fafc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300`}>
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 transition-all duration-300 ease-in-out transform 
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}
      >
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center justify-between mb-10 px-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 dark:shadow-none">
                <span className="text-white font-black text-xl">M</span>
              </div>
              <div className="font-bold text-xl tracking-tight text-slate-800 dark:text-white">
                Meu<span className="text-indigo-600">Saldo</span>
              </div>
            </div>
            {isMobile && (
              <button onClick={() => setSidebarOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar pr-2">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id as AppSection);
                  if (isMobile) setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 group
                  ${activeSection === item.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none font-semibold' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                <span className={`${activeSection === item.id ? 'text-white' : 'text-slate-400 group-hover:text-indigo-500 transition-colors'}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {activeSection === item.id && <ChevronRight className="w-4 h-4 ml-auto opacity-70" />}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl mb-4">
              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex-shrink-0">
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-bold text-slate-800 dark:text-white truncate">Lucas Silva</div>
                <div className="text-xs text-indigo-600 font-medium truncate">Perfil Ativo</div>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-3 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-2xl transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sair da Conta</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-screen max-h-screen overflow-hidden transition-colors duration-300">
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 shrink-0 transition-all">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative group hidden sm:block">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Pesquisar..." 
                className="bg-slate-50 dark:bg-slate-800 dark:text-white border-none rounded-xl pl-11 pr-4 py-2 w-48 md:w-80 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 rounded-xl transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-100 dark:bg-slate-800 mx-2 hidden md:block"></div>
            <div className="flex flex-col items-end mr-3 hidden md:flex">
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">Patrimônio Líquido</span>
              <span className="text-lg font-bold text-slate-800 dark:text-white">R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar pb-32 lg:pb-8 transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 px-2 py-1 flex items-center justify-around z-40 pb-safe pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
        {mobileNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all relative min-w-[68px]
              ${activeSection === item.id 
                ? 'text-indigo-600' 
                : 'text-slate-400 dark:text-slate-500'}`}
          >
            {activeSection === item.id && (
              <div className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl scale-90 -z-10 animate-in fade-in duration-300" />
            )}
            
            <div className={`transition-all duration-300 ${activeSection === item.id ? 'scale-110 -translate-y-1' : 'scale-100'}`}>
              {item.icon}
            </div>
            <span className={`text-[10px] font-bold leading-none tracking-tight transition-all duration-300 ${activeSection === item.id ? 'opacity-100' : 'opacity-70'}`}>
              {item.label}
            </span>
            
            {activeSection === item.id && (
              <span className="absolute -top-1 w-6 h-1 bg-indigo-600 rounded-full animate-in slide-in-from-top-1" />
            )}
          </button>
        ))}
      </nav>

      <button 
        onClick={() => {
          if (activeSection === AppSection.GOALS) setIsGoalModalOpen(true);
          else if (activeSection === AppSection.ACCOUNTS) setIsAccountModalOpen(true);
          else if (activeSection === AppSection.CARDS) setIsCardModalOpen(true);
          else setIsTransactionModalOpen(true);
        }}
        className="lg:hidden fixed bottom-28 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-30 ring-4 ring-white dark:ring-slate-950"
      >
        <Plus className="w-8 h-8" />
      </button>

      <TransactionModal 
        isOpen={isTransactionModalOpen} 
        onClose={() => setIsTransactionModalOpen(false)}
        onSave={handleSaveTransaction}
        accounts={accounts}
        cards={cards}
      />

      <GoalModal 
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        onSave={handleSaveGoal}
      />

      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        onSave={handleSaveAccount}
      />

      <CardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        onSave={handleSaveCard}
      />
    </div>
  );
};

export default App;
