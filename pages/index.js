import React from 'react'
import {flowRight} from 'lodash'
import getConfig from 'next/config'

import attachI18n from '../components/hoc/attach-i18n'
import attachSession from '../components/hoc/attach-session'

import {_get} from '../lib/fetch'

import Page from '../components/page'
import Meta from '../components/meta'
import Content from '../components/content'

import Hero from '../components/home/hero'
import Catalogs from '../components/home/catalogs'
import Events from '../components/home/events'
import NewsletterForm from '../components/home/newsletter-form'

const {publicRuntimeConfig: {
  GEODATA_API_URL
}} = getConfig()

class IndexPage extends React.Component {
  state = {}

  async componentDidMount() {
    this.setState({
      catalogsPromise: _get(`${GEODATA_API_URL}/catalogs`)
    })
  }

  render() {
    const {catalogsPromise} = this.state

    return (
      <Page>
        <Meta />
        <Content clouds>
          <Hero />

          <Catalogs catalogsPromise={catalogsPromise} />
          <Events />
        </Content>

        <NewsletterForm />
      </Page>
    )
  }
}

export default flowRight(
  attachI18n('home'),
  attachSession
)(IndexPage)
