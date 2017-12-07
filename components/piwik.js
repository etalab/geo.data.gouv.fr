import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { withRouter } from 'next/router'

import { PIWIK_URL, PIWIK_SITE_ID } from '@env'

class Piwik extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  componentDidMount() {
    const { title } = this.props

    if (window.Piwik) {
      const tracker = window.Piwik.getAsyncTracker()

      tracker.setTrackerUrl(`${PIWIK_URL}/piwik.php`)
      tracker.setSiteId(PIWIK_SITE_ID)
      tracker.trackPageView(title)
    }
  }

  render() {
    if (!PIWIK_URL || !PIWIK_SITE_ID) {
      return null
    }

    return (
      <Head>
        <script src={`${PIWIK_URL}/piwik.js`} defer async />
      </Head>
    )
  }
}

export default withRouter(Piwik)
