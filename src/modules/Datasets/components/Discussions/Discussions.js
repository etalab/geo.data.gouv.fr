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

    return (
      <div className={container}>
        {discussions ?
          discussions.data.map((discussion, idx) => <Discussion key={idx} datasetId={datasetId} discussion={discussion} />)
          : null
        }
        <a href={`https://www.data.gouv.fr/fr/datasets/${datasetId}/#discussion-create`}>Démarrer une nouvelle discussion sur data.gouv.fr</a>
      </div>
    )
  }
}



export default Discussions
