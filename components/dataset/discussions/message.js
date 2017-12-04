import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const Message = ({ message }) => {
  const postedOn = moment.utc(message.posted_on).local()

  return (
    <div className='message'>
      <a href={message.posted_by.page}>
        <img src={message.posted_by.avatar_thumbnail || '/static/images/avatar.png'} alt='avatar' />
      </a>

      <div className='content'>
        <div className='header'>
          <b className='name'>
            {message.posted_by.first_name} {message.posted_by.last_name}
          </b>

          <div className='timestamp'>{postedOn.fromNow()}</div>
        </div>
        <div className='text'>{message.content}</div>
      </div>

      <style jsx>{`
        @import 'colors';

        .message {
          display: flex;
          margin-bottom: 1em;
        }

        .content {
          flex: 1;
        }

        .header {
          display: flex;
          flex: 1;
          margin-bottom: 3px;
        }

        .timestamp {
          margin-left: auto;
          font-weight: 100;
          color: $grey;
        }

        .text {
          overflow-wrap: break-word;
          word-wrap: break-word;
          word-break: break-word;
        }

        img {
          width: 53px;
          height: 53px;
          margin-right: 10px;
        }
      `}</style>
    </div>
  )
}

Message.propTypes = {
  message: PropTypes.shape({
    posted_by: PropTypes.shape({
      page: PropTypes.string.isRequired,
      avatar_thumbnail: PropTypes.string,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired
    }).isRequired,
    posted_on: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }).isRequired
}

export default Message
