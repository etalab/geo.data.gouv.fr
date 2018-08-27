import React from 'react'
import PropTypes from 'prop-types'
import {flowRight} from 'lodash'
import getConfig from 'next/config'

import {_get} from '../lib/fetch'
import {sortByScore} from '../lib/catalog'

import attachI18n from '../components/hoc/attach-i18n'
import withErrors from '../components/hoc/with-errors'

import Page from '../components/page'
import Meta from '../components/meta'
import Content from '../components/content'
import Container from '../components/container'
import CatalogPreview from '../components/catalog-preview'

const {publicRuntimeConfig: {
  GEODATA_API_URL
}} = getConfig()

class CatalogsPage extends React.Component {
  static propTypes = {
    catalogs: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired
    })).isRequired,

    t: PropTypes.func.isRequired,
    tReady: PropTypes.bool.isRequired
  }

  static async getInitialProps() {
    const catalogs = await _get(`${GEODATA_API_URL}/catalogs`)

    return {
      catalogs
    }
  }

  render() {
    const {catalogs, t, tReady} = this.props

    const sorted = sortByScore(catalogs)

    return (
      <Page ready={tReady}>
        {() => (
          <React.Fragment>
            <Meta title={t('list.title')} />

            <Content clouds>
              <Container fluid>
                <h1>{t('list.title')}</h1>

                <section>
                  {sorted.map(catalog => (
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
                font-size: 2.2em;
                font-weight: 500;
                margin: 0.5em 0 1em;
                text-align: center;
              }

              section {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
              }

              div {
                width: 360px;
                margin: 10px;

                @media (max-width: 551px) {
                  width: 100%;
                  margin: 10px 0;
                }
              }
            `}</style>
          </React.Fragment>
        )}
      </Page>
    )
  }
}

export default flowRight(
  attachI18n('catalogs'),
  withErrors
)(CatalogsPage)
