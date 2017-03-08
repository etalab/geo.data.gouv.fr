import React, { Component } from 'react'

import Discussion from './Discussion'

import { getDiscussions } from '../../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'

import { container } from './Discussions.css'

class Discussions extends Component {
  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentWillMount() {
    const { datasetId } = this.props

    if (!datasetId) return
    return waitForDataAndSetState(getDiscussions(datasetId), this, 'discussions')
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  render() {
    const { discussions } = this.state
    const { datasetId } = this.props

    if (!discussions) return null

    return (
      <div className={container}>
        {discussions.data.map((discussion, idx) => <Discussion key={idx} datasetId={datasetId} discussion={discussion} />)}
      </div>
    )
  }
}



export default Discussions
