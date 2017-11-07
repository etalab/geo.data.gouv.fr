import React from 'react'

import withI18n from '../components/hoc/with-i18n'

import Page from '../components/page'
import Content from '../components/content'
import Container from '../components/container'

import Header from '../components/search/header'

class SearchPage extends React.Component {
  render() {
    return (
      <Page>
        <Content>
          <Container fluid>
            <Header />
          </Container>
        </Content>
      </Page>
    )
  }
}

export default withI18n('search')(SearchPage)
