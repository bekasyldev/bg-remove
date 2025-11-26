import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { ruRU } from '@clerk/localizations';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Удаление фона изображений онлайн бесплатно | BG Remover",
  description: "Удалите фон с изображений за считанные секунды с помощью нашего бесплатного AI-инструмента. Идеальная точность, прозрачный фон.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/50 transition-all',
          footerActionLink: 'text-indigo-600 hover:text-indigo-700',
          card: 'shadow-xl border border-slate-100',
          headerTitle: 'font-bold text-2xl',
          headerSubtitle: 'text-slate-600',
          socialButtonsBlockButton: 'border-slate-200 hover:bg-slate-50',
          formFieldLabel: 'text-slate-700 font-medium',
          formFieldInput: 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500',
          footerActionText: 'text-slate-600',
        }
      }}
      localization={ruRU}
    >
      <html lang="ru">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
