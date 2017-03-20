import React, { Component } from 'react'

import Button from '../../../../components/Buttons/Button'

import Message from './Message'

import style from './Discussion.css'

class Discussion extends Component {
  constructor(props) {
    super(props)
    this.state = { more: false }
  }

  displayMore() {
    this.setState({ more: !this.state.more })
  }

  render() {
    const { more } = this.state
    const { discussion, datasetId } = this.props
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

    return (
      <div className={style.container}>
        { discussion.closed ? <div className={style.resolved}><i className="checkmark icon"></i></div> : null}
        <div className={style.title}>{discussion.title}</div>
        <div className={style.messages}>
          { more ? conversation : <Message message={discussion.discussion[0]} />}
          <div className={style.action}>
            { more || !repliesNb ? <Button action={() => this.reply()} text='Répondre' /> : null }
            <div className={style.replies} onClick={() =>this.displayMore()}>
              { more ? 'Fermer' : replies }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Discussion
