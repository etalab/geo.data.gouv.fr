import React, { Component } from 'react'
import { cancelAllPromises, waitForDataAndSetState } from './components'

import Errors from '../components/Errors/Errors'
import Loader from '../components/Loader'

export default function withResolver(WrappedComponent, dependencies) {
  return class ComponentWithResolver extends Component {
    constructor(props) {
      super(props)
      this.state = { errors: [] }
    }

    componentDidMount() {
      const dependenciesPromise = Promise.all(Object.keys(dependencies).map(dependencyName => {
        return waitForDataAndSetState(dependencies[dependencyName], this, dependencyName)
      }))

      dependenciesPromise.then(() => this.setState({ dependenciesReady: true }))

      return dependenciesPromise
    }

    componentWillUnmount() {
      return cancelAllPromises(this)
    }

    render() {
      const { errors, dependenciesReady } = this.state

      if (errors.length) {
        return <Errors errors={errors} />
      }

      if (!dependenciesReady) {
        return <Loader isLoading />
      }

      return <WrappedComponent {...this.state} {...this.props} />
    }
  }
}
