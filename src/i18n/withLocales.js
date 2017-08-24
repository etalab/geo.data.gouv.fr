import React from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'

import { injectLocale } from './helpers'

const withLocales = (namespace, resourcesLoader) => Component => {
  return hoistStatics(class extends React.Component {
    static displayName = `withLocales(${Component.displayName || Component.name})`
    static WrappedComponent = Component
    static contextTypes = {
      i18n: PropTypes.object.isRequired
    }

    componentWillMount() {
      const { i18n } = this.context

      i18n.availableLanguages.forEach(locale => {
        injectLocale(i18n, {
          locale,
          namespace,
          resources: resourcesLoader(locale)
        })
      })
    }

    render() {
      return (
        <Component {...this.props} />
      )
    }
  }, Component)
}

export default withLocales
