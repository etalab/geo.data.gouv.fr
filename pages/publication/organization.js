import React from 'react'
import PropTypes from 'prop-types'
import { flowRight } from 'lodash'

import { _get } from '../../lib/fetch'

import withI18n from '../../components/hoc/with-i18n'
import withAuth from '../../components/hoc/with-auth'
import withSession from '../../components/hoc/with-session'

import Page from '../../components/page'
import Meta from '../../components/meta'
import Content from '../../components/content'
import Container from '../../components/container'
import RequireAuth from '../../components/require-auth'
import Box from '../../components/box'

import Header from '../../components/publication/header'

import { PUBLICATION_BASE_URL } from '@env'

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
        organizationPromise: _get(`${PUBLICATION_BASE_URL}/api/organizations/${organizationId}`),
        metricsPromise: _get(`${PUBLICATION_BASE_URL}/api/organizations/${organizationId}/datasets/metrics`)
      })
    }
  }

  renderAuth = user => {
    const { organizationId } = this.props
    const organization = user.organizations.find(org => org.id === organizationId)

    return (
      <div>
        <Meta title={`${organization.name} | Publication`} />

        <Header user={user} organization={organization} />
        <h3>{organization.name}</h3>
        <div className='dashboard'>
          <Box title='Catalogues source' color='blue' />
          <Box title='Producteurs source' color='blue' />
          <Box title='Jeux de données' color='blue' />
        </div>

        <style jsx>{`
          .dashboard {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 4em;

            @media (max-width: 1280px) {
              grid-gap: 2em;
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
