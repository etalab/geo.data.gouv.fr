import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

import CommentIcon from 'react-icons/lib/fa/comments'
import ReplyIcon from 'react-icons/lib/fa/mail-reply'

import Button from '../../button'

class DiscussionForm extends React.Component {
  static propTypes = {
    replying: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,

    user: PropTypes.shape({
      avatar_thumbnail: PropTypes.string
    }).isRequired,

    t: PropTypes.func.isRequired
  }

  static defaultProps = {
    replying: false
  }

  state = {
    error: false,
    title: '',
    comment: ''
  }

  onTitleChange = e => {
    this.setState({
      error: false,
      title: e.target.value
    })
  }

  onCommentChange = e => {
    this.setState({
      error: false,
      comment: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()

    const {replying, onSubmit} = this.props
    const {title, comment} = this.state

    if (replying) {
      if (!comment) {
        return this.setState({
          error: true
        })
      }
    } else if (!comment || !title) {
      return this.setState({
        error: true
      })
    }

    onSubmit({
      title,
      comment
    })
  }

  render() {
    const {user, replying, t} = this.props
    const {title, comment, error} = this.state

    return (
      <form onSubmit={this.onSubmit}>
        {error && (replying ? (
          <p>{t('discussions.errors.replyValidation')}</p>
        ) : (
          <p>{t('discussions.errors.postValidation')}</p>
        ))}

        {!replying && (
          <input
            type='text'
            value={title}
            placeholder={t('discussions.fields.title')}
            onChange={this.onTitleChange}
          />
        )}
        <div>
          <img src={user.avatar_thumbnail || '/static/images/avatar.png'} alt='avatar' />
          <textarea
            type='textarea'
            value={comment}
            placeholder={t('discussions.fields.message')}
            onChange={this.onCommentChange}
          />
        </div>

        <Button type='submit'>
          {replying ? (
            <Fragment>
              <ReplyIcon style={{verticalAlign: -2}} /> {t('discussions.reply')}
            </Fragment>
          ) : (
            <Fragment>
              <CommentIcon style={{verticalAlign: -2}} /> {t('discussions.start')}
            </Fragment>
          )}
        </Button>

        <style jsx>{`
          @import 'colors';

          form {
            display: flex;
            flex-direction: column;
            text-align: left;
          }

          p {
            color: $red;
            margin-bottom: 4px;
          }

          input {
            padding: 0.7em;
            border: 1px solid $lightgrey;
          }

          textarea {
            padding: 0.7em;
            width: 100%;
            border: 1px solid $lightgrey;
            height: 53px;
            resize: none;
          }

          button {
            margin: 0 1em 0.5em;
          }

          div {
            display: flex;
            align-items: center;
          }

          img {
            margin: 1em 1em 1em 0;
            width: 53px;
            height: 53px;
          }
        `}</style>
      </form>
    )
  }
}

export default translate('dataset')(DiscussionForm)
