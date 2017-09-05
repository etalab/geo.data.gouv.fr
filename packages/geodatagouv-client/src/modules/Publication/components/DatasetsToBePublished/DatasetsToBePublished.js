/* eslint-disable react/prop-types */

import React, { Component } from 'react'

import { publishDataset } from '../../../../fetch/fetch'

import DatasetToSelect from '../DatasetToSelect/DatasetToSelect'

import { buttons, noData, publishButton, button, refresh, disable, selection } from './DatasetsToBePublished.scss'

class DatasetsToBePublished extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toPublish: [],
      publicationsInProgress: []
    }
  }

  publishDatasets() {
    const { toPublish } = this.state
    const { organizationId } = this.props

    if (toPublish.length) {
      this.setState({ publicationsInProgress: [...toPublish] })
      toPublish.map(dataset => publishDataset(dataset._id, organizationId))
    }
  }

  addDatasetToPublish(dataset) {
    let { toPublish } = this.state

    if (toPublish.includes(dataset)) return
    toPublish.push(dataset)
    this.setState({ toPublish })
  }

  removeDatasetToPublish(dataset) {
    this.setState({
      toPublish: this.state.toPublish.filter(d => d._id !== dataset._id)
    })
  }

  selection() {
    const { datasets } = this.props
    const { toPublish } = this.state

    if (toPublish.length === datasets.length) {
      this.setState({ toPublish: [] })
    } else {
      this.setState({ toPublish: [...datasets] })
    }
  }

  render() {
    const { datasets, update } = this.props
    const { toPublish, publicationsInProgress } = this.state
    const label = toPublish.length === datasets.length ? 'Tout désélectionner' : 'Tout sélectionner'
    const textButton = toPublish.length === datasets.length ? 'Publier toutes les données' : 'Publier les données sélectionnées'
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
            inProgress={publicationsInProgress.includes(dataset) === true}
            change={isSelected ? (dataset) => this.removeDatasetToPublish(dataset) : (dataset) => this.addDatasetToPublish(dataset)} />
        }
        )}
        { publicationsInProgress.length ? <button className={refresh} onClick={() => update()}>Actualiser les données <i className='refresh icon' /></button> : null}
        <div className={buttons}>
          <div className={`${button} ${selection}`} onClick={() => this.selection()}>{label}</div>
          <div className={`${button} ${publishButtonStyle}`} onClick={() => this.publishDatasets()}>{textButton}</div>
        </div>
      </div>

    )
  }
}

export default DatasetsToBePublished
