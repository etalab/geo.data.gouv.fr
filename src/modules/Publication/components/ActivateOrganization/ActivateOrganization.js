/* eslint-disable react/prop-types */

import React, { Component } from 'react'

import Errors from '../../../../components/Errors/Errors'

import { markAsCancelable, cancelAllPromises } from '../../../../helpers/components'
import { updateOrganizationAccount } from '../../../../fetch/fetch'

import { msg, activate } from './ActivateOrganization.scss'

class ActivateOrganization extends Component {
  constructor(props) {
    super(props)
    this.state = { errors: [], activating: false }
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  activateAccount() {
    this.setState({ activating: true })
    const cancelablePromise = markAsCancelable(updateOrganizationAccount(this.props.organizationId), this)

    return cancelablePromise.promise
      .then(() => {
        this.setState({ activating: false })
        this.props.onActivation()
      })
      .catch(err => {
        if (err.isCanceled) return
        this.setState({
          activating: false,
          errors: ['Impossible d\'activer l\'outil sur votre organisation']
        })
      })
  }

  render() {
    const { errors, activating } = this.state

    if (errors.length) {
      return <Errors errors={errors} />
    }

    return (
      <div className={msg}>
        <h3>L'outil de publication n'est pas encore activé.</h3>
        <button className={activate} onClick={() => this.activateAccount()} disabled={activating}>Activer l'outil</button>
      </div>
    )
  }
}

export default ActivateOrganization
