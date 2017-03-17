import React, { Component } from 'react'

import Discussion from './Discussion'
import DiscussionForm from './DiscussionForm'

import Button from '../../../../components/Buttons/Button'

import { getDiscussions, getUser } from '../../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'

import { container } from './Discussions.css'

class Discussions extends Component {
  constructor(props) {
    super(props)
    this.state = {discussionForm: false, formError: false, errors: []}
  }

  componentWillMount() {
    return Promise.all([
      this.updateDiscussions(),
      this.updateUser(),
    ])
  }

  updateUser() {
    return waitForDataAndSetState(getUser(), this, 'user')
  }

  updateDiscussions() {
    const { remoteId } = this.props

    if (!remoteId) return
    return waitForDataAndSetState(getDiscussions(remoteId), this, 'discussions')
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  showDiscussionForm() {
    this.setState({discussionForm: true})
  }

  createDiscussion(title, comment) {
    if (!title || !comment) return this.setState({ formError: true })
    this.setState({ formError: false })
    console.log('creation de la discussion: ', title, ' ', comment);
  }

  render() {
    const { discussions, discussionForm, user, formError } = this.state
    const { datasetId, remoteId } = this.props
    const redirect = `${process.env.PUBLIC_URL}/datasets/${datasetId}`
    const logInUrl =`https://inspire.data.gouv.fr/dgv/login?redirect=${encodeURIComponent(redirect)}`

    const newDiscussion = user ?
      <Button text={'Démarrer une nouvelle discussion'} action={() => this.showDiscussionForm()}/> :
      <a href={logInUrl}><Button text={'Démarrer une nouvelle discussion'}/></a>

    return (
      <div className={container}>
        {discussions ?
          discussions.data.map((discussion, idx) => <Discussion key={idx} remoteId={remoteId} discussion={discussion} />)
          : null
        }
        {discussionForm ?
          <DiscussionForm user={user} error={formError} createDiscussion={(title, comment) => this.createDiscussion(title, comment)} /> :
          newDiscussion
        }
      </div>
    )
  }
}



export default Discussions
