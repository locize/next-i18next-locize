import { getT } from 'next-i18next/server'
import { FooterServer } from './components/FooterServer'

export default async function AppRouterHome({ params }) {
  const { locale } = await params
  const { t } = await getT('common', { lng: locale })
  const changeTo = locale === 'en' ? 'de' : 'en'

  return (
    <>
      <main>
        <h2>
          next-i18next + locize
          <hr />
        </h2>
        <h1>{t('h1')}</h1>
        <p style={{ opacity: 0.65, fontStyle: 'italic' }}>App Router (Server Component)</p>
        <a className='github' href='https://github.com/i18next/next-i18next'>
          <i className='typcn typcn-social-github-circular' />
        </a>
        <div>
          <a href={`/app-router/${changeTo}`}>
            <button>{t('change-locale')}</button>
          </a>
          <a href={`/app-router/${locale}/second-page`}>
            <button type='button'>{t('to-second-page')}</button>
          </a>
          <a href={`/${locale}`}>
            <button type='button'>{t('to-pages-router')}</button>
          </a>
        </div>
      </main>
      <FooterServer locale={locale} />
    </>
  )
}
