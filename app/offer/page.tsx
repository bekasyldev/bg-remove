import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getWordPressContent } from '../wordpress-content';

export const metadata: Metadata = {
  title: 'Публичная оферта | BG Remover',
  description: 'Публичная оферта на оказание услуг сервиса BG Remover - договор с пользователями.',
};

export default async function OfferPage() {
  const wpContent = await getWordPressContent();

  return (
    <>
      <Header logoUrl={wpContent.logo} buttonText={wpContent.button} />
      <main className="pt-24 pb-20 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Публичная оферта
          </h1>
          <p className="text-slate-500 mb-12">
            Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
          </p>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Общие положения</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                Настоящая публичная оферта (далее — «Оферта») является официальным предложением 
                ИП Баландин Виталий Николаевич (ИНН 781005876562), далее — «Исполнитель», заключить 
                договор на оказание услуг через сервис BG Remover (далее — «Сервис»).
              </p>
              <p className="text-slate-600 leading-relaxed">
                В соответствии со статьей 437 Гражданского кодекса РФ, данная Оферта является публичной. 
                Акцептом Оферты является регистрация на Сервисе и/или оплата услуг.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Термины и определения</h2>
              <ul className="space-y-3 text-slate-600">
                <li>
                  <strong className="text-slate-900">Заказчик</strong> — физическое или юридическое лицо, 
                  зарегистрированное в Сервисе и использующее его услуги.
                </li>
                <li>
                  <strong className="text-slate-900">Услуги</strong> — обработка изображений с целью удаления 
                  фона с помощью AI-технологий.
                </li>
                <li>
                  <strong className="text-slate-900">Личный кабинет</strong> — персональный раздел Заказчика 
                  на Сервисе после регистрации.
                </li>
                <li>
                  <strong className="text-slate-900">Акцепт</strong> — полное и безоговорочное принятие условий 
                  Оферты путем регистрации и/или оплаты.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Предмет договора</h2>
              <div className="space-y-4 text-slate-600">
                <p className="leading-relaxed">
                  <strong className="text-slate-900">3.1.</strong> Исполнитель обязуется оказать Заказчику 
                  услуги по обработке изображений с использованием технологий искусственного интеллекта, 
                  а Заказчик обязуется принять и оплатить услуги в соответствии с выбранным тарифом.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-slate-900">3.2.</strong> Перечень услуг:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Автоматическое удаление фона с изображений</li>
                  <li>Обработка файлов в форматах JPG, PNG, WEBP</li>
                  <li>Предоставление результата в формате PNG с прозрачным фоном</li>
                  <li>Техническая поддержка пользователей</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Стоимость и порядок оплаты</h2>
              <div className="space-y-4 text-slate-600">
                <p className="leading-relaxed">
                  <strong className="text-slate-900">4.1.</strong> Стоимость услуг определяется тарифным планом, 
                  выбранным Заказчиком, и указывается на сайте Сервиса.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-slate-900">4.2.</strong> Сервис может предоставлять:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Бесплатный тариф с ограничениями по количеству обработок</li>
                  <li>Платные тарифные планы с расширенными возможностями</li>
                  <li>Разовую оплату за обработку изображений</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  <strong className="text-slate-900">4.3.</strong> Оплата производится онлайн через платежные 
                  системы, интегрированные в Сервис.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-slate-900">4.4.</strong> Все цены указаны в рублях РФ и включают НДС 
                  (если применимо).
                </p>
                <p className="leading-relaxed">
                  <strong className="text-slate-900">4.5.</strong> Исполнитель оставляет за собой право изменять 
                  стоимость услуг с уведомлением Заказчика не менее чем за 7 дней.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Права и обязанности сторон</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">5.1. Исполнитель обязуется:</h3>
                  <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                    <li>Предоставить доступ к Сервису в соответствии с выбранным тарифом</li>
                    <li>Обрабатывать изображения с использованием AI-технологий</li>
                    <li>Обеспечивать конфиденциальность данных Заказчика</li>
                    <li>Предоставлять техническую поддержку</li>
                    <li>Удалять загруженные изображения в течение 24 часов после обработки</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">5.2. Исполнитель имеет право:</h3>
                  <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                    <li>Приостановить предоставление услуг при нарушении условий Оферты</li>
                    <li>Изменять функциональность Сервиса с уведомлением пользователей</li>
                    <li>Проводить технические работы с временным ограничением доступа</li>
                    <li>Удалять контент, нарушающий законодательство РФ</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">5.3. Заказчик обязуется:</h3>
                  <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                    <li>Предоставлять достоверные данные при регистрации</li>
                    <li>Соблюдать условия использования Сервиса</li>
                    <li>Своевременно оплачивать выбранные услуги</li>
                    <li>Не использовать Сервис в незаконных целях</li>
                    <li>Загружать только изображения, на которые имеет права</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">5.4. Заказчик имеет право:</h3>
                  <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                    <li>Использовать Сервис в рамках выбранного тарифа</li>
                    <li>Получать техническую поддержку</li>
                    <li>Изменять или отменять подписку в любое время</li>
                    <li>Запрашивать удаление персональных данных</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Порядок оказания услуг</h2>
              <div className="space-y-4 text-slate-600">
                <p className="leading-relaxed">
                  <strong className="text-slate-900">6.1.</strong> Услуга считается оказанной в момент предоставления 
                  Заказчику обработанного изображения для скачивания.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-slate-900">6.2.</strong> Срок обработки изображения зависит от его размера 
                  и составляет обычно от нескольких секунд до нескольких минут.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-slate-900">6.3.</strong> Исполнитель не несет ответственности за качество 
                  обработки при использовании изображений низкого качества или неподходящего формата.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Возврат средств</h2>
              <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6 space-y-3">
                <p className="text-slate-700 leading-relaxed">
                  <strong className="text-indigo-900">7.1.</strong> Возврат средств возможен в следующих случаях:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
                  <li>Двойное списание средств</li>
                  <li>Технический сбой, приведший к невозможности использования оплаченных услуг</li>
                  <li>Случаи, предусмотренные законодательством РФ</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-4">
                  <strong className="text-indigo-900">7.2.</strong> Возврат НЕ производится:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
                  <li>После успешной обработки изображения</li>
                  <li>При нарушении Заказчиком условий Оферты</li>
                  <li>Если Заказчик передумал использовать услугу после оплаты</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-4">
                  <strong className="text-indigo-900">7.3.</strong> Для запроса возврата обратитесь по адресу{' '}
                  <a href="mailto:support@grayai.ru" className="text-indigo-600 hover:text-indigo-700 font-medium">
                    support@grayai.ru
                  </a>{' '}
                  в течение 14 дней с момента оплаты.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Ответственность сторон</h2>
              <div className="space-y-4 text-slate-600">
                <p className="leading-relaxed">
                  <strong className="text-slate-900">8.1.</strong> Исполнитель не несет ответственности за:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Качество обработки изображений низкого качества</li>
                  <li>Временную недоступность Сервиса из-за технических работ</li>
                  <li>Действия третьих лиц, препятствующие работе Сервиса</li>
                  <li>Нарушение Заказчиком авторских прав при загрузке изображений</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  <strong className="text-slate-900">8.2.</strong> Заказчик несет полную ответственность за 
                  законность использования загружаемых изображений.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-slate-900">8.3.</strong> Общая ответственность Исполнителя ограничена 
                  суммой, уплаченной Заказчиком за услуги.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Конфиденциальность</h2>
              <p className="text-slate-600 leading-relaxed">
                Обработка персональных данных Заказчика осуществляется в соответствии с{' '}
                <a href="/privacy" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Политикой конфиденциальности
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Разрешение споров</h2>
              <div className="space-y-4 text-slate-600">
                <p className="leading-relaxed">
                  <strong className="text-slate-900">10.1.</strong> Все споры и разногласия решаются путем 
                  переговоров.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-slate-900">10.2.</strong> При невозможности достижения согласия споры 
                  подлежат рассмотрению в суде по месту нахождения Исполнителя в соответствии с законодательством РФ.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-slate-900">10.3.</strong> Досудебный порядок урегулирования споров обязателен.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Прочие условия</h2>
              <div className="space-y-4 text-slate-600">
                <p className="leading-relaxed">
                  <strong className="text-slate-900">11.1.</strong> Договор вступает в силу с момента акцепта 
                  Оферты и действует до полного исполнения обязательств сторонами.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-slate-900">11.2.</strong> Исполнитель вправе вносить изменения в Оферту 
                  с уведомлением Заказчика не менее чем за 7 дней.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-slate-900">11.3.</strong> Продолжение использования Сервиса после 
                  изменения Оферты означает согласие с новыми условиями.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Реквизиты Исполнителя</h2>
              <div className="bg-slate-50 rounded-lg p-6 space-y-2">
                <p className="text-slate-600">
                  <strong className="text-slate-900">Наименование:</strong> ИП Баландин Виталий Николаевич
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
                <p className="text-slate-600 mt-4 pt-4 border-t border-slate-200">
                  <em className="text-slate-500 text-sm">
                    Полные реквизиты для юридических лиц предоставляются по запросу.
                  </em>
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
