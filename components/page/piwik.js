import React from 'react'
import Head from 'next/head'

import {PIWIK_URL, PIWIK_SITE_ID} from '@env'

class Piwik extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      if (window.Piwik) {
        const tracker = window.Piwik.getTracker(`${PIWIK_URL}/piwik.php`, PIWIK_SITE_ID)

        tracker.trackPageView()
      }
    }, 300)
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

export default Piwik
