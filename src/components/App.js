import React from 'react'
import PropTypes from 'prop-types'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import PageLayout from './PageLayout'
import ScrollToTop from './ScrollToTop'
import TrackPageViews from './TrackPageViews'

import PublicationRoute from '../routes/Publication'

import '../styles/global.scss'

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { store } = this.props

    return (
      <Provider store={store}>
        <BrowserRouter>
          <PageLayout>
            <ScrollToTop />
            <TrackPageViews />

            <Switch>
              <Route path='/publication' component={PublicationRoute} />
            </Switch>
          </PageLayout>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
