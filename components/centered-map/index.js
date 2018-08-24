import React from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import {translate} from 'react-i18next'

import {isWebglSupported} from '../../lib/browser/webgl'

import Loader from './loader'
import ErrorMessage from './error-message'

const MapLoader = translate()(({small, t}) => (
  <Loader small={small}>
    {t('map.loading')}
  </Loader>
))

const NoWebglError = translate()(({small, t}) => (
  <ErrorMessage small={small}>
    {t('map.errors.noWebgl')}
  </ErrorMessage>
))

class MapWrapper extends React.PureComponent {
  static propTypes = {
    small: PropTypes.bool
  }

  static defaultProps = {
    small: false
  }

  state = {
    showMap: false
  }

  componentDidMount() {
    const {small} = this.props

    this.MapComponent = isWebglSupported() ? dynamic(import('./map' /* webpackChunkName: "centered-map" */), {
      ssr: false,
      loading: () => (
        <MapLoader small={small} />
      )
    }) : () => (
      <NoWebglError small={small} />
    )

    this.setState({
      showMap: true
    })
  }

  render() {
    const {small, ...props} = this.props
    const {showMap} = this.state

    if (showMap) {
      const {MapComponent} = this
      return <MapComponent {...props} />
    }

    return <MapLoader small={small} />
  }
}

export default MapWrapper
