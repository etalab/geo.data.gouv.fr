/* eslint-disable react/prop-types */

import React, { Component } from 'react'

import Button from '../../../../components/Buttons/Button'
import AuthentificationNeeded from '../../../../components/AuthentificationNeeded/AuthentificationNeeded'

import Message from './Message'
import DiscussionForm from './DiscussionForm'

import style from './Discussion.scss'

class Discussion extends Component {
  constructor(props) {
    super(props)
    this.state = { more: false, replyInput: false }
  }

  extendsHandle(e) {
    e.stopPropagation()
    this.setState({ replyInput: false, more: !this.state.more })
  }

  replyForm() {
    this.setState({ more: true, replyInput: true })
  }

  newReply(content, discussionId) {
    this.setState({ replyInput: false })
    this.props.returForm(content, discussionId)
  }

  render() {
    const { more, replyInput } = this.state
    const { discussion, user, formError } = this.props
    const conversation = discussion.discussion.map((msg, idx) => <Message key={idx} message={msg} />)
    const repliesNb = discussion.discussion.length - 1
    let replies

    if (!repliesNb) {
      replies = null
    } else if (repliesNb === 1) {
      replies = '1 réponse'
    } else {
      replies = `${repliesNb} réponses`
    }

    const reply = replyInput
      ? <AuthentificationNeeded user={user}>
        <DiscussionForm
          replyMode
          user={user}
          discussionId={discussion.id}
          error={formError}
          returForm={(content, discussionId) => this.newReply(content, discussionId)} />
      </AuthentificationNeeded>
      : <Button action={() => this.replyForm()} text='Répondre' />

    return (
      <div className={style.container}>
        { discussion.closed ? <div className={style.resolved}><i className='checkmark icon' /></div> : null}
        <div className={style.title}>{discussion.title}</div>
        <div className={style.messages}>
          { more ? conversation : <Message message={discussion.discussion[0]} />}
          <div className={replyInput ? style.form : style.action}>
            { more || !repliesNb ? reply : null }
            <div className={style.replies} onClick={(e) => this.extendsHandle(e)}>
              { more ? 'Fermer' : replies }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Discussion
