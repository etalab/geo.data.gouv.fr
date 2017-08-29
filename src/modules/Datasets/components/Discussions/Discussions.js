/* eslint-disable react/prop-types */

import React, { Component } from 'react'

import Discussion from './Discussion'
import DiscussionForm from './DiscussionForm'

import Button from '../../../../components/Buttons/Button'
import AuthentificationNeeded from '../../../../components/AuthentificationNeeded/AuthentificationNeeded'

import { getDiscussions, getUser, createNewDiscussion, createNewReply } from '../../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'

class Discussions extends Component {
  constructor(props) {
    super(props)
    this.state = { discussionForm: false, formError: false, errors: [] }
  }

  componentWillMount() {
    return Promise.all([
      this.updateDiscussions(),
      this.updateUser()
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
    this.setState({ discussionForm: true })
  }

  createDiscussion(title, comment, discussionId) {
    const { remoteId } = this.props

    if (!title || !comment) return this.setState({ formError: true })

    const newDiscussion = {
      title,
      comment,
      subject: {
        id: remoteId,
        class: 'Dataset'
      }
    }

    createNewDiscussion(newDiscussion, discussionId)
      .then(discussion => {
        const updatedDiscussions = this.state.discussions

        updatedDiscussions.data.push(discussion)
        this.setState({ discussions: updatedDiscussions, discussionForm: false, formError: false })
      })
  }

  createReply(comment, discussionId) {
    if (!comment) return this.setState({ formError: true })

    createNewReply({ comment }, discussionId)
      .then(() => {
        this.updateDiscussions()
        this.setState({ discussionForm: false, formError: false })
      })
  }

  render() {
    const { discussions, discussionForm, user, formError } = this.state
    const { remoteId } = this.props

    return (
      <div>
        {discussions
          ? discussions.data.map((discussion, idx) =>
            <Discussion
              key={idx}
              user={user}
              formError={formError}
              remoteId={remoteId}
              discussion={discussion}
              returForm={(comment, discussionId) => this.createReply(comment, discussionId)} />)
          : null
        }
        {discussionForm
          ? <AuthentificationNeeded user={user}>
            <DiscussionForm
              user={user}
              error={formError}
              returForm={(title, comment, discussionId) => this.createDiscussion(title, comment, discussionId)} />
          </AuthentificationNeeded>
          : <Button text={'Démarrer une nouvelle discussion'} action={() => this.showDiscussionForm()} />
        }
      </div>
    )
  }
}

export default Discussions
