import React from 'react'
import PropTypes from 'prop-types'
import { flowRight } from 'lodash'

import { _get, _post, _delete } from '../../lib/fetch'

import attachI18n from '../../components/hoc/attach-i18n'
import attachSession from '../../components/hoc/attach-session'
import withSession from '../../components/hoc/with-session'

import Page from '../../components/page'
import Meta from '../../components/meta'
import Content from '../../components/content'
import Container from '../../components/container'
import RequireAuth from '../../components/require-auth'

import Header from '../../components/publication/header'
import Breadcrumbs from '../../components/publication/breadcrumbs'

import Producers from '../../components/publication/producers'

import { PUBLICATION_BASE_URL } from '@env'

class ProducersPage extends React.Component {
  static propTypes = {
    organizationId: PropTypes.string.isRequired,
    session: PropTypes.shape({
      user: PropTypes.object
    })
  }

  state = {}

  static getInitialProps({ query }) {
    return {
      organizationId: query.oid
    }
  }

  fetchProducers = () => {
    const { organizationId } = this.props

    return _get(`${PUBLICATION_BASE_URL}/api/organizations/${organizationId}/producers`)
  }

  componentWillReceiveProps(props, state, context) {
    const { session } = props

    if (session && session.user && !this.props.session) {
      this.setState({
        producersPromise: this.fetchProducers(),
        organizationsPromise: _get(`${PUBLICATION_BASE_URL}/api/organizations`)
      })
    }
  }

  associateProducer = (organization, producer) => {
    this.setState({
      producersPromise: _post(`${PUBLICATION_BASE_URL}/api/organizations/${organization.id}/producers`, {
        _id: producer._id
      }).then(() => this.fetchProducers())
    })
  }

  dissociateProducer = (organization, producer) => {
    this.setState({
      producersPromise: _delete(`${PUBLICATION_BASE_URL}/api/organizations/${organization.id}/producers/${producer._id}`).then(() => this.fetchProducers())
    })
  }

  renderAuth = user => {
    const { organizationId } = this.props
    const organization = user.organizations.find(org => org.id === organizationId)

    const { producersPromise, organizationsPromise } = this.state

    return (
      <div>
        <Meta title={`Producteurs | ${organization.name} | Publication`} />

        <Header user={user} organization={organization} />
        <Breadcrumbs organization={organization} page='producers' />
        <Producers
          organization={organization}
          promise={Promise.all([producersPromise, organizationsPromise])}
          associate={this.associateProducer}
          dissociate={this.dissociateProducer}
        />
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
              render={this.renderAuth}
            />
          </Container>
        </Content>
      </Page>
    )
  }
}

export default flowRight(
  attachI18n(),
  attachSession,
  withSession
)(ProducersPage)
