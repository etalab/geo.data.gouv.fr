import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import createPiwikConnector from 'piwik-react-router'

const { PIWIK_URL, PIWIK_SITE_ID } = process.env

class TrackPageViews extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    if (PIWIK_URL && PIWIK_SITE_ID) {
      this.piwik = createPiwikConnector({
        url: PIWIK_URL,
        siteId: PIWIK_SITE_ID
      })
    }
  }

  trackPageView = () => {
    if (this.piwik) {
      const { location } = this.props

      // We’re waiting 300ms for the page title to be updated.
      // Since all components should be mounted by now, it should be enough.
      setTimeout(() => {
        this.piwik.track(location)
      }, 300)
    }
  }

  componentDidMount() {
    this.trackPageView()
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props

    if (location !== prevProps.location) {
      this.trackPageView()
    }
  }

  render() {
    return null
  }
}

export default withRouter(TrackPageViews)
