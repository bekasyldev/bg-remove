'use client';

import { Image as ImageIcon, Zap, Download, Sparkles, CheckCircle2, ArrowRight, MoveHorizontal, Coins, CreditCard, } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useImageProcessor } from '@/hooks/useImageProcessor';
import { ImageUploader } from '@/components/ImageUploader';
import { ImagePreview } from '@/components/ImagePreview';
import { useAuth } from '@clerk/nextjs';

interface HomePageProps {
  wpContent?: {
    logo: string | null;
    title: string;
    description: string;
    button: string;
  };
}

interface BeforeAfterCardProps {
  beforeImage: string;
  afterImage: string;
  alt: string;
  label: string;
}

const BeforeAfterCard = ({ beforeImage, afterImage, alt, label }: BeforeAfterCardProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent | React.TouchEvent | globalThis.MouseEvent | globalThis.TouchEvent) => {
    if (!containerRef.current) return;
    
    const { left, width } = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX; 
    const position = ((clientX - left) / width) * 100;
    
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="group relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200 shadow-lg select-none">
      <div 
        ref={containerRef}
        className="absolute inset-0 z-20 cursor-ew-resize"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onClick={handleMove}
      />

      <div className="absolute inset-0 bg-[url('https://media.istockphoto.com/id/1145618475/vector/checkered-geometric-vector-background-with-black-and-gray-tile-transparency-grid-seamless.jpg?s=612x612&w=0&k=20&c=H0f2tC2a1O-vPq2YqW4LgX4ZfQ5hZ3ZqK9qX5j1x5w=')] bg-repeat bg-[length:20px_20px]">
        <img 
          src={afterImage} 
          alt={`${alt} after`} 
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white pointer-events-none">
          Без фона
        </div>
      </div>

      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={beforeImage} 
          alt={`${alt} before`} 
          className="w-full h-full object-cover" 
          draggable={false}
        />
        <div className="absolute bottom-4 left-4 bg-white/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 pointer-events-none">
          Оригинал
        </div>
      </div>

      <div 
        className="absolute top-0 bottom-0 w-1 bg-white z-10 pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-indigo-600">
          <MoveHorizontal size={16} />
        </div>
      </div>
      
      <div className="absolute top-4 left-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="bg-indigo-600/90 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm">
          {label}
        </span>
      </div>
    </div>
  );
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function HomePage({ wpContent }: HomePageProps) {
  const { userId, isSignedIn } = useAuth();
  const [isCreatingPayment, setIsCreatingPayment] = useState(false);
  
  const {
    images,
    isProcessing,
    error,
    processImages,
    removeImage,
    downloadProcessedImage,
    clearAll
  } = useImageProcessor();

  const handlePayment = async () => {
    if (!isSignedIn) {
      window.location.href = '/sign-in';
      return;
    }

    setIsCreatingPayment(true);
    try {
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 50,
          credits: 100,
        }),
      });

      const data = await response.json();

      if (data.success && data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        alert('Ошибка создания платежа. Попробуйте позже.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Ошибка создания платежа. Попробуйте позже.');
    } finally {
      setIsCreatingPayment(false);
    }
  };

  const title = wpContent?.title || 'Удаление фона за одну секунду';
  const description = wpContent?.description || 'Загрузите изображение и позвольте нашему ИИ сделать всю работу. Идеальная точность, прозрачный фон и никаких усилий.';

  const examples = [
    {
      id: 1,
      label: "Обувь",
      before: "/orig_sneakers.jpg",
      after: "/sneakers.png"
    },
    {
      id: 2,
      label: "Одежда",
      before: "/orig_clothes.jpg",
      after: "/clothes.png"
    },
    {
      id: 3,
      label: "Предметы",
      before: "/orig_headphones.jpg",
      after: "/headphones.png"
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 selection:bg-indigo-500/30 text-slate-900 overflow-hidden font-sans">
      
      {/* Background Aurora */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[0%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      <main className="pt-32 pb-20">
        
        {/* HERO SECTION */}
        <section id="remove" className="container mx-auto px-4 relative z-10 mb-20">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wide uppercase mb-6">
              <Sparkles size={14} />
              <span>AI Technology 2.0</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                {title}
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              {description}
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-4xl mx-auto relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-30 blur-xl group-hover:opacity-50 transition duration-1000"></div>
            
            <div className="relative bg-white rounded-2xl shadow-2xl shadow-indigo-900/10 border border-slate-100 overflow-hidden p-2 sm:p-8">
              <ImageUploader 
                onFilesSelected={processImages}
                disabled={isProcessing}
              />
              
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm text-center"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {images.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 flex justify-center"
                >
                  <button
                    onClick={clearAll}
                    disabled={isProcessing}
                    className="text-slate-500 hover:text-slate-800 text-sm font-medium px-6 py-2 hover:bg-slate-50 rounded-full transition-colors"
                  >
                    Очистить всё
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </section>

        {/* PROCESSED RESULTS SECTION */}
        <AnimatePresence>
          {images.length > 0 && (
            <motion.section 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="container mx-auto px-4 mt-10 mb-20"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="text-green-500" /> 
                  Готовые изображения
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {images.map((image, idx) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100"
                  >
                    <ImagePreview
                      image={image}
                      onDownload={() => downloadProcessedImage(image)}
                      onRemove={() => removeImage(image.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* EXAMPLES SECTION */}
        <section id="use-cases" className="container mx-auto px-4 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Примеры обработки</h2>
              <p className="text-slate-500 text-sm">Потяните слайдер, чтобы увидеть разницу</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {examples.map((ex) => (
                <BeforeAfterCard 
                  key={ex.id}
                  beforeImage={ex.before}
                  afterImage={ex.after}
                  alt={ex.label}
                  label={ex.label}
                />
              ))}
            </div>
          </motion.div>
        </section>
        
        

        {/* FEATURES SECTION */}
        <section id="features" className="container mx-auto px-4 mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Почему выбирают нас?</h2>
            <p className="text-slate-500">Технологии профессионального уровня, доступные каждому</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-start"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Молниеносно</h3>
              <p className="text-slate-500 leading-relaxed">
                Наш ИИ обрабатывает фото менее чем за 3 секунды. Не тратьте время на ручное выделение контуров.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-start relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6 relative z-10">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">HD Качество</h3>
              <p className="text-slate-500 leading-relaxed relative z-10">
                Поддержка изображений до 4K. Мы сохраняем мельчайшие детали волос, шерсти и прозрачных объектов.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-start"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Бесплатно</h3>
              <p className="text-slate-500 leading-relaxed">
                Скачивайте результаты в формате PNG с прозрачным слоем. Никаких водяных знаков для личного использования.
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- PRICING SECTION START --- */}
        <section id="pricing" className="container mx-auto px-4 mt-32 relative">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Простая арифметика</h2>
                <p className="text-slate-500">Никаких подписок. Платите только за то, что используете.</p>
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-stretch">
                
                {/* Free Card */}
                <motion.div 
                  whileHover={{ y: -5 }} 
                  className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl flex flex-col relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 bg-slate-100 px-4 py-2 rounded-bl-2xl text-xs font-bold text-slate-500">СТАРТ</div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Пробный</h3>
                    <div className="flex items-end gap-1 mb-6">
                        <span className="text-4xl font-extrabold text-slate-900">0 ₽</span>
                    </div>
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center gap-3 text-slate-600">
                            <CheckCircle2 size={18} className="text-green-500" />
                            <span>1 фото бесплатно</span>
                        </li>
                        <li className="flex items-center gap-3 text-slate-600">
                            <CheckCircle2 size={18} className="text-green-500" />
                            <span>Доступ ко всем функциям</span>
                        </li>
                        <li className="flex items-center gap-3 text-slate-600">
                            <CheckCircle2 size={18} className="text-green-500" />
                            <span>Скачивание в HD</span>
                        </li>
                    </ul>
                    <a 
                        href="#remove"
                        className="w-full block text-center py-3 rounded-xl border-2 border-slate-900 text-slate-900 font-bold hover:bg-slate-50 transition-colors"
                    >
                        Попробовать
                    </a>
                </motion.div>

                {/* Paid Card */}
                <motion.div 
                  whileHover={{ y: -5 }} 
                  className="bg-slate-900 p-8 rounded-3xl shadow-2xl shadow-indigo-900/20 text-white flex flex-col relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] -mr-16 -mt-16"></div>
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 rounded-bl-2xl text-xs font-bold text-white">ВЫГОДНО</div>
                    
                    <h3 className="text-2xl font-bold mb-2">Пакет кредитов</h3>
                    <div className="flex items-end gap-2 mb-1">
                        <span className="text-4xl font-extrabold">0.5 ₽</span>
                        <span className="text-slate-400 mb-1">/ фото</span>
                    </div>
                    <p className="text-indigo-200 text-sm mb-6">50 копеек за одну обработку</p>

                    <div className="space-y-4 mb-8 border-t border-white/10 pt-6 flex-1">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-300">Минимальное пополнение</span>
                            <span className="font-bold">50 ₽</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-300">Вы получаете</span>
                            <span className="font-bold text-green-400 flex items-center gap-1">
                                <Coins size={16} /> 100 кредитов
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-300">Срок действия</span>
                            <span className="font-bold">Бессрочно</span>
                        </div>
                    </div>

                    <button 
                        onClick={handlePayment}
                        disabled={isCreatingPayment}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 font-bold hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <CreditCard size={18} />
                        {isCreatingPayment ? 'Подготовка...' : 'Пополнить на 50 ₽'}
                    </button>
                    <p className="text-center text-xs text-slate-500 mt-4">Безопасная оплата картой РФ</p>
                </motion.div>

            </div>
        </section>
        {/* --- PRICING SECTION END --- */}

        {/* USE CASES SECTION */}
        <section id="use-cases" className="container mx-auto px-4 mt-32 mb-20">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-white relative overflow-hidden max-w-6xl mx-auto">
            <div className="absolute top-0 right-0 opacity-20">
              <svg width="400" height="400" viewBox="0 0 200 200">
                <path fill="currentColor" d="M45.7,-76.3C58.9,-69.3,69.1,-57.6,76.3,-45.2C83.5,-32.8,87.6,-19.7,86.3,-7.1C85,5.5,78.3,17.6,69.9,28.6C61.5,39.6,51.4,49.5,40.3,56.8C29.2,64.1,17.1,68.8,4.3,70.2C-8.5,71.6,-22,69.7,-34.3,63.6C-46.6,57.5,-57.7,47.2,-65.3,35.1C-72.9,23,-77,9.1,-75.4,-3.8C-73.8,-16.7,-66.5,-28.6,-57.1,-38.7C-47.7,-48.8,-36.2,-57.1,-24.2,-64.8C-12.2,-72.5,-0.2,-79.6,13.1,-78.2C26.4,-76.8,52.8,-66.9,45.7,-76.3Z" transform="translate(100 100)" />
              </svg>
            </div>

            <div className="grid md:grid-cols-2 gap-12 relative z-10 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                  Идеально для <br/>
                  <span className="text-indigo-400">любых задач</span>
                </h2>
                <p className="text-slate-400 text-lg mb-8 max-w-md">
                  Автоматизируйте рутину. Создавайте контент для маркетплейсов, социальных сетей и дизайна за секунды.
                </p>
                <button className="group flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
                  Попробовать сейчас
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "E-Commerce", desc: "Фото товаров", icon: "🛍️", color: "bg-pink-500/20" },
                  { title: "SMM", desc: "Для сторис", icon: "📱", color: "bg-blue-500/20" },
                  { title: "Дизайн", desc: "Презентации", icon: "🎨", color: "bg-purple-500/20" },
                  { title: "Документы", desc: "Фото на паспорт", icon: "📄", color: "bg-green-500/20" },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className={`${item.color} backdrop-blur-sm p-6 rounded-2xl border border-white/10`}
                  >
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-sm text-slate-300">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}