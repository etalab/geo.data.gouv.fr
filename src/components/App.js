import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'

import PageLayout from './PageLayout'
import ScrollToTop from './ScrollToTop'
import TrackPageViews from './TrackPageViews'

import HomeRoute from '../routes/Home'
import SearchRoute from '../routes/Search'
import DatasetRoute from '../routes/Dataset'
import CatalogRoute from '../routes/Catalogs'
import EventsRoute from '../routes/Events'
import PublicationRoute from '../routes/Publication'

import NotFoundRoute from '../routes/NotFound'

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    i18n: PropTypes.object.isRequired
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { store, i18n } = this.props

    return (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <PageLayout>
              <Helmet titleTemplate='%s | inspire.data.gouv.fr' defaultTitle='inspire.data.gouv.fr' />
              <ScrollToTop />
              <TrackPageViews />

              <Switch>
                <Route exact path='/' component={HomeRoute(store, i18n)} />
                <Route path='/search' component={SearchRoute(store, i18n)} />
                <Route path='/datasets/:datasetId' component={DatasetRoute(store, i18n)} />
                <Route path='/catalogs' component={CatalogRoute(store, i18n)} />
                <Route path='/events' component={EventsRoute(store, i18n)} />
                <Route path='/publication' component={PublicationRoute(store, i18n)} />

                <Route component={NotFoundRoute(store, i18n)} />
              </Switch>
            </PageLayout>
          </BrowserRouter>
        </I18nextProvider>
      </Provider>
    )
  }
}

export default App
