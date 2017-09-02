import React from 'react'

import { Switch, Route } from 'react-router-dom'

import PageLayout from './PageLayout'

import HomeRoute from '../routes/Home'
import SearchRoute from '../routes/Search'
import DatasetRoute from '../routes/Dataset'
import EventsRoute from '../routes/Events'
import PublicationRoute from '../routes/Publication'

import NotFoundRoute from '../routes/NotFound'

// import '../styles/global.scss'

class App extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
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
    )
  }
}

export default App
