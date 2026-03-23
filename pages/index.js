import Link from 'next/link'
import { useRouter } from 'next/router'

import { useTranslation } from 'next-i18next/pages'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useEffect } from 'react'

const Homepage = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation(['common', 'footer'], { bindI18n: 'languageChanged loaded' })
  // bindI18n: loaded is needed because of the reloadResources call
  // if all pages use the reloadResources mechanism, the bindI18n option can also be defined in next-i18next.config.js
  useEffect(() => {
    i18n.reloadResources(i18n.resolvedLanguage, ['common', 'footer'])
  }, [])

  return (
    <>
      <main>
        <Header title={t('h1')} />
        <div>
          <Link
            href='/'
            locale={router.locale === 'en' ? 'de' : 'en'}
          >
            <button>
              {t('change-locale')}
            </button>
          </Link>
          <Link href='/second-page'>
            <button type='button'>
              {t('to-second-page')}
            </button>
          </Link>
          <a href={`/app-router/${router.locale}`}>
            <button type='button'>
              {t('to-app-router')}
            </button>
          </a>
        </div>
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps = async ({ locale }) => {
  const props = await serverSideTranslations(locale, ['common', 'footer'])
  return { props }
}

export default Homepage
