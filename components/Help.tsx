
import React from 'react';
import { BookOpen, ShieldCheck, Database, Zap, Download, Info, CheckCircle2 } from 'lucide-react';

const Help: React.FC = () => {
  const sections = [
    {
      title: "Como meus dados são salvos?",
      icon: <Database className="w-6 h-6 text-indigo-600" />,
      content: "O MeuSaldo utiliza tecnologia Local-First. Isso significa que todas as suas transações e contas são salvas diretamente na memória do seu navegador (LocalStorage). Seus dados financeiros nunca saem do seu dispositivo sem o seu comando."
    },
    {
      title: "É seguro usar no navegador?",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      content: "Sim! Como os dados não são enviados para um servidor central, você tem controle total. Recomendamos que você faça backups periódicos através da seção Perfil/Exportar para garantir que não perca nada se limpar o cache do navegador."
    },
    {
      title: "Como funciona a Inteligência Artificial?",
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      content: "Nossa IA analisa anonimamente o padrão das suas descrições e valores para sugerir economias e projetar seu saldo futuro. Ela não tem acesso aos seus dados bancários reais, apenas ao que você cadastra manualmente ou importa via CSV."
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-600 text-white rounded-2xl">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Central de Ajuda</h2>
          <p className="text-slate-500 dark:text-slate-400">Tudo o que você precisa saber para dominar o MeuSaldo.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl shrink-0">
                {section.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">{section.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{section.content}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-indigo-600 dark:bg-indigo-700 p-8 rounded-[2.5rem] text-white flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Info className="w-5 h-5" />
              Dica Pro: Backup
            </h3>
            <p className="text-indigo-100 text-sm opacity-80">
              Sempre baixe um arquivo de backup antes de trocar de computador ou formatar seu navegador. Você pode reimportar tudo em segundos!
            </p>
          </div>
          <button className="mt-8 w-full py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Baixar Manual PDF
          </button>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800 text-center">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Passo a Passo Rápido</h3>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 rounded-full flex items-center justify-center font-bold">1</div>
            <span className="text-xs font-medium text-slate-500">Cadastre suas Contas</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 rounded-full flex items-center justify-center font-bold">2</div>
            <span className="text-xs font-medium text-slate-500">Lançe suas Despesas</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 rounded-full flex items-center justify-center font-bold">3</div>
            <span className="text-xs font-medium text-slate-500">Analise com a IA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
