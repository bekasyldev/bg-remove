import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getWordPressContent } from '../wordpress-content';

export const metadata: Metadata = {
  title: 'Условия использования | BG Remover',
  description: 'Условия использования сервиса BG Remover - правила и условия пользования AI-инструментом для удаления фона.',
};

export default async function TermsPage() {
  const wpContent = await getWordPressContent();

  return (
    <>
      <Header logoUrl={wpContent.logo} buttonText={wpContent.button} />
      <main className="pt-24 pb-20 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Условия использования
          </h1>
          <p className="text-slate-500 mb-12">
            Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
          </p>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Принятие условий</h2>
              <p className="text-slate-600 leading-relaxed">
                Настоящие Условия использования (далее — «Условия») регулируют использование сервиса BG Remover 
                (далее — «Сервис»), принадлежащего ИП Баландин Виталий Николаевич (ИНН 781005876562).
              </p>
              <p className="text-slate-600 leading-relaxed mt-4">
                Используя Сервис, вы подтверждаете, что прочитали, поняли и согласны соблюдать настоящие Условия. 
                Если вы не согласны с Условиями, пожалуйста, не используйте Сервис.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Описание сервиса</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                BG Remover — это онлайн-сервис для автоматического удаления фона с изображений с использованием 
                технологий искусственного интеллекта. Сервис предоставляет:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Автоматическое удаление фона с изображений</li>
                <li>Высококачественную обработку с помощью AI</li>
                <li>Быструю обработку загруженных файлов</li>
                <li>Скачивание результатов в прозрачном формате</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Регистрация и учетная запись</h2>
              <div className="space-y-4 text-slate-600">
                <p className="leading-relaxed">
                  <strong className="text-slate-900">3.1.</strong> Для использования некоторых функций Сервиса может 
                  потребоваться регистрация. При регистрации вы обязуетесь:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Предоставлять точную и актуальную информацию</li>
                  <li>Поддерживать безопасность своей учетной записи</li>
                  <li>Немедленно уведомлять нас о несанкционированном доступе</li>
                  <li>Не передавать доступ к учетной записи третьим лицам</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  <strong className="text-slate-900">3.2.</strong> Вы несете полную ответственность за все действия, 
                  совершенные через вашу учетную запись.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-slate-900">3.3.</strong> Вы должны быть не моложе 18 лет или иметь согласие 
                  законного представителя для использования Сервиса.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Правила использования</h2>
              <div className="space-y-4 text-slate-600">
                <p className="leading-relaxed">
                  <strong className="text-slate-900">4.1. Разрешенное использование:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Обработка изображений для личных или коммерческих целей</li>
                  <li>Создание контента для бизнеса, маркетинга, соцсетей</li>
                  <li>Использование в дизайнерских проектах</li>
                </ul>
                
                <div className="bg-red-50 border border-red-100 rounded-lg p-6 mt-6">
                  <p className="font-semibold text-red-900 mb-3">4.2. Запрещенное использование:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
                    <li>Загрузка незаконного, оскорбительного или вредоносного контента</li>
                    <li>Загрузка изображений, нарушающих авторские права</li>
                    <li>Загрузка изображений сексуального или насильственного характера</li>
                    <li>Использование Сервиса для мошенничества или незаконной деятельности</li>
                    <li>Попытки взлома, реверс-инжиниринга или нарушения безопасности</li>
                    <li>Автоматизированный массовый доступ без разрешения (парсинг, скрейпинг)</li>
                    <li>Перепродажа услуг Сервиса без разрешения</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Права интеллектуальной собственности</h2>
              <div className="space-y-4 text-slate-600">
                <p className="leading-relaxed">
                  <strong className="text-slate-900">5.1.</strong> Все права на Сервис, включая код, дизайн, логотипы 
                  и контент, принадлежат ИП Баландин Виталий Николаевич.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-slate-900">5.2.</strong> Вы сохраняете все права на изображения, которые 
                  загружаете в Сервис.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-slate-900">5.3.</strong> Обработанные изображения принадлежат вам. Вы можете 
                  использовать их без ограничений.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-slate-900">5.4.</strong> Загружая изображения, вы подтверждаете, что имеете 
                  все необходимые права на их использование.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Платные услуги</h2>
              <div className="space-y-4 text-slate-600">
                <p className="leading-relaxed">
                  <strong className="text-slate-900">6.1.</strong> Сервис может предлагать бесплатные и платные тарифы.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-slate-900">6.2.</strong> Платные услуги оплачиваются согласно актуальным ценам 
                  на момент покупки.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-slate-900">6.3.</strong> Все платежи являются окончательными и невозвратными, 
                  за исключением случаев, предусмотренных законом или Публичной офертой.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-slate-900">6.4.</strong> Мы оставляем за собой право изменять цены и условия 
                  тарифов с уведомлением пользователей.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Ограничение ответственности</h2>
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-6 space-y-3">
                <p className="text-slate-700 leading-relaxed">
                  <strong className="text-amber-900">7.1.</strong> Сервис предоставляется «как есть», без гарантий 
                  любого рода.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  <strong className="text-amber-900">7.2.</strong> Мы не гарантируем бесперебойную работу, отсутствие 
                  ошибок или 100% точность обработки.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  <strong className="text-amber-900">7.3.</strong> Мы не несем ответственности за:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
                  <li>Потерю данных или изображений</li>
                  <li>Технические сбои и простои</li>
                  <li>Качество обработанных изображений</li>
                  <li>Использование Сервиса в незаконных целях</li>
                  <li>Косвенные убытки или упущенную выгоду</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Прекращение доступа</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                Мы оставляем за собой право:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Приостановить или прекратить ваш доступ при нарушении Условий</li>
                <li>Удалить контент, нарушающий Условия или законодательство</li>
                <li>Изменять, приостанавливать или прекращать работу Сервиса</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-4">
                При удалении учетной записи ваши данные будут удалены в соответствии с Политикой конфиденциальности.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Изменения условий</h2>
              <p className="text-slate-600 leading-relaxed">
                Мы можем обновлять настоящие Условия. О существенных изменениях мы уведомим пользователей по 
                электронной почте или через уведомление на сайте. Продолжая использовать Сервис после изменений, 
                вы соглашаетесь с новыми Условиями.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Применимое право</h2>
              <p className="text-slate-600 leading-relaxed">
                Настоящие Условия регулируются законодательством Российской Федерации. Все споры подлежат 
                разрешению в судебном порядке по месту нахождения оператора Сервиса.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Контакты</h2>
              <div className="bg-slate-50 rounded-lg p-6 space-y-2">
                <p className="text-slate-600">
                  По вопросам, связанным с настоящими Условиями, обращайтесь:
                </p>
                <p className="text-slate-600">
                  <strong className="text-slate-900">Оператор:</strong> ИП Баландин Виталий Николаевич
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
