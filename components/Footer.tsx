import { Layers } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-slate-900 p-1.5 rounded-lg text-white">
                <Layers size={18} />
              </div>
              <span className="text-lg font-bold text-slate-900">BG Remover</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              AI-сервис для мгновенного удаления фона. Создавайте профессиональные изображения для бизнеса и соцсетей за секунды.
            </p>
          </div>

          {/* Links Columns */}
          <div className="col-span-1">
            <h4 className="font-bold text-slate-900 mb-6">Продукт</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#features" className="hover:text-indigo-600 transition-colors">Возможности</a></li>
              <li><a href="#pricing" className="hover:text-indigo-600 transition-colors">Тарифы</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold text-slate-900 mb-6">Поддержка</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Пожалуйста, свяжитесь с нами</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold text-slate-900 mb-6">Правовая информация</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="/privacy" className="hover:text-indigo-600 transition-colors">Политика конфиденциальности</a></li>
              <li><a href="/terms" className="hover:text-indigo-600 transition-colors">Условия использования</a></li>
              <li><a href="/offer" className="hover:text-indigo-600 transition-colors">Публичная оферта</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs text-center md:text-left">
            © {currentYear} ИП Баландин Виталий Николаевич. Все права защищены.
            <br className="md:hidden"/> <span className="hidden md:inline"> • </span> ИНН 781005876562
          </p>
        </div>
      </div>
    </footer>
  );
}