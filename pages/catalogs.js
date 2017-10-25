import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { translate } from 'react-i18next'

import withI18n from '../components/hoc/with-i18n'

import { _get } from '../lib/fetch'

import Page from '../components/page'
import Content from '../components/content'
import Container from '../components/container'
import CatalogPreview from '../components/catalog-preview'

import { GEODATA_API_URL } from '@env'

class CatalogsPage extends React.Component {
  static propTypes = {
    catalogs: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired
    })).isRequired,

    t: PropTypes.func.isRequired
  }

  static async getInitialProps(context) {
    const catalogs = await _get(`${GEODATA_API_URL}/catalogs`)

    return {
      catalogs
    }
  }

  render() {
    const { catalogs, t } = this.props

    return (
      <Page>
        <Head>
          <title>{t('list.title')}</title>
        </Head>

        <Content>
          <Container fluid>
            <h1>{t('list.title')}</h1>

            <section>
              {catalogs.map(catalog => (
                <div key={catalog._id}>
                  <CatalogPreview catalog={catalog} />
                </div>
              ))}
            </section>
          </Container>
        </Content>

        <style jsx>{`
          h1 {
            color: #fff;
            font-size: xx-large;
            font-weight: 100;
            margin-bottom: 1em;
            text-align: center;
          }

          section {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }

          div {
            margin: 10px 20px;

            @media (max-width: 551px) {
              margin: 10px 0;
              flex-grow: 1;
            }
          }
        `}</style>
      </Page>
    )
  }
}

export default withI18n('catalogs')(translate('catalogs', {
  wait: process.browser
})(CatalogsPage))
