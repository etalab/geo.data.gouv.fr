import React from 'react'
import Head from 'next/head'

import Reset from './styles/reset'
import Global from './styles/global'

const PUBLIC_URL = process.env.PUBLIC_URL

export default () => (
  <Head>
    <meta charSet='utf-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1' />

    <title>geo.data.gouv.fr</title>

    {/* Twitter Card */}
    <meta name='twitter:card' content='summary' />
    <meta name='twitter:site' content='@geodatagouv' />
    <meta name='twitter:title' content='geo.data.gouv.fr' />
    <meta name='twitter:description' content='Trouvez facilement les données géographiques dont vous avez besoin' />
    <meta name='twitter:image' content={`${PUBLIC_URL}/static/images/geo-data-gouv-logo.jpg`} />

    {/* Open Graph */}
    <meta property='og:title' content='geo.data.gouv.fr' />
    <meta property='og:type' content='website' />
    <meta property='og:url' content={PUBLIC_URL} />
    <meta property='og:image' content={`${PUBLIC_URL}/static/images/geo-data-gouv-logo.jpg`} />
    <meta property='og:description' content='Trouvez facilement les données géographiques dont vous avez besoin' />
    <meta property='og:site_name' content='geo.data.gouv.fr' />

    <meta name='theme-color' content='#ffffff' />

    <link rel='apple-touch-icon' sizes='180x180' href='/static/favicons/apple-icon-180x180.png' />
    <link rel='icon' type='image/png' sizes='16x16' href='/static/favicons/favicon-16x16.png' />
    <link rel='icon' type='image/png' sizes='32x32' href='/static/favicons/favicon-32x32.png' />
    <link rel='manifest' href='/static/favicons/manifest.json' />
    <link rel='mask-icon' href='/static/favicons/safari-pinned-tab.svg' color='#5bbad5' />

    {/* Global styles */}
    <Reset />
    <Global />
  </Head>
)
