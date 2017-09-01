import React from 'react'
import PropTypes from 'prop-types'

import { Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'

import PageLayout from './PageLayout'

import HomeRoute from '../routes/Home'
import SearchRoute from '../routes/Search'
import DatasetRoute from '../routes/Dataset'
import EventsRoute from '../routes/Events'
import PublicationRoute from '../routes/Publication'

import NotFoundRoute from '../routes/NotFound'

import '../styles/global.scss'

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
          <PageLayout>
            <Switch>
              <Route exact path='/' component={HomeRoute} />
              <Route path='/search' component={SearchRoute} />
              <Route path='/datasets/:datasetId' component={DatasetRoute} />
              <Route path='/events' component={EventsRoute} />
              <Route path='/publication' component={PublicationRoute} />

              <Route component={NotFoundRoute} />
            </Switch>
          </PageLayout>
        </I18nextProvider>
      </Provider>
    )
  }
}

export default App
