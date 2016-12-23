import React, { Component } from 'react'
import request from 'superagent'
import { remove, includes } from 'lodash'
import DatasetToSelect from './DatasetToSelect'
import { buttons, publishButton, disable, selection } from './DatasetsToBePublished.css'

class DatasetsToBePublished extends Component {
  constructor(props) {
    super(props)
    this.state = {toPublish: [...props.datasets]}
  }

  publishDatasets() {
    const { toPublish } = this.state
    const { organizationId } = this.props.organizationId

    if (toPublish.length) {
      toPublish.map( dataset =>
        request.post(`/dgv/api/datasets/${dataset._id}/publication`)
          .set('Content-Type', 'application/json')
          .send(`{"organization": "${organizationId}"}`)
          .end())
      console.log(toPublish, 'est en cours de publication');
    }
  }

  addDatasetToPublish(dataset) {
    let toPublish = this.state.toPublish

    if (includes(toPublish, dataset)) return
    toPublish.push(dataset)
    this.setState({toPublish})
  }

  removeDatasetToPublish(dataset) {
    let toPublish = this.state.toPublish

    remove(toPublish, (data) => data._id === dataset._id)
    this.setState({toPublish})
  }

  selection() {
    if (this.state.toPublish.length === this.props.datasets.length) {
      this.setState({toPublish: []})
    } else {
      this.setState({toPublish: [...this.props.datasets]})
    }
  }

  render() {
    const { datasets } = this.props
    const { toPublish } = this.state
    const label = toPublish.length === datasets.length ? 'Tout décocher' : 'Tout cocher'
    const textButton = toPublish.length === datasets.length ? 'Publier toutes les données' : 'Publier les données séléctionnées'
    const publishButtonStyle = toPublish.length ? publishButton : disable

    return (
      <div>
        {datasets.map((dataset, idx) => {
          const isSelected = includes(toPublish, dataset) === true
          return <DatasetToSelect
            key={idx}
            dataset={dataset}
            isSelected={isSelected}
            change={isSelected ? (dataset) => this.removeDatasetToPublish(dataset) : (dataset) => this.addDatasetToPublish(dataset)} />}
        )}
        <div className={buttons}>
          <div className={selection} onClick={() => this.selection()}>{label}</div>
          <div className={publishButtonStyle} onClick={() => this.publishDatasets()}>{textButton}</div>
        </div>
      </div>

    )
  }
}

export default DatasetsToBePublished
