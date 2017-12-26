import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

import ReplyIcon from 'react-icons/lib/fa/mail-reply'
import CheckIcon from 'react-icons/lib/fa/check'

import RequireAuth from '../../require-auth'
import Button from '../../button'

import Form from './form'
import Message from './message'

class Discussion extends React.Component {
  static propTypes = {
    discussion: PropTypes.shape({
      id: PropTypes.string.isRequired,
      closed: PropTypes.bool,
      title: PropTypes.string.isRequired,
      discussion: PropTypes.array.isRequired
    }).isRequired,

    onReply: PropTypes.func.isRequired,

    t: PropTypes.func.isRequired
  }

  state = {
    expanded: false,
    showReplies: false
  }

  onSubmit = ({comment}) => {
    const {onReply, discussion} = this.props

    this.setState({
      expanded: false
    })

    onReply(discussion.id, comment)
  }

  toggleReplies = () => {
    this.setState(state => ({
      showReplies: !state.showReplies,
      expanded: state.showReplies ? false : state.showReplies
    }))
  }

  onExpand = () => {
    this.setState({
      expanded: true
    })
  }

  renderAuth = user => (
    <Form onSubmit={this.onSubmit} user={user} replying />
  )

  render() {
    const {discussion, t} = this.props
    const {expanded, showReplies} = this.state

    const replyCount = discussion.discussion.length - 1

    return (
      <div className='discussion'>
        <h4>
          {discussion.closed && <CheckIcon style={{verticalAlign: -2}} />} {discussion.title}
        </h4>
        {(showReplies || !replyCount) ? (
          <div>
            {discussion.discussion.map((message, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <Message key={idx} message={message} />
            ))}

            <div className='footer'>
              {expanded ? (
                <div>
                  <RequireAuth message={t('discussions.loggedOutReplyMessage')} render={this.renderAuth} />
                  <span onClick={this.toggleReplies}>{t('discussions.closeReplies')}</span>
                </div>
              ) : (
                <div>
                  <Button onClick={this.onExpand}>
                    <ReplyIcon style={{verticalAlign: -2}} /> {t('discussions.reply')}
                  </Button>
                  <span onClick={this.toggleReplies}>{t('discussions.closeReplies')}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <Message message={discussion.discussion[0]} />
            <div className='footer'>
              <span onClick={this.toggleReplies}>{t('discussions.replyCount', {
                count: replyCount
              })}</span>
            </div>
          </div>
        )}
        <style jsx>{`
          @import 'colors';

          .discussion {
            border-left: 2px solid $blue;
            padding-left: 10px;
          }

          .message {
            margin-bottom: 1em;
          }

          h4 {
            :global(svg) {
              color: $blue;
              margin-right: 2px;
            }
          }

          .footer {
            text-align: right;

            span {
              color: $blue;
              margin-left: 5px;

              &:hover {
                cursor: pointer;
                text-decoration: underline;
              }
            }
          }
        `}</style>
      </div>
    )
  }
}

export default translate('dataset')(Discussion)
