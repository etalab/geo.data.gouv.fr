import React, { Component } from 'react'
import { Link } from 'react-router'
import DatasetDescription from './DatasetDescription'
import Filter from '../Filter/Filter'
import { theme } from '../../tools'

const styles = {
  preview: {
    marginBottom: '3em',
    padding: '1em',
    backgroundColor: '#FFF',
    boxShadow: theme.boxShadowZ1,
  },
  filterList: {
    paddingBottom: '0.5em',
    lineHeight: '18px',
  },
  type: {
    textTransform: 'capitalize',
    fontSize: '0.9em',
    fontWeight: 400,
    margin: 0,
  },
}

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
      <div style={styles.preview}>
        <h4>
          <Link to={`/datasets/${recordId}`}>{metadata.title}</Link>
        </h4>

        <DatasetDescription description={metadata.description} shortDescription={this.state.shortDescription} showMore={() => this.wrapDescription()} />

        <h4 style={styles.type}>Keyword</h4>
        <div style={styles.filterList}>
          {metadata.keywords.map((keyword, idx) => <Filter onClick={addFilter} key={idx} filter={{value: keyword, name:'keyword'}} />)}
        </div>

        <h4 style={styles.type}>Organization</h4>
        <div style={styles.filterList}>
          {organizations.map((organization, idx) => <Filter onClick={addFilter} key={idx} filter={{value: organization, name:'organization'}} />)}
        </div>
      </div>
    )
  }
}

export default DatasetPreview
