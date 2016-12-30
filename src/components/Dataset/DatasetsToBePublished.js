import React, { Component } from 'react'
import { publishDataset } from '../../fetch/fetch'
import DatasetToSelect from './DatasetToSelect'
import { buttons, noData, publishButton, button, disable, selection } from './DatasetsToBePublished.css'

class DatasetsToBePublished extends Component {
  constructor(props) {
    super(props)
    this.state = {toPublish: [...props.datasets]}
  }

  publishDatasets() {
    const { toPublish } = this.state
    const { organizationId } = this.props

    if (toPublish.length) {
      toPublish.map( dataset => publishDataset(dataset._id, organizationId) )
    }
  }

  addDatasetToPublish(dataset) {
    let toPublish = this.state.toPublish

    if (toPublish.includes(dataset)) return
    toPublish.push(dataset)
    this.setState({toPublish})
  }

  removeDatasetToPublish(dataset) {
    this.setState({
      toPublish: this.state.toPublish.filter(d => d._id !== dataset._id)
    })
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

    if (!datasets.length) return <div className={noData}>Aucun jeu de données.</div>
    return (
      <div>
        {datasets.map((dataset, idx) => {
          const isSelected = toPublish.includes(dataset) === true
          return <DatasetToSelect
            key={idx}
            dataset={dataset}
            isSelected={isSelected}
            change={isSelected ? (dataset) => this.removeDatasetToPublish(dataset) : (dataset) => this.addDatasetToPublish(dataset)} />}
        )}
        <div className={buttons}>
          <div className={`${button} ${selection}`} onClick={() => this.selection()}>{label}</div>
          <div className={`${button} ${publishButtonStyle}`} onClick={() => this.publishDatasets()}>{textButton}</div>
        </div>
      </div>

    )
  }
}

export default DatasetsToBePublished
