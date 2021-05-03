import Link from 'next/link'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const SecondPage = () => {

  const { t } = useTranslation('second-page')

  return (
    <>
      <main>
        <Header title={t('h1')} />
        <Link href='/'>
          <button
            type='button'
          >
            {t('back-to-home')}
          </button>
        </Link>
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['second-page', 'footer']),
  },
  // if using the approach with the live translation download, meaning using i18next-locize-backend on server side,
  // there is a reloadInterval for i18next-locize-backend that can be used to reload resources in a specific interval: https://github.com/locize/i18next-locize-backend#backend-options
  // doing so it is suggested to also use the revalidate option, here:
  // Next.js will attempt to re-generate the page:
  // - When a request comes in
  // - At most once every hour
  // revalidate: 60 * 60, // in seconds
})

export default SecondPage
