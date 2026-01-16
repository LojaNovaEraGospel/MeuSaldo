
export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export enum RecurrenceFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY'
}

export enum Category {
  FOOD = 'Alimentação',
  HOUSING = 'Moradia',
  TRANSPORT = 'Transporte',
  ENTERTAINMENT = 'Lazer',
  HEALTH = 'Saúde',
  EDUCATION = 'Educação',
  SALARY = 'Salário',
  INVESTMENT = 'Investimento',
  OTHERS = 'Outros'
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: Category;
  type: TransactionType;
  accountId: string;
  cardId?: string;
  recurrence?: {
    frequency: RecurrenceFrequency;
    endDate?: string;
  };
}

export interface BankAccount {
  id: string;
  name: string;
  bank: string;
  balance: number;
  type: 'CHECKING' | 'SAVINGS' | 'INVESTMENT';
  color: string;
}

export interface CreditCard {
  id: string;
  name: string;
  limit: number;
  availableLimit: number;
  currentInvoice: number;
  closingDate: number; // Day of month
  dueDate: number; // Day of month
  color: string;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: Category;
}

export interface Budget {
  category: Category;
  limit: number;
  spent: number;
}

export enum AppSection {
  DASHBOARD = 'DASHBOARD',
  ACCOUNTS = 'ACCOUNTS',
  CARDS = 'CARDS',
  PROJECTION = 'PROJECTION',
  REVIEWS = 'REVIEWS',
  GOALS = 'GOALS',
  BUDGET = 'BUDGET',
  PROFILE = 'PROFILE',
  HELP = 'HELP',
  CONTACT = 'CONTACT'
}
