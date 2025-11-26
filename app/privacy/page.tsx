import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getWordPressContent } from '../wordpress-content';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | BG Remover',
  description: 'Политика конфиденциальности сервиса BG Remover - узнайте, как мы собираем, используем и защищаем ваши данные.',
};

export default async function PrivacyPage() {
  const wpContent = await getWordPressContent();

  return (
    <>
      <Header logoUrl={wpContent.logo} buttonText={wpContent.button} />
      <main className="pt-24 pb-20 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Политика конфиденциальности
          </h1>
          <p className="text-slate-500 mb-12">
            Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
          </p>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Общие положения</h2>
              <p className="text-slate-600 leading-relaxed">
                Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных 
                пользователей сервиса BG Remover (далее — «Сервис»), принадлежащего ИП Баландин Виталий Николаевич 
                (ИНН 781005876562).
              </p>
              <p className="text-slate-600 leading-relaxed mt-4">
                Используя Сервис, вы соглашаетесь с условиями настоящей Политики конфиденциальности.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Какие данные мы собираем</h2>
              <div className="space-y-4 text-slate-600">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">2.1. Данные при регистрации:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Адрес электронной почты</li>
                    <li>Имя и фамилия (опционально)</li>
                    <li>Данные аутентификации (через Clerk Auth)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">2.2. Технические данные:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>IP-адрес</li>
                    <li>Тип браузера и устройства</li>
                    <li>Операционная система</li>
                    <li>Данные о посещенных страницах</li>
                    <li>Файлы cookie</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">2.3. Загружаемые файлы:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Изображения, загружаемые для обработки</li>
                    <li>Метаданные файлов (размер, формат, дата загрузки)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Как мы используем данные</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                Мы используем собранные данные для следующих целей:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Предоставление и улучшение услуг Сервиса</li>
                <li>Обработка изображений с использованием AI-технологий</li>
                <li>Аутентификация и управление учетной записью</li>
                <li>Связь с пользователями по вопросам поддержки</li>
                <li>Анализ использования Сервиса и улучшение пользовательского опыта</li>
                <li>Предотвращение мошенничества и обеспечение безопасности</li>
                <li>Соблюдение законодательных требований</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Обработка изображений</h2>
              <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6 space-y-3 text-slate-700">
                <p className="font-semibold text-indigo-900">Важная информация:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Загруженные изображения обрабатываются на нашем сервере</li>
                  <li>Мы не сохраняем ваши изображения после обработки</li>
                  <li>Обработанные файлы автоматически удаляются в течение 24 часов</li>
                  <li>Мы не используем ваши изображения для обучения AI-моделей</li>
                  <li>Мы не передаем ваши изображения третьим лицам</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Передача данных третьим лицам</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                Мы можем передавать ваши данные следующим сервисам:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li><strong>Clerk Auth</strong> — для аутентификации пользователей</li>
                <li><strong>Хостинг-провайдер</strong> — для размещения и работы Сервиса</li>
                <li><strong>Платежные системы</strong> — для обработки платежей (если применимо)</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-4">
                Все третьи лица обязаны соблюдать конфиденциальность ваших данных и использовать их только 
                в целях предоставления услуг.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Защита данных</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                Мы применяем следующие меры для защиты ваших данных:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>SSL/TLS шифрование при передаче данных</li>
                <li>Шифрование паролей и конфиденциальных данных</li>
                <li>Регулярное обновление систем безопасности</li>
                <li>Ограничение доступа к персональным данным</li>
                <li>Мониторинг несанкционированного доступа</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Файлы cookie</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                Мы используем cookie-файлы для:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Сохранения сессии пользователя</li>
                <li>Запоминания предпочтений</li>
                <li>Аналитики использования Сервиса</li>
                <li>Улучшения функциональности</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-4">
                Вы можете отключить cookie в настройках браузера, но это может повлиять на функциональность Сервиса.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Ваши права</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                Вы имеете право:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Получать доступ к своим персональным данным</li>
                <li>Исправлять неточные или неполные данные</li>
                <li>Удалять свои данные («право на забвение»)</li>
                <li>Ограничивать обработку данных</li>
                <li>Получать данные в структурированном формате</li>
                <li>Отозвать согласие на обработку данных</li>
                <li>Подать жалобу в надзорный орган</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-4">
                Для реализации своих прав обратитесь по адресу:{' '}
                <a href="mailto:support@grayai.ru" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  support@grayai.ru
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Хранение данных</h2>
              <p className="text-slate-600 leading-relaxed">
                Мы храним ваши персональные данные только в течение необходимого срока для достижения целей обработки 
                или в соответствии с требованиями законодательства. Загруженные изображения удаляются в течение 24 часов 
                после обработки.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Изменения в Политике</h2>
              <p className="text-slate-600 leading-relaxed">
                Мы можем обновлять настоящую Политику конфиденциальности. О существенных изменениях мы уведомим 
                пользователей по электронной почте или через уведомление на сайте. Дата последнего обновления 
                указана в начале документа.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Контакты</h2>
              <div className="bg-slate-50 rounded-lg p-6 space-y-2">
                <p className="text-slate-600">
                  <strong className="text-slate-900">Оператор данных:</strong> ИП Баландин Виталий Николаевич
                </p>
                <p className="text-slate-600">
                  <strong className="text-slate-900">ИНН:</strong> 781005876562
                </p>
                <p className="text-slate-600">
                  <strong className="text-slate-900">Email:</strong>{' '}
                  <a href="mailto:support@grayai.ru" className="text-indigo-600 hover:text-indigo-700">
                    support@grayai.ru
                  </a>
                </p>
                <p className="text-slate-600">
                  <strong className="text-slate-900">Сайт:</strong>{' '}
                  <a href="https://grayai.ru" className="text-indigo-600 hover:text-indigo-700">
                    grayai.ru
                  </a>
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
