import React from 'react'
import PropTypes from 'prop-types'
import {flowRight} from 'lodash'
import {translate} from 'react-i18next'

import withFetch from '../../hoc/with-fetch'

import Discussion from './discussion'

const DiscussionsList = ({discussions, onReply, t}) => (
  <div>
    {discussions.length > 0 ? discussions.map(discussion => (
      <div key={discussion.id} className='discussion'>
        <Discussion discussion={discussion} onReply={onReply} />
      </div>
    )) : (
      <i>{t('discussions.empty')}</i>
    )}

    <style jsx>{`
      .discussion {
        margin-bottom: 1.4em;
      }
    `}</style>
  </div>
)

DiscussionsList.propTypes = {
  discussions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired
  })).isRequired,
  onReply: PropTypes.func.isRequired,

  t: PropTypes.func.isRequired
}

export default flowRight(
  withFetch(data => ({
    discussions: data.data
  })),
  translate('dataset')
)(DiscussionsList)
