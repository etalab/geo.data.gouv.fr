import React from 'react'
import PropTypes from 'prop-types'
import {flowRight} from 'lodash'
import FaBook from 'react-icons/lib/fa/book'

import attachI18n from '../components/hoc/attach-i18n'
import attachSession from '../components/hoc/attach-session'

import Page from '../components/page'
import Meta from '../components/meta'
import Content from '../components/content'
import Container from '../components/container'
import Link from '../components/link'

import PageTitle from '../components/doc/page-title'

class DocumentationPage extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    tReady: PropTypes.bool.isRequired
  }

  render() {
    const {t, tReady} = this.props

    return (
      <Page ready={tReady}>
        {() => (
          <React.Fragment>
            <Meta title='Documentation' />

            <PageTitle title='Documentation' icon={<FaBook />}>
              Retrouvez ici toute la documentation liée à l’utilisation de la plateforme
            </PageTitle>

            <Content>
              <Container>
                <ul>
                  <Link href='/doc/publish-your-data'>
                    <a>
                      <h3>{t('footer.publishData')}</h3>
                    </a>
                  </Link>
                </ul>

              </Container>
            </Content>
          </React.Fragment>
        )}
      </Page>
    )
  }
}

export default flowRight(
  attachI18n(),
  attachSession
)(DocumentationPage)
