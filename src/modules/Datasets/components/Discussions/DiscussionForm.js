/* eslint-disable react/prop-types */

import React, { Component } from 'react'

import Button from '../../../../components/Buttons/Button'

import { discussionForm, commentInput, avatar } from './DiscussionForm.scss'

class DiscussionForm extends Component {
  constructor(props) {
    super(props)
    this.state = { title: '', comment: '' }
  }

  onTitleChange(event) {
    this.setState({ title: event.target.value })
  }

  onCommentChange(event) {
    this.setState({ comment: event.target.value })
  }

  onKeyPress(event) {
    if (event.key === 'Enter') this.search()
  }

  search() {
    const { discussionId, replyMode, returForm } = this.props
    const { title, comment } = this.state

    if (replyMode) returForm(comment, discussionId)

    returForm(title, comment, discussionId)
  }

  render() {
    const { title, comment } = this.state
    const { user, replyMode = false, error } = this.props
    const titleInput = (
      <input
        type='text'
        value={title}
        onChange={e => this.onTitleChange(e)}
        onKeyPress={e => this.onKeyPress(e)}
        placeholder='Titre' />
    )

    return (
      <div className={discussionForm}>
        {error ? <p>Merci de préciser {!replyMode ? 'le titre et' : ''} le commentaire.</p> : null}
        {!replyMode ? titleInput : null}
        <div className={commentInput}>
          <img className={avatar} src={user.avatar || '/assets/avatar.png'} alt='avatar' />
          <textarea
            type='textarea'
            value={comment}
            onChange={e => this.onCommentChange(e)}
            onKeyPress={e => this.onKeyPress(e)}
            placeholder='Commentaire' />
        </div>

        <Button action={() => this.search()} text={replyMode ? 'Répondre' : 'Démarrer une discussion'} />
      </div>
    )
  }
}

export default DiscussionForm
