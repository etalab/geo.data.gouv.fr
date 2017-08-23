import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import withReducer from 'common/store/withReducer'
import { injectLocale } from 'common/i18n/helpers'

import DatasetContainer from '../containers/DatasetContainer'
import reducer from '../modules/reducer'

class CatalogRoute extends React.Component {
  static propTypes = {
    i18n: PropTypes.shape({
      availableLanguages: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
  }

  componentWillMount() {
    const { i18n } = this.props

    i18n.availableLanguages.forEach(lang => {
      injectLocale(i18n, {
        locale: lang,
        namespace: 'Dataset',
        resources: require(`../locales/${lang}.json`)
      })
    })
  }

  render() {
    const { i18n, ...otherProps } = this.props

    return (
      <DatasetContainer {...otherProps} />
    )
  }
}

export default withReducer('dataset', reducer)(
  translate()(CatalogRoute)
)
