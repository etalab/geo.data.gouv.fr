import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { translate } from 'react-i18next'

import withI18n from '../components/hoc/with-i18n'

import { _get } from '../lib/fetch'

import Page from '../components/page'
import CatalogPreview from '../components/catalog-preview'

class CatalogsPage extends React.Component {
  static propTypes = {
    catalogs: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired
    })).isRequired
  }

  static async getInitialProps(context) {
    const catalogs = await _get(`${process.env.GEODATA_API_URL}/catalogs`)

    return {
      catalogs
    }
  }

  render() {
    const { catalogs } = this.props

    return (
      <Page>
        <Head>
          <title>Catalogs</title>
        </Head>

        <ul>
          {catalogs.map(catalog => (
            <li key={catalog._id}>
              <CatalogPreview catalog={catalog} />
            </li>
          ))}
        </ul>

        <style jsx>{`
          ul {
            text-align: center;
          }

          li {
            display: inline-block;
            margin: 1em 3em;
          }

          @media (max-width: 768px) {
            li {
              margin: 1em;
            }
          }
        `}</style>
      </Page>
    )
  }
}

export default withI18n('catalogs')(CatalogsPage)
