import moment from 'moment'
import {translate} from 'react-i18next'

import i18n from '../../lib/i18n'

export default namespaces => Page => {
  if (!namespaces) {
    namespaces = []
  }

  if (typeof namespaces === 'string') {
    namespaces = [namespaces]
  }

  // Always add the default namespace
  if (!namespaces.includes(i18n.options.defaultNS)) {
    namespaces.push(i18n.options.defaultNS)
  }

  const Extended = translate(namespaces, {
    i18n
  })(Page)

  Extended.getInitialProps = async context => {
    const props = Page.getInitialProps ? await Page.getInitialProps(context) : {}
    const {req} = context

    if (req && !process.browser) {
      req.i18n.toJSON = () => null

      // Always preload the home namespace
      if (!namespaces.includes('home')) {
        namespaces = [
          ...namespaces,
          'home'
        ]
      }

      const initialI18nStore = {}
      req.i18n.languages.forEach(l => {
        initialI18nStore[l] = {}
        namespaces.forEach(ns => {
          initialI18nStore[l][ns] = req.i18n.services.resourceStore.data[l][ns] || {}
        })
      })

      moment.locale(req.i18n.language)

      return {
        ...props,
        i18n: req.i18n,
        initialI18nStore,
        initialLanguage: req.i18n.language
      }
    }

    return props
  }

  return Extended
}
