import React, { Component } from 'react'
import { Link } from 'react-router'

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

  sumDesc() {
    return this.props.dataset.metadata.description.substring(0,1000).concat('...')
  }

  onClick(value) {
    this.props.onClick(value)
  }

  render() {
    return (
      <div style={styles.preview}>
        <h4>
          <Link to={`/datasets/${this.props.dataset.recordId}`}>{this.props.dataset.metadata.title}</Link>
        </h4>
        <p>{this.sumDesc()}</p>
        <div>
          <b>Keywords: </b>
          {this.props.dataset.metadata.keywords.map((keyword, idx) =>
            <span style={styles.link} key={idx}>
              <Link onClick={this.onClick.bind(this, {name: 'keyword', value: keyword})}>{keyword}</Link>
            </span>)}
        </div>
        <div>
          <b>Organizations: </b>
          {this.props.dataset.organizations.map((organization, idx) =>
            <span style={styles.link} key={idx}>
              <Link onClick={this.onClick.bind(this, {name: 'organization', value: organization})}>{organization}</Link>
            </span>)}
        </div>
      </div>
    )
  }
}

export default DatasetPreview
