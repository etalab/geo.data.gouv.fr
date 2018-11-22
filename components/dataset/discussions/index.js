import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import getConfig from 'next/config'

import CommentIcon from 'react-icons/lib/fa/comments'

import {_get, _post} from '../../../lib/fetch'

import Button from '../../button'
import RequireAuth from '../../require-auth'

import Form from './form'
import List from './list'

const {publicRuntimeConfig: {
  DATAGOUV_API_URL
}} = getConfig()

class Discussions extends React.Component {
  static propTypes = {
    remoteId: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
  }

  state = {
    discussions: null,
    expanded: false
  }

  componentDidMount() {
    this.refreshDiscussions()
  }

  refreshDiscussions = async () => {
    const {remoteId} = this.props

    const {data} = await _get(`${DATAGOUV_API_URL}/discussions/?for=${remoteId}`)

    this.setState({
      discussions: data,
      expanded: false
    })
  }

  onExpand = () => {
    this.setState({
      expanded: true
    })
  }

  createDiscussion = async (title, comment) => {
    const {remoteId} = this.props

    await _post(`${DATAGOUV_API_URL}/discussions/`, {
      title,
      comment,
      subject: {
        id: remoteId,
        class: 'Dataset'
      }
    })

    this.refreshDiscussions()
  }

  createReply = async (discussionId, comment) => {
    await _post(`${DATAGOUV_API_URL}/discussions/${discussionId}/`, {
      comment
    })

    this.refreshDiscussions()
  }

  onSubmit = ({title, comment}) => {
    this.createDiscussion(title, comment)
  }

  renderAuth = user => (
    <div className='form'>
      <Form user={user} onSubmit={this.onSubmit} />
    </div>
  )

  render() {
    const {t} = this.props
    const {expanded, discussions} = this.state

    return (
      <div>
        <div className='discussions'>
          {discussions ? (
            <List discussions={discussions} onReply={this.createReply} />
          ) : t('common:loading')}
        </div>

        {expanded ? (
          <RequireAuth message={t('discussions.loggedOutMessage')} render={this.renderAuth} />
        ) : (
          <Button onClick={this.onExpand}>
            <CommentIcon style={{verticalAlign: -2}} /> {t('discussions.new')}
          </Button>
        )}
        <style jsx>{`
          @import 'colors';

          .discussions {
            margin-bottom: 1em;
          }

          .form {
            border-left: 2px solid $blue;
            padding-left: 10px;
          }
        `}</style>
      </div>
    )
  }
}

export default translate('dataset')(Discussions)
