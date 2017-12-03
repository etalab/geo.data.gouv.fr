import React from 'react'
import PropTypes from 'prop-types'
import { flowRight } from 'lodash'

import { _get } from '../lib/fetch'

import withI18n from '../components/hoc/with-i18n'
import withAuth from '../components/hoc/with-auth'

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

    return (
      <Page>
        <Meta title={t('list.title')} />

        <Content clouds>
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
            margin: 10px;

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

export default flowRight(
  withI18n('catalogs'),
  withAuth()
)(CatalogsPage)
