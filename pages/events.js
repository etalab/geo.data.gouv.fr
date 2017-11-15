import React from 'react'

import withI18n from '../components/hoc/with-i18n'

import Page from '../components/page'
import Meta from '../components/meta'
import Content from '../components/content'
import Container from '../components/container'

const EventsPage = () => (
  <Page>
    <Meta title={'events'} />

    <Content>
      <Container />
    </Content>
  </Page>
)

export default withI18n('events')(EventsPage)
