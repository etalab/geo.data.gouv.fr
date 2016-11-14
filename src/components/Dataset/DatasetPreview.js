import React, { Component } from 'react'
import { Link } from 'react-router'
import { prune } from 'underscore.string'
import Filter from '../Filter/Filter'

const styles = {
  preview: {
    marginBottom: '3em',
  },
  filterList: {
    paddingBottom: '0.5cem',
  }
}

class DatasetPreview extends Component {

  onClick(value) {
    this.props.onClick(value)
  }

  render() {
    const { metadata, organizations, recordId } = this.props.dataset
    const { addFilter } = this.props

    return (
      <div style={styles.preview}>
        <h4>
          <Link to={`/datasets/${recordId}`}>{metadata.title}</Link>
        </h4>
        <p>{prune(metadata.description, 1000)}</p>
        <div style={styles.filterList}>
          <b>Keywords: </b>
          {metadata.keywords.map((keyword, idx) => <Filter onClick={addFilter} key={idx} value={keyword} type='keyword' />)}
        </div>
        <div style={styles.filterList}>
          <b>Organizations: </b>
          {organizations.map((organization, idx) => <Filter onClick={addFilter} key={idx} value={organization} type='organization' />)}
        </div>
      </div>
    )
  }
}

export default DatasetPreview
