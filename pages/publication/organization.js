import React from 'react'
import { flowRight } from 'lodash'

import withI18n from '../../components/hoc/with-i18n'
import withAuth from '../../components/hoc/with-auth'

import Page from '../../components/page'
import Meta from '../../components/meta'
import Content from '../../components/content'
import Container from '../../components/container'
import RequireAuth from '../../components/require-auth'

class PublicationPage extends React.Component {
  render() {
    return (
      <Page>
        <Meta title='Organisation | Publication' />

        <Content>
          <Container fluid>
            <RequireAuth message='Vous devez être connecté pour accéder à l’interface de publication.' render={user => (
              'organization page'
            )} />
          </Container>
        </Content>
      </Page>
    )
  }
}

export default flowRight(
  withI18n(),
  withAuth()
)(PublicationPage)
