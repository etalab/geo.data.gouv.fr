import React, { Component } from 'react'
import { remove, includes } from 'lodash'
import { Link } from 'react-router'
import { data, publishButton } from './DatasetsToBePublished.css'

class DatasetsToBePublished extends Component {
  constructor(props) {
    super(props)
    this.state = {toPublish: []}
  }

  publishDatasets() {
    console.log(this.state.toPublish, 'est en cours de publication');
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

  render() {
    const { datasets } = this.props
    const { toPublish } = this.state

    return (
      <div>
        {datasets.map((dataset, idx) =>
          <DatasetTest
            key={idx}
            dataset={dataset}
            isSelected={includes(toPublish, dataset) === true}
            add={(dataset) => this.addDatasetToPublish(dataset)}
            remove={(dataset) => this.removeDatasetToPublish(dataset)} />
        )}
        <div className={publishButton} onClick={() => this.publishDatasets()}>Publier</div>
      </div>

    )
  }
}

const DatasetTest = ({ dataset, isSelected, add, remove }) => {
  const select = isSelected ? <input type="checkbox" onClick={() => remove(dataset)} /> :
  <input type="checkbox" onClick={() => add(dataset)} />

  return (
    <div className={data}>
      <Link to={`/datasets/${dataset._id}`}>{dataset.title}</Link>
      {select}
    </div>
  )
}

export default DatasetsToBePublished
