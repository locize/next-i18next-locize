import Link from 'next/link'
import { useRouter } from 'next/router'

import { useTranslation } from 'next-i18next'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const Homepage = () => {

  const router = useRouter()
  const { t, ready } = useTranslation(['common', 'footer'])
  if (!ready) return 'loading translations...'

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
            <button
              type='button'
            >
              {t('to-second-page')}
            </button>
          </Link>
          <Link href='/lazy-reload-page'>
            <button
              type='button'
            >
              {t('to-lazy-reload-page')}
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}

//
// Without the getStaticProps or getServerSideProps function,
// the translsations are loaded via configured i18next backend.
//
// export const getStaticProps = async ({ locale }) => {
//   const props = await serverSideTranslations(locale, ['common', 'footer'])
//   return {
//     props,
//     // if using the approach with the live translation download, meaning using i18next-locize-backend on server side,
//     // there is a reloadInterval for i18next-locize-backend that can be used to reload resources in a specific interval: https://github.com/locize/i18next-locize-backend#backend-options
//     // doing so it is suggested to also use the revalidate option, here:
//     // Next.js will attempt to re-generate the page:
//     // - When a request comes in
//     // - At most once every hour
//     // revalidate: 60 * 60, // in seconds
//   }
// }

export default Homepage
