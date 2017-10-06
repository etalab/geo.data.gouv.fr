import React from 'react'
import PropTypes from 'prop-types'
import { I18nextProvider } from 'react-i18next'
import moment from 'moment'

import i18n from '../../lib/i18n'

export default namespaces => Page => {
  if (!namespaces) {
    namespaces = []
  }

  if (typeof namespaces === 'string') {
    namespaces = [namespaces]
  }

  if (!namespaces.includes(i18n.options.defaultNS)) {
    namespaces = [
      ...namespaces,
      i18n.options.defaultNS
    ]
  }

  const Extended = class extends React.Component {
    static propTypes = {
      initialI18nStore: PropTypes.object,
      initialLanguage: PropTypes.string
    }

    static displayName = `withI18n(${Page.displayName || Page.name})`
    static WrappedComponent = Page

    static async getInitialProps(context) {
      const props = Page.getInitialProps ? await Page.getInitialProps(context) : {}
      const { req } = context

      if (req && !process.browser) {
        req.i18n.toJSON = () => null

        const initialI18nStore = {}
        req.i18n.languages.forEach(l => {
          initialI18nStore[l] = {}
          namespaces.forEach(ns => {
            initialI18nStore[l][ns] = req.i18n.services.resourceStore.data[l][ns] || {}
          })
        })

        return {
          ...props,
          i18n: req.i18n,
          initialI18nStore,
          initialLanguage: req.i18n.language
        }
      }

      return props
    }

    render() {
      const { initialI18nStore, initialLanguage } = this.props

      moment.locale(initialLanguage)

      return (
        <I18nextProvider i18n={i18n} initialI18nStore={initialI18nStore} initialLanguage={initialLanguage}>
          <Page {...this.props} />
        </I18nextProvider>
      )
    }
  }

  return Extended
}
