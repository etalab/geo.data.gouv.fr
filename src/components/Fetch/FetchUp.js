import React, { Component } from 'react'
import { find } from 'lodash'
import Errors from '../Errors/Errors'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'

class FetchUp extends Component {
  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentWillMount() {
    if (!this.props.promises) return
    const promises = this.props.promises.map(promise =>
      waitForDataAndSetState(promise.fetch(promise.value), this, promise.name)
    )

    return Promise.all(promises)
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  allStateReady() {
    return !find(this.props.promises, prop => !this.state[prop.name])
  }

  render() {
    const { errors } = this.state
    const { component } = this.props

    if (errors.length) return <Errors errors={errors}/>
    if (!this.allStateReady() || !component) return null

    const props = {...this.state}
    delete props.errors
    return <component.type {...props} />
  }
}

export default FetchUp
