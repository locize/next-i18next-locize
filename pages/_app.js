import { appWithTranslation } from 'next-i18next/pages'
import nextI18NextConfig from '../next-i18next.config.js'

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />

export default appWithTranslation(MyApp, nextI18NextConfig)
