import React from 'react'
import PropTypes from 'prop-types'
import getConfig from 'next/config'

import attachI18n from '../components/hoc/attach-i18n'

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
  static propTypes = {
    tReady: PropTypes.bool.isRequired
  }

  state = {}

  componentDidMount() {
    this.setState({
      catalogsPromise: _get(`${GEODATA_API_URL}/catalogs`)
    })
  }

  render() {
    const {tReady} = this.props
    const {catalogsPromise} = this.state

    return (
      <Page ready={tReady}>
        {() => (
          <React.Fragment>
            <Meta />
            <Content clouds>
              <Hero />

              <Catalogs catalogsPromise={catalogsPromise} />
              <Events />
            </Content>

            <NewsletterForm />
          </React.Fragment>
        )}
      </Page>
    )
  }
}

export default attachI18n('home')(IndexPage)
