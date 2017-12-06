import React from 'react'
import PropTypes from 'prop-types'
import { flowRight } from 'lodash'

import IconBack from 'react-icons/lib/fa/long-arrow-left'

import { _get, _put } from '../../lib/fetch'

import withI18n from '../../components/hoc/with-i18n'
import withAuth from '../../components/hoc/with-auth'
import withSession from '../../components/hoc/with-session'

import Page from '../../components/page'
import Meta from '../../components/meta'
import Content from '../../components/content'
import Container from '../../components/container'
import RequireAuth from '../../components/require-auth'
import Box from '../../components/box'
import Link from '../../components/link'

import Header from '../../components/publication/header'
import Breadcrumbs from '../../components/publication/breadcrumbs'
import SourceCatalogs from '../../components/publication/organization/source-catalogs'
import SourceProducers from '../../components/publication/organization//source-producers'
import DatasetMetrics from '../../components/publication/organization//dataset-metrics'

import { PUBLICATION_BASE_URL, GEODATA_API_URL } from '@env'

class PublicationPage extends React.Component {
  static propTypes = {
    organizationId: PropTypes.string.isRequired,
    session: PropTypes.shape({
      user: PropTypes.object
    })
  }

  static getInitialProps({ query }) {
    return {
      organizationId: query.oid
    }
  }

  state = {}

  componentWillReceiveProps(props, state, context) {
    const { session, organizationId } = props

    if (session && session.user && !this.props.session) {
      this.setState({
        organizationPromise: _get(`${PUBLICATION_BASE_URL}/api/organizations/${organizationId}/`),
        catalogsPromise: _get(`${GEODATA_API_URL}/catalogs`),
        metricsPromise: _get(`${PUBLICATION_BASE_URL}/api/organizations/${organizationId}/datasets/metrics/`)
      })
    }
  }

  removeCatalog = (organization, catalog) => {
    const catalogs = organization.sourceCatalogs.filter(c => c !== catalog._id)

    this.setState({
      organizationPromise: _put(`${PUBLICATION_BASE_URL}/api/organizations/${organization._id}`, {
        sourceCatalogs: catalogs
      })
    })
  }

  addCatalog = (organization, catalog) => {
    const catalogs = [
      ...organization.sourceCatalogs,
      catalog._id
    ]

    this.setState({
      organizationPromise: _put(`${PUBLICATION_BASE_URL}/api/organizations/${organization._id}`, {
        sourceCatalogs: catalogs
      })
    })
  }

  renderAuth = user => {
    const { organizationId } = this.props
    const organization = user.organizations.find(org => org.id === organizationId)

    const { organizationPromise, catalogsPromise, metricsPromise } = this.state

    return (
      <div>
        <Meta title={`${organization.name} | Publication`} />

        <Header user={user} organization={organization} />
        <Breadcrumbs organization={organization} />
        <div className='dashboard'>
          <Box title='Catalogues source' color='blue'>
            <SourceCatalogs
              promise={Promise.all([organizationPromise, catalogsPromise])}
              removeCatalog={this.removeCatalog}
              addCatalog={this.addCatalog}
            />
          </Box>
          <Box title='Producteurs source' color='blue'>
            <SourceProducers
              promise={organizationPromise}
            />
          </Box>
          <Box title='Jeux de données' color='blue'>
            <DatasetMetrics
              promise={Promise.all([organizationPromise, metricsPromise])}
            />
          </Box>
        </div>

        <style jsx>{`
          h2 {
            font-size: 1.5em;
            font-weight: normal;
            margin-bottom: 1.6em;
          }

          .dashboard {
            display: grid;
            grid-template-columns: repeat(auto-fill, 430px);
            grid-gap: 2em 3em;

            @media (max-width: 1480px) {
              grid-gap: 1em 2em;
            }

            @media (max-width: 960px) {
              grid-template-columns: repeat(auto-fill, calc(50% - 1em));
            }

            @media (max-width: 768px) {
              display: block;
            }
          }
        `}</style>
      </div>
    )
  }

  render() {
    return (
      <Page>
        <Meta title='Publication' />

        <Content>
          <Container fluid>
            <RequireAuth
              message='Vous devez être connecté pour accéder à l’interface de publication.'
              render={this.renderAuth} />
          </Container>
        </Content>
      </Page>
    )
  }
}

export default flowRight(
  withI18n(),
  withAuth(),
  withSession()
)(PublicationPage)
