import React from 'react'
import { prune } from 'underscore.string'
import MarkdownViewer from '../Markdown/MarkdownViewer'
import { theme } from '../../tools'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1em',
  },
  action: {
    backgroundColor: theme.blue,
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderBottom: '1px solid',
    alignSelf: 'flex-end',
  },
}

const DatasetDescription = ({description, shortDescription, showMore}) => {
  let action
  if (description.length > 1000) {
    action = <button style={styles.action} onClick={() => showMore()}>{shortDescription ? 'Afficher la suite' : 'Réduire'}</button>
  }
  return (
    <div style={styles.container}>
      <MarkdownViewer markdown={shortDescription ? prune(description, 1000) : description} />
      {action}
    </div>
  )
}

export default DatasetDescription
