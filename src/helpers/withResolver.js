import React, { Component } from 'react'
import { cancelAllPromises, markAsCancelable } from './components'
import Promise from 'bluebird'

import Errors from '../components/Errors/Errors'
import ContentLoader from '../components/Loader/ContentLoader'


function waitForDataAndSetState(dataPromise, component, stateName) {
  const cancelablePromise = markAsCancelable(dataPromise, component);

  return cancelablePromise.promise
    .then(data => {
      const update = {};
      update[stateName] = data;
      component.setState(update);
    })
    .catch(err => {
      if (err.isCanceled) return;
      if (!component.state.errors.includes(err.message)) {
        const errors = [...component.state.errors, err.message]
        component.setState({ errors })
      }
    });
}

export default function withResolver(WrappedComponent, dependencies) {
  return class ComponentWithResolver extends Component {
    constructor(props) {
      super(props)
      this.state = { errors: [] }
    }

    componentDidMount() {
      const dependenciesPromise = Promise.map(Object.keys(dependencies), dependencyName => {
        return waitForDataAndSetState(dependencies[dependencyName], this, dependencyName)
      })

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
        return <ContentLoader />
      }

      return <WrappedComponent {...this.state} {...this.props} />
    }
  }
}
