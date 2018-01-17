import {flowRight} from 'lodash'

import attachI18n from '../../components/hoc/attach-i18n'
import attachSession from '../../components/hoc/attach-session'

import Page from '../../components/page'
import Meta from '../../components/meta'
import Content from '../../components/content'
import Container from '../../components/container'
import RequireAuth from '../../components/require-auth'

import Header from '../../components/publication/header'
import Breadcrumbs from '../../components/publication/breadcrumbs'
import OrganizationPreview from '../../components/publication/organization-preview'

const renderAuth = user => (
  <div>
    <Header user={user} />
    <Breadcrumbs />
    <div className='organizations'>
      {user.organizations.map(organization => (
        <div key={organization.id}>
          <OrganizationPreview organization={organization} />
        </div>
      ))}
    </div>

    <style jsx>{`
      .organizations {
        display: flex;
        flex-wrap: wrap;
        margin-left: -1em;
        margin-right: -1em;

        div {
          width: 290px;

          margin: 0 1em 1em 1em;

          @media (max-width: 551px) {
            width: 100%;
          }
        }
      }
    `}</style>
  </div>
)

const PublicationPage = () => (
  <Page>
    <Meta title='Publication' />

    <Content>
      <Container fluid>
        <RequireAuth message='Vous devez être connecté pour accéder à l’interface de publication.' render={renderAuth} />
      </Container>
    </Content>
  </Page>
)

export default flowRight(
  attachI18n(),
  attachSession
)(PublicationPage)
