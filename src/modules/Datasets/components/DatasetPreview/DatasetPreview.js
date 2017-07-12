import React, { Component } from 'react'
import { Link } from 'react-router'

import DatasetDescription from '../DatasetDescription/DatasetDescription'

import Filter from '../../../../components/Filter/Filter'

import { container, list } from './DatasetPreview.scss'

class DatasetPreview extends Component {
  constructor(props) {
    super(props)
    this.state = {shortDescription: true}
  }

  onClick(value) {
    this.props.onClick(value)
  }

  wrapDescription() {
    this.setState({shortDescription: !this.state.shortDescription})
  }

  render() {
    const { metadata, organizations, recordId } = this.props.dataset
    const { addFilter } = this.props

    return (
      <div className={container}>
        <h4><Link to={`/datasets/${recordId}`}>{metadata.title}</Link></h4>

        <DatasetDescription description={metadata.description} shortDescription={this.state.shortDescription} showMore={() => this.wrapDescription()} />

        <h5>Mot-clé</h5>
        <div className={list}>
          {metadata.keywords.map((keyword, idx) => <Filter onClick={addFilter} key={idx} filter={{value: keyword, name:'keyword'}} />)}
        </div>

        <h5>Organisation</h5>
        <div className={list}>
          {organizations.map((organization, idx) => <Filter onClick={addFilter} key={idx} filter={{value: organization, name:'organization'}} />)}
        </div>
      </div>
    )
  }
}

export default DatasetPreview
