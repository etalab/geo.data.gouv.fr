import React, { Component } from 'react'

import Errors from '../../../../components/Errors/Errors'

import { updateOrganizationAccount } from '../../../../fetch/fetch'

import { activate } from './ActivateOrganization.css'

class ActivateOrganization extends Component {
  constructor(props) {
    super(props)
    this.state = { errors: [], activating: false }
  }

  activateAccount() {
    this.setState({ activating: true })
    return updateOrganizationAccount(this.props.organizationId)
      .then(() => {
        this.setState({ activating: false })
        this.props.onActivation()
      })
      .catch(err => {
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
      <div>
        <p>L'outil de publication n'est pas encore activé.</p>
        <button className={activate} onClick={() => this.activateAccount()} disabled={activating}>Activer l'outil</button>
      </div>
    )
  }
}

export default ActivateOrganization
