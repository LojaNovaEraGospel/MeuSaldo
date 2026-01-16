
import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  CreditCard as CardIcon, 
  TrendingUp, 
  SearchCheck, 
  Target, 
  User, 
  BookOpen, 
  MessageSquare,
  Utensils,
  Home,
  Bus,
  Tv,
  Stethoscope,
  GraduationCap,
  Banknote,
  Briefcase
} from 'lucide-react';
import { Category, TransactionType, AppSection, BankAccount, Transaction, CreditCard, Goal, Budget } from './types';

export const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  [Category.FOOD]: <Utensils className="w-4 h-4" />,
  [Category.HOUSING]: <Home className="w-4 h-4" />,
  [Category.TRANSPORT]: <Bus className="w-4 h-4" />,
  [Category.ENTERTAINMENT]: <Tv className="w-4 h-4" />,
  [Category.HEALTH]: <Stethoscope className="w-4 h-4" />,
  [Category.EDUCATION]: <GraduationCap className="w-4 h-4" />,
  [Category.SALARY]: <Banknote className="w-4 h-4" />,
  [Category.INVESTMENT]: <TrendingUp className="w-4 h-4" />,
  [Category.OTHERS]: <Briefcase className="w-4 h-4" />,
};

export const MENU_ITEMS = [
  { id: AppSection.DASHBOARD, label: 'Resumo', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: AppSection.ACCOUNTS, label: 'Contas', icon: <Wallet className="w-5 h-5" /> },
  { id: AppSection.CARDS, label: 'Cartões', icon: <CardIcon className="w-5 h-5" /> },
  { id: AppSection.PROJECTION, label: 'Projeção', icon: <TrendingUp className="w-5 h-5" /> },
  { id: AppSection.REVIEWS, label: 'Revisor', icon: <SearchCheck className="w-5 h-5" /> },
  { id: AppSection.GOALS, label: 'Metas', icon: <Target className="w-5 h-5" /> },
  { id: AppSection.PROFILE, label: 'Perfil', icon: <User className="w-5 h-5" /> },
  { id: AppSection.HELP, label: 'Como Usar', icon: <BookOpen className="w-5 h-5" /> },
  { id: AppSection.CONTACT, label: 'Suporte', icon: <MessageSquare className="w-5 h-5" /> },
];

export const MOCK_ACCOUNTS: BankAccount[] = [
  { id: '1', name: 'Conta Corrente', bank: 'Nubank', balance: 2450.75, type: 'CHECKING', color: 'bg-purple-600' },
  { id: '2', name: 'Investimentos', bank: 'XP Investimentos', balance: 12000.00, type: 'INVESTMENT', color: 'bg-yellow-500' },
  { id: '3', name: 'Reserva', bank: 'Inter', balance: 5000.00, type: 'SAVINGS', color: 'bg-orange-500' },
];

export const MOCK_CARDS: CreditCard[] = [
  { id: 'c1', name: 'Nubank Ultravioleta', limit: 10000, availableLimit: 7200, currentInvoice: 2800, closingDate: 5, dueDate: 12, color: 'bg-purple-900' },
  { id: 'c2', name: 'Inter Platinum', limit: 5000, availableLimit: 4800, currentInvoice: 200, closingDate: 15, dueDate: 22, color: 'bg-orange-600' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', description: 'Salário Mensal', amount: 5500, date: '2024-05-01', category: Category.SALARY, type: TransactionType.INCOME, accountId: '1' },
  { id: 't2', description: 'Supermercado', amount: 450.20, date: '2024-05-02', category: Category.FOOD, type: TransactionType.EXPENSE, accountId: '1' },
  { id: 't3', description: 'Gasolina', amount: 120.00, date: '2024-05-03', category: Category.TRANSPORT, type: TransactionType.EXPENSE, accountId: '1' },
  { id: 't4', description: 'Internet Fibra', amount: 99.90, date: '2024-05-05', category: Category.HOUSING, type: TransactionType.EXPENSE, accountId: '1' },
  { id: 't5', description: 'Restaurante Fim de Semana', amount: 180.50, date: '2024-05-06', category: Category.FOOD, type: TransactionType.EXPENSE, accountId: '1' },
  { id: 't6', description: 'Freelance Design', amount: 1200, date: '2024-05-10', category: Category.SALARY, type: TransactionType.INCOME, accountId: '1' },
];

export const MOCK_GOALS: Goal[] = [
  { id: 'g1', title: 'Viagem Japão', targetAmount: 15000, currentAmount: 4500, deadline: '2025-12-01', category: Category.ENTERTAINMENT },
  { id: 'g2', title: 'Reserva Emergência', targetAmount: 20000, currentAmount: 12000, deadline: '2024-12-31', category: Category.INVESTMENT },
];

export const MOCK_BUDGETS: Budget[] = [
  { category: Category.FOOD, limit: 1000, spent: 630.70 },
  { category: Category.TRANSPORT, limit: 400, spent: 120.00 },
  { category: Category.ENTERTAINMENT, limit: 500, spent: 480.00 },
];
