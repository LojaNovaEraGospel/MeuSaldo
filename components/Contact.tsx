
import React, { useState } from 'react';
import { MessageSquare, Send, Mail, MapPin, Globe, CheckCircle2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Mensagem Recebida!</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto mt-2">Nossa equipe de suporte entrará em contato em breve através do seu e-mail.</p>
        </div>
        <button 
          onClick={() => setSubmitted(false)}
          className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all"
        >
          Enviar nova mensagem
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-600 text-white rounded-2xl">
          <MessageSquare className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Suporte & Feedback</h2>
          <p className="text-slate-500 dark:text-slate-400">Estamos aqui para ajudar você a conquistar sua liberdade financeira.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Envie uma mensagem</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nome</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Seu nome completo"
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500/20 outline-none dark:text-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">E-mail</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="exemplo@email.com"
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500/20 outline-none dark:text-white transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Mensagem ou Sugestão</label>
                <textarea 
                  required 
                  rows={5}
                  placeholder="Como podemos ajudar você hoje?"
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500/20 outline-none dark:text-white transition-all resize-none"
                />
              </div>
              <button 
                type="submit"
                className="w-full md:w-auto px-10 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 dark:shadow-none transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <Send className="w-5 h-5" />
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 dark:bg-slate-800 p-8 rounded-[3rem] text-white space-y-8">
            <h3 className="text-xl font-bold">Informações de Contato</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-500/20 rounded-2xl text-indigo-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">E-mail Direto</p>
                  <p className="font-medium">ajuda@meusaldo.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Website Oficial</p>
                  <p className="font-medium">www.meusaldo.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-500/20 rounded-2xl text-amber-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sede</p>
                  <p className="font-medium">São Paulo, Brasil</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-800">
              <p className="text-sm text-slate-400 italic">"Sua jornada rumo à liberdade financeira começa com um único passo. Conte conosco para cada um deles."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
