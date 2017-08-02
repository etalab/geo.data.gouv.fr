/* eslint-disable react/prop-types */

import React from 'react'
import moment from 'moment'
import { doneSince } from '../../../../helpers/doneSince'

import style from './Message.scss'

const Message = ({ message }) => {
  return (
    <div className={style.message}>
      <a href={message.posted_by.page}><img className={style.avatar} src={message.posted_by.avatar || '/assets/avatar.png'} alt='avatar' /></a>
      <div className={style.content}>
        <div className={style.header}>
          <div className={style.userName}>{message.posted_by.first_name} {message.posted_by.last_name}</div>
          <div className={style.postedOn}>{doneSince(moment(message.posted_on).add(2, 'hh'))}</div>
        </div>
        <div>{message.content}</div>
      </div>
    </div>
  )
}

export default Message
