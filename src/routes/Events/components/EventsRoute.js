import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import { injectLocale } from 'common/i18n/helpers'

import EventsContainer from '../containers/EventsContainer'

class EventsRoute extends React.Component {
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
        namespace: 'Events',
        resources: require(`../locales/${lang}.json`)
      })
    })
  }

  render() {
    const { i18n, ...otherProps } = this.props

    return (
      <EventsContainer {...otherProps} />
    )
  }
}

export default translate()(EventsRoute)
