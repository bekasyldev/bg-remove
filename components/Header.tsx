'use client';

import { Layers, Menu, X, Sparkles, Coins } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

interface HeaderProps {
  logoUrl?: string | null;
  buttonText?: string;
}

export function Header({ logoUrl, buttonText = 'Попробовать' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useUser();
  
  const credits = (user?.publicMetadata?.credits as number) || 0;
  const hasProcessedFirstImage = (user?.publicMetadata?.hasProcessedFirstImage as boolean) || false;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Возможности', href: '#features' },
    { name: 'Тарифы', href: '#pricing' },
    { name: 'Примеры', href: '#use-cases' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center h-12">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="BG Remover"
                className="h-16 w-auto object-contain"
                draggable={false}
              />
            ) : (
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-1.5 rounded-lg text-white group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/20">
                <Layers size={20} />
              </div>
            )}
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              BG Remover
            </span>
          </Link>
          
          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full opacity-50"></span>
              </a>
            ))}

            {/* ACTION AREA */}
            <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
              <SignedOut>
                <SignInButton>
                  <button className="text-sm border border-black font-medium px-5 py-2 rounded-full hover:bg-slate-100 transition-colors">
                    Войти
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="group relative px-5 py-2 overflow-hidden rounded-full bg-slate-900 text-white shadow-lg transition-all hover:bg-slate-800 hover:shadow-indigo-500/25 hover:scale-105 active:scale-95">
                    <span className="relative text-sm font-medium flex items-center gap-2">
                      Начать <Sparkles size={14} className="text-yellow-300" />
                    </span>
                  </button>
                </SignUpButton>
              </SignedOut>
              
              <SignedIn>
                {/* Credits Badge */}
                <div className="hidden lg:flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-bold border border-indigo-100 cursor-help" title="Ваш баланс">
                  <Coins size={14} />
                  <span>{credits} {credits === 1 ? 'кредит' : 'кредитов'}</span>
                  {!hasProcessedFirstImage && (
                    <span className="text-green-600 ml-1">
                      (+1 бесплатно)
                    </span>
                  )}
                </div>
                
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "h-9 w-9 ring-2 ring-white shadow-md",
                      userButtonPopoverCard: "shadow-xl border border-slate-100"
                    }
                  }}
                />
              </SignedIn>
            </div>
          </div>
          
          {/* MOBILE MENU TOGGLE */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </div>
      
      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="block px-4 py-3 rounded-xl text-slate-600 font-medium hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              
              <div className="pt-4 mt-4 border-t border-slate-100 space-y-4">
                <SignedOut>
                  <SignInButton>
                    <button className="w-full py-3 text-white bg-slate-900 rounded-xl font-medium shadow-md">
                      Войти в аккаунт
                    </button>
                  </SignInButton>
                </SignedOut>
                
                <SignedIn>
                  <div className="flex items-center justify-between px-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                      <Coins size={16} className="text-indigo-600"/>
                      Баланс: {credits} {credits === 1 ? 'кредит' : 'кредитов'}
                    </div>
                    <UserButton />
                  </div>
                </SignedIn>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}