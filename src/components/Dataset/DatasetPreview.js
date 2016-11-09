import React, { Component } from 'react'
import { Link } from 'react-router'
import { prune } from 'underscore.string'

const styles = {
  preview: {
    marginBottom: '3em',
  },
  link: {
    marginRight: '0.3em',
    marginLeft: '0.3em',
  },
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
        <div>
          <b>Keywords: </b>
          {metadata.keywords.map((keyword, idx) =>
            <span style={styles.link} key={idx}>
              <Link onClick={() => addFilter({name: 'keyword', value: keyword})}>{keyword}</Link>
            </span>)}
        </div>
        <div>
          <b>Organizations: </b>
          {organizations.map((organization, idx) =>
            <span style={styles.link} key={idx}>
              <Link onClick={() => addFilter({name: 'organization', value: organization})}>{organization}</Link>
            </span>)}
        </div>
      </div>
    )
  }
}

export default DatasetPreview
