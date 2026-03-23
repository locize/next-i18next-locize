import { getT } from 'next-i18next/server'
import { FooterServer } from '../components/FooterServer'

export default async function SecondPage({ params }) {
  const { locale } = await params
  const { t } = await getT('second-page', { lng: locale })

  return (
    <>
      <main>
        <h2>
          next-i18next + locize
          <hr />
        </h2>
        <h1>{t('h1')}</h1>
        <a href={`/app-router/${locale}`}>
          <button type='button'>{t('back-to-home')}</button>
        </a>
      </main>
      <FooterServer locale={locale} />
    </>
  )
}
