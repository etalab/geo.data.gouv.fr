import React from 'react'
import PropTypes from 'prop-types'
import { flowRight } from 'lodash'

import { _get } from '../lib/fetch'
import { sortByScore } from '../lib/catalog'

import attachI18n from '../components/hoc/attach-i18n'
import attachSession from '../components/hoc/attach-session'

import Page from '../components/page'
import Meta from '../components/meta'
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

    const sorted = sortByScore(catalogs)

    return (
      <Page>
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
            width: 360px;
            margin: 10px;

            @media (max-width: 551px) {
              width: 100%;
              margin: 10px 0;
            }
          }
        `}</style>
      </Page>
    )
  }
}

export default flowRight(
  attachI18n('catalogs'),
  attachSession
)(CatalogsPage)
