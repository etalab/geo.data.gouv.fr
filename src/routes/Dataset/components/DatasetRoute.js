import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import { injectReducer } from 'common/store/reducers'
import { injectLocale } from 'common/i18n/helpers'

import DatasetContainer from '../containers/DatasetContainer'
import reducer from '../modules/reducer'

class CatalogRoute extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    i18n: PropTypes.shape({
      availableLanguages: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
  }

  componentWillMount() {
    const { store, i18n } = this.props

    injectReducer(store, {
      key: 'dataset',
      reducer
    })

    i18n.availableLanguages.forEach(lang => {
      injectLocale(i18n, {
        locale: lang,
        namespace: 'Dataset',
        resources: require(`../locales/${lang}.json`)
      })
    })
  }

  render() {
    const { store, i18n, ...otherProps } = this.props

    return (
      <DatasetContainer {...otherProps} />
    )
  }
}

export default translate()(CatalogRoute)
