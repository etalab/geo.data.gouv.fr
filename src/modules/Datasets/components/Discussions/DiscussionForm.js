import React, { Component } from 'react'

import Button from '../../../../components/Buttons/Button'

import { discussionForm, commentInput, avatar } from './DiscussionForm.css'

class DiscussionForm extends Component {
  constructor(props) {
    super(props)
    this.state = { title: '', comment: '' }
  }

  onTitleChange(event) {
    this.setState({title: event.target.value});
  }

  onCommentChange(event) {
    this.setState({comment: event.target.value});
  }

  onKeyPress(event) {
    if (event.key === 'Enter') {
      const { title, comment } = this.state
      this.props.createDiscussion(title, comment)
    }
  }

  search() {
    const { title, comment } = this.state
    this.props.createDiscussion(title, comment)
  }

  render() {
    const { title, comment } = this.state
    const { user, error } = this.props

    return (
      <div className={discussionForm}>
        {error ? <p>Merci de préciser le titre et le commentaire de votre discussion.</p> : null}
        <input
          type='text'
          value={title}
          onChange={e => this.onTitleChange(e)}
          onKeyPress={e => this.onKeyPress(e)}
          placeholder='Titre' />
        <div className={commentInput}>
          <img className={avatar} src={user.avatar || '/assets/avatar.png'} alt="avatar"/>
          <textarea
            type='textarea'
            value={comment}
            onChange={e => this.onCommentChange(e)}
            onKeyPress={e => this.onKeyPress(e)}
            placeholder='Commentaire' />
        </div>

        <Button action={() => this.search()} text='Démarrer une discussion' />
      </div>
    )
  }
}

export default DiscussionForm
