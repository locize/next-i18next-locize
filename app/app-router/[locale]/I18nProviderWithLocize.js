'use client'

import { I18nProvider } from 'next-i18next/client'
import LocizeBackend from 'i18next-locize-backend'
import ChainedBackend from 'i18next-chained-backend'
import LocalStorageBackend from 'i18next-localstorage-backend'

const isDev = process.env.NODE_ENV === 'development'

export function I18nProviderWithLocize({ children, language, resources, supportedLngs, defaultNS }) {
  return (
    <I18nProvider
      language={language}
      resources={resources}
      supportedLngs={supportedLngs}
      defaultNS={defaultNS}
      use={[ChainedBackend]}
      i18nextOptions={{
        backend: {
          backends: [LocalStorageBackend, LocizeBackend],
          backendOptions: [
            { expirationTime: isDev ? 0 : 60 * 60 * 1000 },
            {
              projectId: 'd3b405cf-2532-46ae-adb8-99e88d876733',
              version: 'latest',
            },
          ],
        },
      }}
    >
      {children}
    </I18nProvider>
  )
}
