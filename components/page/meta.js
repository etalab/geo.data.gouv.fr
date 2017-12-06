import React from 'react'
import Head from 'next/head'

import reset from 'semantic-ui-css/components/reset.min.css'
import site from 'semantic-ui-css/components/site.min.css'

const Meta = () => (
  <Head>
    <meta charSet='utf-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1' />

    <meta name='theme-color' content='#ffffff' />

    <link rel='apple-touch-icon' sizes='180x180' href='/static/favicons/apple-icon-180x180.png' />
    <link rel='icon' type='image/png' sizes='16x16' href='/static/favicons/favicon-16x16.png' />
    <link rel='icon' type='image/png' sizes='32x32' href='/static/favicons/favicon-32x32.png' />
    <link rel='manifest' href='/static/favicons/manifest.json' />
    <link rel='mask-icon' href='/static/favicons/safari-pinned-tab.svg' color='#5bbad5' />

    {/* Global style */}
    <style dangerouslySetInnerHTML={{ __html: reset }} />
    <style dangerouslySetInnerHTML={{ __html: site }} />
  </Head>
)

export default Meta
